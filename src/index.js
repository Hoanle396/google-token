import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PrivyProvider } from "@privy-io/react-auth";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<PrivyProvider appId="cm8o0imcd01vi70j0dkibyzyy" config={{}}>
			<GoogleOAuthProvider
				clientId={
					"487589515794-r535o9i6cm74dkjbaqjuqjvqvbssi6cr.apps.googleusercontent.com"
				}
			>
				<App />
			</GoogleOAuthProvider>
		</PrivyProvider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
