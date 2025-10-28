import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useGoogleLogin } from "@react-oauth/google";
import { PhantomWalletName } from "@solana/wallet-adapter-phantom";
import { useWallet } from "@solana/wallet-adapter-react";
import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import ReactJson from "react-json-view";
import { SpotifyAuth, SpotifyAuthListener } from "react-spotify-auth";
import "react-spotify-auth/dist/index.css";
function App() {
	const [data, setData] = useState({});
	const [limit, setLimit] = useState(1);
	const [message, setMessage] = useState("");
	const { getAccessToken, authenticated } = usePrivy();
	const { wallet, connect, connected, signMessage, select } = useWallet();
	const { login } = useLogin();
	const sign = async () => {
		const data = new TextEncoder().encode(message);
		const signature = await signMessage(data);
		setData({
			wallet: wallet.readyState,
			signature: btoa(String.fromCharCode(...signature)),
			message: message
		})
	}
	
	useEffect(() => {
		select(PhantomWalletName);
		gapi.load("client:auth2", () => {
			gapi.client.init({
				clientId:
					"970416655854-lshvdvota7og26upes5tij7n9vslke8g.apps.googleusercontent.com",
				scope: "email",
			});
		});
	}, []);

	useEffect(() => {
		if (!authenticated) return;
		const getToken = async () => {
			const accessToken = await getAccessToken();
			setData({ accessToken });
		};
		getToken();
	}, [authenticated]);

	const responseGoogle = (response) => {
		setData(response);
	};

	const getRandomInt = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	const generateUniqueRandomArray = (size, min, max) => {
		const set = new Set();
		while (set.size < size) {
			set.add(getRandomInt(min, max));
		}
		return Array.from(set).sort((a, b) => Number(a) - Number(b));
	};

	const gen = () => {
		const result = [];
		for (let i = 0; i < limit; i++) {
			const randomArray = generateUniqueRandomArray(6, 1, 55);
			result.push(randomArray);
		}
		setData(result);
	};

	const handleLogin = useGoogleLogin({
		flow: "auth-code",
		onSuccess: async (codeResponse) => {
			setData(codeResponse);
		},

		onError: (errorResponse) => {
			console.log("Login Failed: res:", errorResponse);
		},
	});

	return (
		<>
			<GoogleLogin
				clientId="970416655854-lshvdvota7og26upes5tij7n9vslke8g.apps.googleusercontent.com"
				buttonText="Login"
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={"single_host_origin"}
			/>
			<button
				onClick={() =>
					login({
						loginMethods: ["wallet", "email", "google", "twitter"],
						walletChainType: "ethereum-and-solana",
						disableSignup: false,
					})
				}
			>
				Login Privy
			</button>
			<input
				type="number"
				value={limit}
				onChange={(e) => setLimit(Number(e.target.value))}
			/>
			<button onClick={gen}>Generate</button>
			<button onClick={() => setData({})}>Clear</button>
			<button onClick={() => handleLogin()}>Login</button>
			<input
				type="text"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<button onClick={() => connect()}>{"Connect Wallet"}</button>
			<button onClick={() => sign()}>Sign</button>
			<FacebookLogin appId="1402015690993283" callback={responseGoogle} />
			<SpotifyAuth
				redirectUri="https://dev-domain.site"
				clientID="4c6364eb76594341b413c786abbeb071"
				scopes={["user-read-email", "user-read-private"]} // Adjust scopes as needed
				onAccessToken={responseGoogle}
			/>

			{/* Spotify Auth Listener handles token refresh */}
			<SpotifyAuthListener onAccessToken={responseGoogle} />
			<ReactJson src={data} />
		</>
	);
}

export default App;
