import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-helpers/api-helpers";
import MovieItem from "./MovieItem";

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies().then((data)=> setMovies(data)).catch((err)=> console.log(err))
  }, [])
	return (
		

		<Box margin={"auto"} marginTop={4}
		
		>

			<Typography
				variant="h4"
				padding={2}
				textAlign="center"
				bgcolor={"#900C3F"}
				color={"white"}
			>
				All Movies
			</Typography>

			<Box
				width={"100%"}
				margin="auto"
				display={"flex"}
				
				justifyContent={"center"}
				flexWrap={"wrap"}
			>
				{/* {movies && movies.map((movie, index) => { 
          
          <MovieItem key={index} id={movie.id} posterUrl={movie.posterUrl} title={movie.title} />
        })} */}
				{movies &&
					movies.map((item, index) => (
						
						<MovieItem
							title={item.title}
							releaseDate={item.releaseDate}
							posterUrl={item.posterUrl}
							description={item.description}
							id={item._id}
							key={item}
						/>
					))}
			</Box>
		</Box>
	);
}

export default Movies;
