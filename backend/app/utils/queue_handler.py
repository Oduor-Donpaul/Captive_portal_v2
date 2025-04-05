
import json
import pika.exceptions
from app import create_app, db
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from kombu import Connection, Exchange, Queue
from app.models import  Message
from socket import timeout as SocketTimeOut
import time
from socket import timeout as SocketTimeout

app = create_app()
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}})
socketio = SocketIO(app, cors_allowed_origins=["http://localhost:3000"], async_mode='eventlet', logger=True, engineio_logger=True)


@socketio.on('connect')
def handle_connect():
    print("Client connected")

#Create delay for rabbitmq to sttart up
def wait_for_rabbitmq(url, timeout=180):
    for i in range(timeout):
        try:
            with Connection(url) as conn:
                conn.connect()
                print("Rabbitmq is Up")
                return
        except Exception:
            print("Waiting Rabbitmq to start... {i+1}/{timeout}")
            time.sleep(5)
    raise Exception("Rabbitmq is not not available after timeout")

#channel.queue_declare(queue='notifications_queue')

#Publish notification to the queu
def publish_otp(otp, phone_number):
    message = json.dumps({'otp': otp, 'phone_number': phone_number})

    # Use the correct RabbitMQ host (e.g., 'rabbitmq' if in Docker)
    amqp_url = 'amqp://guest:guest@rabbitmq:5672//'

    # Wait until RabbitMQ is available
    wait_for_rabbitmq(amqp_url)

    # Open connection to RabbitMQ
    with Connection(amqp_url) as conn:
        queue = Queue('notifications_queue', exchange=Exchange(''), routing_key='notifications_queue')
        queue.maybe_bind(conn)
        queue.declare()

        producer = conn.Producer()
        print(f"Attempting to publish message: {message}")
        producer.publish(message, routing_key='notifications_queue', declare=[queue])
        print(f"Message: {message} published")

#Deserialize the message to obj:
def otp_notification_callback(body, message):
    with app.app_context():
        notification = json.loads(body)
        otp = notification.get('otp')
        phone_number = notification.get('phone_number')

        print(f"Recieved OTP: {otp} for phone number {phone_number}")

        #Save the message to the database
        try:
            new_message = Message(otp=otp, phone_number=phone_number)
            db.session.add(new_message)
            db.session.commit()
            print(f"Message saved to the Database: {new_message}")
        except Exception as e:
            print(f"Error saving message: {e}")
            db.session.rollback()

        #Send OTP data to frontend
        socketio.emit('otp_notification', {'otp': otp, 'phone_number': phone_number})
        message.ack()

#Start rabbit mq consumer
#def start_consumer():
 #   with Connection('amqp://guest:guest@localhost//') as conn:
  #      queue = Queue('notifications_queue', exchange=Exchange(''), routing_key='notifications_queue')
   ##
        #Consume messages
       # with conn.Consumer(queues=[queue], callbacks=[otp_notification_callback]) as consumer:
        #    print("Waiting for OTP notifications...")
         #   while True:
          #      try:
           ##            conn.drain_events(timeout=1)
             ##      print("No messages recieved, waiting for messages..")

def start_consumer():
    conn = Connection('amqp://guest:guest@rabbitmq:5672//')  # use the correct host
    wait_for_rabbitmq(conn)  # optional custom function to retry until ready
    
    queue = Queue('notifications_queue', exchange=Exchange(''), routing_key='notifications_queue')
    queue.maybe_bind(conn)
    queue.declare()

    with conn.Consumer(queues=[queue], callbacks=[otp_notification_callback]):
        print("Waiting for OTP notifications...")
        while True:
            try:
                conn.drain_events(timeout=1)
            except SocketTimeout:
                print("No messages received, waiting for messages...")
