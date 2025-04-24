import { useLogin, usePrivy } from "@privy-io/react-auth";
import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import ReactJson from "react-json-view";

function App() {
  const [data, setData] = useState({});
  const [limit, setLimit] = useState(1);
  const { getAccessToken, authenticated } = usePrivy();
  const { login } = useLogin();

  useEffect(() => {
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
  }

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
      <ReactJson src={data} />
    </>
  );
}

export default App;
