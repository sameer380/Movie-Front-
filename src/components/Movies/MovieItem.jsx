import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

function MovieItem({ title, releaseDate, posterUrl, id, key }) {

	return (
		<Link to={`/booking/${id}`} style={{ textDecoration: "none" }}>
			<Card
				sx={{
					height: "55vh",
					margin: 2,
					cursor: "pointer",
					width: 280,
					borderRadius: 5,
					":hover": {
						boxShadow: "10px 10px 20px #0f0c0c",
					},
				}}
				key={id}
			>
				<img src={posterUrl} alt={title} height={"70%"} width="100%" />
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{new Date(releaseDate).toDateString()}
					</Typography>
				</CardContent>
				<CardActions sx={{ display: "flex", justifyContent: "center" }}>
					<Button
						sx={{ margin: "auto" }}
						component={Link}
						to={`/booking/${id}`}
						variant="contained"
						fullWidth
					>
						Book
					</Button>
				</CardActions>
			</Card>
		</Link>
	);
}

export default MovieItem
