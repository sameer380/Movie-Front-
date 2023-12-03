import { Profiler, useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import { Route, Routes } from 'react-router-dom';
import Admin from "./components/Auth/Admin.jsx"
import Movies from './components/Movies/Movies.jsx';
import Auth from './components/Auth/Auth.jsx';
import HomePage from "./components/Homepage.jsx"
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from './store/index.js';
import Booking from './components/Bookings/Booking.jsx';
import UserProfile from './profile/UserProfile.jsx';
import AddMovies from './components/Movies/AddMovies.jsx';
import AdminProfile from './profile/AdminProfile.jsx';
function App() {
	const dispatch = useDispatch();
	const isAdminLoggedIn = useSelector((state) => state.admin.isLogegdIn);
	const isUserLoggedIn = useSelector((state) => state.user.isLogegdIn);
	useEffect(() => { 
		if (localStorage.getItem("userId")) {
			dispatch(userActions.login());
			
		}
		else if (localStorage.getItem("adminId")) {
			dispatch(adminActions.login());
		}
	},[])
  return (
		<>
			<Header />
			<section>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/movies" element={<Movies />} />
					<Route path="/admin" element={<Admin />} />
					<Route path="/auth" element={<Auth />} />
					<Route path="/user" element={<UserProfile />} />
					<Route path="/booking/:id" element={<Booking />} />
					<Route path="/add" element={<AddMovies />} />
					<Route path="/user-admin" element={<AdminProfile/>} />
				</Routes>
			</section>
		</>
	);
}

export default App

