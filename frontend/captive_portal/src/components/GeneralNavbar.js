import AdminNavbar from './AdminNavbar';
import AppNavbar from './AppNavbar';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'

const GeneralNavbar = () => {
	const [admin, setAdmin] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const isAdmin = location.pathname.includes("admin");
		setAdmin(isAdmin);
	}, [location.pathname])

	return (
		<div>
			{
				admin ? <AdminNavbar /> : <AppNavbar />
			}
		</div>
		)
}

export default GeneralNavbar;