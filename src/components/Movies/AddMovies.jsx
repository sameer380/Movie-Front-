import {
	Box,
	Button,
	Checkbox,
	FormLabel,
	TextField,
	Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useState } from "react";
import { addMovie } from "../../api-helpers/api-helpers";
const labelProps = {
	mt: 1,
	mb: 1,
};
function AddMovies() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const [inputs, setInputs] = useState({ title: "", description: "", posterUrl: "", releaseDate: "", featured: false })
	const [actors, setActors] = useState([]);
	const [actor, setActor] = useState("");
	const handleChange = (e) => {
		setInputs((prevState) => ({
			...prevState, [e.target.name]: e.target.value
		}))
	};

 	const handleSubmit = (e) => { 
		e.preventDefault();
		  console.log(inputs, actors);
		  addMovie({...inputs,actors}).then(res=> console.log(res)).catch(err=> console.log(err))
	}

	console.log(actors);
	console.log(actor);

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<Box
					width={isMobile ? "90%" : "50%"}
					padding={isMobile ? 4 : 10}
					margin="auto"
					display={"flex"}
					flexDirection="column"
					boxShadow={isMobile ? "none" : "10px 10px 20px #ccc"}
				>
					<Typography
						// textAlign={"center"}
						variant="h5"
						fontFamily={"vardana"}
						display={"flex"}
						flexDirection="column"
					>
						<FormLabel sx={labelProps}>Title</FormLabel>
						<TextField
							name="title"
							variant="standard"
							margin="normal"
							value={inputs.name}
							onChange={handleChange}
						/>

						<FormLabel sx={labelProps}>Description</FormLabel>
						<TextField
							name="description"
							variant="standard"
							margin="normal"
							value={inputs.description}
							onChange={handleChange}
						/>

						<FormLabel sx={labelProps}>Poster URL</FormLabel>
						<TextField
							name="posterUrl"
							variant="standard"
							margin="normal"
							value={inputs.posterUrl}
							onChange={handleChange}
						/>

						<FormLabel sx={labelProps}>Release Date</FormLabel>
						<TextField
							type={"date"}
							name="releaseDate"
							variant="standard"
							margin="normal"
							value={inputs.releaseDate}
							onChange={handleChange}
						/>

						<FormLabel sx={labelProps}>Actor</FormLabel>

						<Box display="flex">
							<TextField
								value={actor}
								name="actor"
								variant="standard"
								margin="normal"
								onChange={(e) => {
									setActor(e.target.value);
								}}
							/>

							<Button
								onClick={() => {
									setActors([...actors, actor]);
									setActor("");
								}}
							>
								Add
							</Button>
						</Box>
						<FormLabel sx={labelProps}>Featured</FormLabel>
						<Checkbox
							name="featured"
							checked={inputs.featured}
							sx={{ mr: "auto" }}
							onClick={(e) =>
								setInputs((prevState) => ({
									...prevState,
									featured: e.target.checked,
								}))
							}
						/>

						<Button
							type="submit"
							variant="contained"
							ex={{
								width: "30%",
								bgcolor: "#2b2s42",
								":hover": {
									bgcolor: "#1212",
								},
							}}
						>
							{" "}
							Add Movie
						</Button>
					</Typography>
				</Box>
			</form>
		</div>
	);
}

export default AddMovies;
