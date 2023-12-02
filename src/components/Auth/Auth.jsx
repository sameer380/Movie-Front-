import React from "react";
import AuthForm from "./AuthForm";
import { sendUserAuthRequest } from "../../api-helpers/api-helpers";
import { userActions } from "../../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Auth() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const onResReceived = (data) => {
		console.log(data);
		dispatch(userActions.login());
		localStorage.setItem("userId", data?.id);
		navigate("/home");
	}
  const getData = (data) => {
		console.log("Admin-->  ",data);
	  sendUserAuthRequest(data.inputs, data.signup).then(onResReceived).catch((err) => toast.error("Verify the data"));
	};
	return (
		<div>
			<AuthForm onsubmit={getData} isAdmin={false}/>
		</div>
	);
}

export default Auth;
