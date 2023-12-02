import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const getAllMovies = async () => {
	const res = await axios.get("/movie").catch((err) => console.log(err));

	if (res.status !== 200) {
		return toast.error(res.data.message);
	}
console.log(res.data);
	const data = await res.data;
	return data;
};

export const sendUserAuthRequest = async (data, signup) => {
	const res = await axios
		.post(`/user/${signup ? "signup" : "login"}`, {
			name: signup ? data.name : "",
			email: data.email,
			password: data.password,
		})
		.catch((err) => {
			toast.error("Enter all details..or try after");
			console.log(err);
		});
	
	toast.success(res.data.message);
	if (res.status !== 200 && res.status !== 201) {
			toast.error(res.data.message);
		console.log("Unexpected Error occured");
	}

	const resData = await res.data;
	return resData;
};

export const sendAdminAuthRequest = async (data) => {
	const res = await axios
		.post("/admin/login", {
			email: data.email,
			password: data.password,
		})
		.catch((err) => toast.error("Enter all details..or try after"))
	toast.success(res.data.message);
	if (res.status !== 200) {
		toast.error(res.message);
		return console.log("Unexpected Error");
	}

	const resData = await res.data;
	return resData;
};

export const getMoviesDetails = async (id) => {
	const res = await axios.get(`/movie/${id}`).catch((err) => console.log(err));
	if (res.status !== 200) return toast.error(res.data.message);
	const resData = await res.data;
	toast.success(res.data.message);
	return resData;
};
export const newBooking = async (data) => {
	try {
		const res = await axios.post("/booking", {
			movie: data.movie,
			date: data.date,
			seatNumber: data.seatNumber,
			user: localStorage.getItem("userId"),
		});

		// Check if the response is successful (status code 201)
		if (res.status === 201) {
			toast.success("Successfully Booked");
			return res.data;
		} else {
			// If the status is not 201, display an error message
			toast.error("Error while booking.");
			return null;
		}
	} catch (err) {
		// If there's an error during the request, display an error message
		toast.error("Error while booking(Enter Below informatiottn) or refresh page");
		console.log(err);
		return null;
	}
};


export const getUserBooking = async () => {
	const id = localStorage.getItem("userId");
	try {
		const res = await axios.get(`/user/bookings/${id}`);
		toast.success(res.data.message);
		if (res.status !== 200) {
			toast.error(res.data.message);
			
			return null; // or handle the error accordingly
		}

		const resData = res.data;
toast.success(res.data.message);
		return resData;
	} catch (err) {
		toast.error(res.data.message);
		
		return null; // or handle the error accordingly
	}
};

export const deleteBooking = async (id) => {
	const res = await axios
		.delete(`/booking/${id}`)
		.catch((err) => toast.error(res.data.message));

	if (res.status !== 200) toast.error(res.data.message);;
	const resData = res.data;
	toast.success(res.data.message);
	return resData;
};

export const getUserDetails = async () => {
	const id = localStorage.getItem("userId");
	const res = await axios.get(`/user/${id}`).catch((err) => {
		console.log(err);
	});

	if (res.status !== 200) {
		return toast.error(res.data.message);
	}

	const resData = await res.data;
	return resData;
};

export const addMovie = async (data) => {
	

	const res = await axios
		.post(
			"/movie",
			{
				title: data.title,
				description: data.description,
				releasDate: data.releasDate,
				posterUrl: data.posterUrl,
				fetaured: data.fetaured,
				actors: data.actors,
				admin: localStorage.getItem("adminId"),
			},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		)
		.catch((err) => {
			toast.error(res.data.message);

		});

	if (res.status !== 201) {
		
		return toast.error(res.data.message);
	}

	 toast.success("Movie Added Successfully");
	const resData = await res.data;

	return resData;
};

export const getAdminById = async () => {
	const adminId = localStorage.getItem("adminId");
	const res = await axios.get(`admin/${adminId}`).catch((err) => {
		toast.success(res.data.message);
	});
	console.log(res);
	if (res.status !== 200) return toast.error(res.data.message);

	const resData = res.data;
	return resData;
};
