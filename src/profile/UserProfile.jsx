import React, { Fragment, useEffect, useState } from "react";
import { deleteBooking, getUserBooking, getUserDetails } from "../api-helpers/api-helpers";
import { Box, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
function UserProfile() {
	const [bookings, setBookings] = useState();
	const [user, setUser] = useState();
	useEffect(() => {
		getUserBooking()
			.then((res) => setBookings(res.booking))
			.catch((err) => console.log(err));
		getUserDetails()
			.then((res) => setUser(res.users))
			.catch((err) => {
				console.log(err);
			});
	}, [bookings]);
	

	const handleDelete = (id) => {
		deleteBooking(id).then((res)=> console.log(res)).catch((err)=> console.log(err))
	 }
	return (
		<Box width={"100%"} display={"flex"} marginTop={"10%"}>
			{user && (
				<Fragment>
					{
						<Box
							flexDirection={"column"}
							justifyContent={"center"}
							alignItems={"center"}
							width={"30%"}
						>
							<AccountCircleIcon
								sx={{ fontSize: "10rem", textAlign: "center", margin: "0 30%" }}
							/>
							<Typography
								padding={1}
								width={"auto"}
								textAlign={"center"}
								border={"1px solid #ccc"}
								borderRadius={6}
							>
								Name: {user.name}
							</Typography>

							<Typography
								padding={1}
								width={"auto"}
								textAlign={"center"}
								border={"1px solid #ccc"}
								borderRadius={6}
							>
								Email: {user.email}
							</Typography>
						</Box>
					}
					{bookings && bookings.length > 0 && (
						<Box width={"70%"} display={"flex"} flexDirection={"column"}>
							<Typography
								variant="h3"
								fontFamily={"vardana"}
								textAlign={"center"}
								padding={2}
							>
								Bookings
							</Typography>

							<Box
								margin={"auto"}
								display={"flex"}
								flexDirection={"column"}
								width={"80%"}
							>
								<List>
									{bookings.map((booking, index) => {
										return (
											<ListItem
												sx={{
													bgcolor: "lightslategray",
													color: "white",
													textAlign: "center",
													margin: 1,
												}}
											>
												<ListItemText
													sx={{
														margin: 1,
														width: "1uto",
														textAlign: "left",
													}}
												>
													Movie: {booking.movie.title}
												</ListItemText>
												<ListItemText
													sx={{
														margin: 1,
														width: "1uto",
														textAlign: "left",
													}}
												>
													Seat: {booking.seatNumber}
												</ListItemText>
												<ListItemText
													sx={{
														margin: 1,
														width: "1uto",
														textAlign: "left",
													}}
												>
													Date: {new Date(booking.date).toDateString()}
												</ListItemText>
												<IconButton
													color="error"
													onClick={() => {
														handleDelete(booking._id);
													}}
												>
													<DeleteIcon />
												</IconButton>
											</ListItem>
										);
									})}
								</List>
							</Box>
						</Box>
					)}
				</Fragment>
			)}
		</Box>
	);
}

export default UserProfile;
