import { Box, Grid,Button, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieItem from "./Movies/MovieItem";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api-helpers";
import Carousel from "react-material-ui-carousel";

function Homepage() {
	const isMobile = useMediaQuery("(max-width:960px)");
	const isTablet = useMediaQuery("(max-width:1280px)");

	const carouselProps = {
		autoPlay: true,
		duration: 530,
		interval: 2600,
		animation: "slide",
		indicators: false,
		cycleNavigation: true,
		navButtonsProps: {
			navButtonsAlwaysVisible: true,
			style: {
				background: "#fff",
				color: "#494949",
				borderRadius: 0,
				marginTop: isMobile ? "-50px" : "-100px",
				height: isMobile ? "200px" : isTablet ? "250px" : "304px",
			},
		},
	};
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		getAllMovies()
			.then((data) => {
				setMovies(data);
			})
			.catch((err) => console.log(err));
	}, []);

	const data = [
		"https://mir-s3-cdn-cf.behance.net/project_modules/hd/62804b18669443.562cd567cbcd8.jpg",
		"https://mir-s3-cdn-cf.behance.net/project_modules/fs/b307d127256085.560502e8b209e.jpg",
		"https://mb.cision.com/Public/14247/2902071/856b720fb81856ec_org.jpg",
		"https://www.theonering.net/torwp/wp-content/uploads/2014/07/Hobbit_3_Horizontal_Teaser.jpg",
		"https://images8.alphacoders.com/121/1218962.jpg",
		"https://webneel.com/wnet/file/images/11-16/8-xmen-movie-poster-design.jpg",
	];
	return (
		<Box
			width="100%"
			margin="auto"
			marginTop={0.5}
			paddingBottom={4}
		>
			{/* <Carousel
				className="carasousel"
				autoPlay={true}
				duration={530}
				interval={2600}
				animation="slide"
				indicators={false}
				cycleNavigation={true}
				navButtonsProps={{
					navButtonsAlwaysVisible: true,
					style: {
						background: "#fff",
						color: "#494949",
						borderRadius: 0,
						marginTop: "-100px",
						height: "304px",
					},
				}}
			>
				{data.map((ele, i) => (
					<div style={{ height: "650px" }} key={i}>
						<img src={ele} alt="" width="100%" height="100%" />
					</div>
				))}
			</Carousel> */}

			<Carousel className="carousel" {...carouselProps}>
				{data.map((ele, i) => (
					<div
						style={{
							height: isMobile ? "350px" : isTablet ? "400px" : "650px",
						}}
						key={i}
					>
						<img src={ele} alt="" width="100%" height="100%" />
					</div>
				))}
			</Carousel>

			<Box padding={2}>
				<Typography variant="h4" textAlign="center" marginBottom={2}>
					Latest Release
				</Typography>
			</Box>

			{/* <Box display="flex"
				flexDirection="row"
				alignItems="center"
			
				
			>
				{movies &&
					movies.slice(0, 4).map((item) => (
						<Box width="100%" key={item._id} marginBottom={2}>
							<MovieItem
							
								title={item.title}
								releaseDate={item.releaseDate}
								posterUrl={item.posterUrl}
								description={item.description}
								id={item._id}
							/>
						</Box>
						
					))}
			</Box> */}

			<Box display="flex" flexDirection="row" alignItems="center"
			justifyContent="center"
			width={"100%"}>
				<Grid container spacing={2}
					sx={{
						width:"80%",
						display: "flex",
						justifyContent: "center",
						alignItems:"center"
				}}
				>
					{movies &&
						movies.slice(0, 4).map((item) => (
							<Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
								<MovieItem
									title={item.title}
									releaseDate={item.releaseDate}
									posterUrl={item.posterUrl}
									description={item.description}
									id={item._id}
								/>
							</Grid>
						))}
				</Grid>
			</Box>

			<Box display="flex" justifyContent="center" padding={2}>
				<Button
					component={Link}
					to="/movies"
					variant="outlined"
					sx={{
						color: "#2b2d42",
						"&:hover": {
							backgroundColor: "#2b2d42",
							color: "#fff",
						},
					}}
				>
					View All Movies
				</Button>
			</Box>
		</Box>
	);
}

export default Homepage;
