import {
	Box,
	Button,
	Dialog,
	IconButton,
	TextField,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const labelStyle = { mt: 1, mb: 1 };

function AuthForm({ onsubmit,isAdmin}) {
	const [inputs, setInput] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [isSignUp, setSignup] = useState(false);
	const handleChange = (e) => { 
		setInput((prevState) => ({
			...prevState,
			[e.target.name]:e.target.value
		}))
	}
	const handleSubmit = (e) => { 
		e.preventDefault();
		console.log( inputs );
		onsubmit({ inputs, signup: isAdmin ? false : isSignUp });
	}	 
	
	return (
		<Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
			<Box sx={{ ml: "auto", padding: 1 }}>
				<IconButton LinkComponent={Link} to="/home">
					<CloseIcon />
				</IconButton>
			</Box>
			<Typography variant="h4" textAlign="center">
				{isSignUp ? "Sign Up" : "Login"}
			</Typography>

			<form onSubmit={handleSubmit}>
				<Box
					padding={6}
					display="flex"
					justifyContent="center"
					flexDirection="column"
					width={400}
					mx="auto" // Center the Box horizontally
					mt={4} // Add margin top for the Box
				>
					{!isAdmin&&isSignUp && (
						<TextField
							value={inputs.name}
							onChange={handleChange}
							margin="normal"
							variant="standard" 
							type="text"
							label="Name"
							name="name"
						/>
					)}
					<TextField
						value={inputs.email}
						onChange={handleChange}
						margin="normal"
						variant="standard"
						type="email"
						label="Email"
						name="email"
					/>
					<TextField
						value={inputs.password}
						onChange={handleChange}
						margin="normal"
						variant="standard"
						type="password"
						label="Password"
						name="password"
					/>
					<Button
						sx={{
							mt: 2,
							borderRadius: 10,
							bgcolor: "#2b2d42",
							color: "white",
							":hover": {
								color: "black",
								bgcolor: "darkkhaki",
							},
						}}
						type="submit"
						fullWidth
					>
						{isSignUp ? "Signup" : "Login"}
					</Button>
					{!isAdmin && <Button
						onClick={(e) => {
							e.preventDefault();
							setSignup(!isSignUp);
						}}
						sx={{
							mt: 2,
							borderRadius: 10,

							color: "black",
							bgcolor: "lightblue",
							":hover": {
								color: "black",
							},
						}}
						type="submit"
						fullWidth
					>
						Switch To {isSignUp ? "Login" : "Sign Up"}
					</Button>}
				</Box>
			</form>
		</Dialog>
	);
}

export default AuthForm;
