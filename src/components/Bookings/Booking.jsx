import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesDetails, newBooking } from "../../api-helpers/api-helpers";
import { Typography, Box, TextField, FormLabel, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
function Booking() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const isUserLoggedIn = useSelector((state) => state.user.isLogegdIn);
	const isAdminLoggedIn = useSelector((state) => state.admin.isLogegdIn);
	const [movie, setMovie] = useState([]);
	const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
	const { id } = useParams();

	useEffect(() => {
		getMoviesDetails(id)
			.then((res) => {
		

				setMovie(res)
			})
			.catch((err) => console.log(err));
	}, []);

	const handleChange = (e) => {
		setInputs((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isUserLoggedIn) {
			newBooking({ ...inputs, movie: movie._id })
				.then((response) => {

							if (!response) {
								return toast.error("Enter the information (Date, seat Number)");
							}
							
				})
				.catch((err) => {
					console.log(err);
				});
		} else if (isAdminLoggedIn) return toast.error("Admins can't book");
		else {
			toast.error("You must log in");
		}
	};

	return (
		<div>
			{movie && (
				<Fragment>
					<Typography
						padding={3}
						fontFamily="fantasy"
						variant="h4"
						textAlign="center"
						marginTop="40px"
						color={"black"}
						style={{
							boxShadow: "0 4px 8px rgba(10, 10, 0, 0.733).2)",
							textAlign: "center",
						}}
					>
						Book Tickets of Movie : {movie.title}
					</Typography>

					<Box
						display={"flex"}
						flexDirection={{ xs: "column", sm: "row" }}
						justifyContent={"center"}
						alignItems={"center"}
						sx={{
							maxWidth: "80%",
							width: "100%",
							margin: "0 auto",
							marginTop: "100px",
							gap: "20px",
						}}
					>
						<Box
							width={"100%"}
							display={"flex"}
							flexDirection={"column"}
							gap={isMobile ? 4 : 20} // Adjust spacing based on device
							paddingTop={isMobile ? 2 : 3}
							paddingBottom={isMobile ? 2 : 4}
							paddingX={isMobile ? 2 : 4}
							style={{
								borderRadius: "12px",
								boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: "rgba(228, 116, 96, 0.8)",
								color: "white",
								fontFamily: "sans-serif",
								backgroundImage:
									'url("https://t4.ftcdn.net/jpg/03/69/25/05/360_F_369250586_z5HZqoztht4SIMRycXGNsVoELLLKrpjg.jpg")',
								backgroundSize: "cover",
								backgroundPosition: "center",
								height: isMobile ? "auto" : "400px", // Adjust height based on device
								position: "relative",
							}}
						>
							<img
								width={"100%"}
								height={"100%"}
								src={movie.posterUrl}
								alt=""
								style={{
									borderRadius: "12px",
									boxShadow: "2px 2px 25px #b9202052",
								}}
							/>
						</Box>

						<Box
							width={"100%"}
							paddingTop={3}
							paddingX={4}
							paddingBottom={4}
							style={{
								borderRadius: "12px",
								boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: "rgba(228, 116, 96, 0.8)", // Semi-transparent background color
								color: "white",
								fontFamily: "sans-serif",
								backgroundImage:
									'url("https://t4.ftcdn.net/jpg/03/69/25/05/360_F_369250586_z5HZqoztht4SIMRycXGNsVoELLLKrpjg.jpg")',
								backgroundSize: "cover",
								backgroundPosition: "center",
								height: "400px",
								position: "relative",
							}}
						>
							<Typography
								variant="h4"
								style={{
									marginBottom: "20px",
									textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
								}}
							>
								<b>Movie</b>: {movie.title}
							</Typography>
							<Typography
								style={{
									marginBottom: "20px",
									textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
								}}
							>
								<b>Description</b>: {movie.description}
							</Typography>
							<Typography
								style={{
									marginBottom: "20px",
									textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
								}}
							>
								<b>Actors</b>: {movie.actors}
							</Typography>
							<Typography
								style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
							>
								<b>Release Date</b>:{" "}
								{new Date(movie.releaseDate).toDateString()}
							</Typography>
						</Box>

						<Box
							width={"100%"}
							paddingTop={3}
							paddingX={4}
							style={{
								fontSize: "2rem",
								textAlign: "center",
							}}
						>
							<form onSubmit={handleSubmit}>
								<Box
									padding={3}
									margin={"auto"}
									display={"flex"}
									flexDirection={"column"}
								>
									<FormLabel>Seat Number</FormLabel>
									<TextField
										value={inputs.seatNumber}
										onChange={handleChange}
										name="seatNumber"
										type={"number"}
										margin="normal"
										variant="standard"
									/>

									<FormLabel>Booking Date</FormLabel>
									<TextField
										value={inputs.date}
										onChange={handleChange}
										name="date"
										type={"date"}
										margin="normal"
										variant="standard"
									/>
									<Button type="submit" sx={{ mt: 3 }}>
										Book Now
									</Button>
								</Box>
							</form>
						</Box>
					</Box>
				</Fragment>
			)}
		</div>
	);
}

export default Booking;
