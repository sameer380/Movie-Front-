import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
	AppBar,
	Autocomplete,
	Box,
	Drawer,
	Hidden,
	IconButton,
	List,
	ListItem,
	Tab,
	Tabs,
	TextField,
	Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { toast } from "react-toastify";

function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isAdminLoggedIn = useSelector((state) => state.admin.isLogegdIn);
	const isUserLoggedIn = useSelector((state) => state.user.isLogegdIn);
	const [value, setValue] = useState();
	const [movie, setMovie] = useState([]);
	const [selectMovie, setSelectionMovie] = useState();
	const [drawerOpen, setDrawerOpen] = useState(false);

	useEffect(() => {
		getAllMovies().then((data) => {
			setMovie(data);
		});
	}, []);

	const logout = (isAdmin) => {
		toast.success("Successfully Logout");
		dispatch(isAdmin ? adminActions.logout() : userActions.logout());
	};

	const handleChange = (e, val) => {
		setSelectionMovie(val);
		const selectedMovie = movie.find((m) => m.title === val);
		navigate(`/booking/${selectedMovie._id}`);
	};

	const toggleDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setDrawerOpen(open);
	};

	const list = () => (
		<Box
			sx={{ width: 250 }}
			role="presentation"
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
		>
			<List>
				{/* Update the list items as per your navigation links */}
				<ListItem button component={Link} to="/movies">
					Movies
				</ListItem>
				<ListItem button component={Link} to="/home">
					Home
				</ListItem>
				{isAdminLoggedIn && (
					<>
						<ListItem button component={Link} to="/add">
							Add Movie
						</ListItem>

						<ListItem button component={Link} to="/user-admin">
							Profile
						</ListItem>
						<ListItem
							button
							component={Link}
							to="/home"
							onClick={() => logout(true)}
						>
					
							{" "}
							Logout
						</ListItem>
					</>
				)}

				{isUserLoggedIn && (
					<>
						<ListItem button component={Link} to="/user">
							{" "}
							Profile
						</ListItem>
						<ListItem
							button
							component={Link}
							to="/home"
							onClick={() => logout(false)}
						>
							{" "}
							Logout{" "}
						</ListItem>
					</>
				)}

				{!isAdminLoggedIn && !isUserLoggedIn && (
					<>
						<ListItem button component={Link} to="/admin">
							Admin
						</ListItem>

						<ListItem
							button
							component={Link}
							to="/auth"
							sx={{
								color: "white",
								backgroundColor: "black",
								borderRadius: "30px",
							}}
						>
							Login
						</ListItem>
					</>
				)}
			</List>
		</Box>
	);

	return (
		<>
			<AppBar position="sticky" sx={{ bgcolor: "#d65050" }}>
				<Toolbar>
					

					<Hidden mdUp>
						<Box width={"20%"}>
							<IconButton
								edge="start"
								color="inherit"
								aria-label="menu"
								onClick={toggleDrawer(true)}
							>
								<MenuIcon />
							</IconButton>
						</Box>
					</Hidden>

					<Hidden smDown>
						<Box width={"20%"}>
							<IconButton
								edge="start"
								color="inherit"
								aria-label="menu"
								LinkComponent={Link}
								to="/home"
							>
								<LiveTvIcon />
							</IconButton>
						</Box>
					</Hidden>

					<Box width={"30%"} margin={"auto"} marginTop={"10px"}>
						<Hidden smDown>
							<Autocomplete
								color="white"
								sx={{
									border: "2px solid white",
									borderRadius: "30px",
									"& .MuiOutlinedInput-root": {
										"& fieldset": {
											borderWidth: "1px", // default border width
											borderColor: "transparent", // default border color
										},
										"&:hover fieldset": {
											borderColor: "transparent", // border color on hover
										},
										"&.Mui-focused fieldset": {
											borderColor: "transparent", // border color on focus
										},
									},
								}}
								onChange={handleChange}
								freeSolo
								options={movie.map((option) => option.title)}
								renderInput={(params) => (
									<TextField
										sx={{ border: "none" }}
										{...params}
										label="Search Your Favourite movie"
										InputLabelProps={{
											sx: {
												color: "white", // Label text color
											},
										}}
									/>
								)}
							/>
						</Hidden>
					</Box>

					<Box display={{ xs: "none", sm: "block" }}>
						<Tabs
							textColor="inherit"
							indicatorColor="secondary"
							value={value}
							onChange={(e, val) => setValue(val)}
						>
							<Tab LinkComponent={Link} to="/movies" label="Movies" />
							{!isAdminLoggedIn && !isUserLoggedIn && (
								<>
									<Tab label="Admin" LinkComponent={Link} to="/admin" />

									<Tab
										label="Login"
										LinkComponent={Link}
										to="/auth"
										sx={{
											color: "white",
											backgroundColor: "black",
											borderRadius: "30px",
										}}
									/>
								</>
							)}

							{isUserLoggedIn && (
								<>
									<Tab label="Profile" LinkComponent={Link} to="/user" />
									<Tab
										label="Logout"
										LinkComponent={Link}
										to="/home"
										onClick={() => logout(false)}
									/>
								</>
							)}

							{isAdminLoggedIn && (
								<>
									<Tab label="Add Movie" LinkComponent={Link} to="/add" />
									<Tab label="Profile" LinkComponent={Link} to="/user-admin" />
									<Tab
										label="Logout"
										LinkComponent={Link}
										to="/home"
										onClick={() => logout(true)}
									/>
								</>
							)}
						</Tabs>
					</Box>
				</Toolbar>
			</AppBar>

			{/* Drawer for small devices */}
			<Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
				{list()}
			</Drawer>
		</>
	);
}

export default Header;
