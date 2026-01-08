import { PrivyProvider } from "@privy-io/react-auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { WalletProvider } from "@solana/wallet-adapter-react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<WalletProvider wallets={[new PhantomWalletAdapter()]}>
				<PrivyProvider appId="cm8o0imcd01vi70j0dkibyzyy" config={{}}>
					<GoogleOAuthProvider
						clientId={
							"825033185742-pb7coi6q7s5kurufbfknjj23umudo8ei.apps.googleusercontent.com"
						}
					>
						<App />
					</GoogleOAuthProvider>
				</PrivyProvider>
			</WalletProvider>
		</QueryClientProvider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
