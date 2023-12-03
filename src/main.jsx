import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import { store } from "./store/index.js";
import { ToastContainer } from "react-toastify";
axios.defaults.baseURL = "https://frantic-pig-bikini.cyclic.app";
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
		<ToastContainer />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);
