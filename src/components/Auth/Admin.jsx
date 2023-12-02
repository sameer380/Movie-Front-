import React from "react";
import AuthForm from "./AuthForm";
import { sendAdminAuthRequest } from "../../api-helpers/api-helpers";
import { useDispatch } from "react-redux";
import { adminActions } from "../../store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Admin() {
	const navigate = useNavigate();
		const dispatch = useDispatch();
	const onResReceived = (data) => {
		console.log(data);
		
		dispatch(adminActions.login());
		localStorage.setItem("adminId", data?.id);
		localStorage.setItem("token", data?.token);
		navigate("/home")
	}

	const getData = (data) => {
		console.log(data);
		sendAdminAuthRequest(data.inputs).then(onResReceived).catch((err)=> toast.error("Wrong Details"))
	};
	return (
		<div>
			<AuthForm onsubmit={getData} isAdmin={true} />
		</div>
	);
}

export default Admin;
