from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from app.config import Config
from dotenv import load_dotenv
from app.init_utils import bcrypt, login_manager
from flask_jwt_extended import JWTManager
from flask_cors import CORS



#initialize database
db = SQLAlchemy()
migrate = Migrate()
load_dotenv()
jwt = JWTManager()

def create_app():
	#create a flask app instance
	app = Flask(__name__)

	#load confugaration settings
	app.config.from_object(Config)
	#Enable CORS
	CORS(app, origins=['http://localhost:3000','http://localhost:3000'])
	#Initialize extensions
	bcrypt.init_app(app)
	login_manager.init_app(app)
	db.init_app(app)
	jwt.init_app(app)
	migrate.init_app(app, db) #initialize migrate instance with app and db

	#register blueprints
	from .routes import bp, auth_blueprint
	app.register_blueprint(bp)
	app.register_blueprint(auth_blueprint)
	
	#app.register_blueprint(main)

	return app
