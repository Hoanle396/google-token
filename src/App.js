import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import ReactJson from "react-json-view";
import { useLogin, usePrivy } from "@privy-io/react-auth";

function App() {
  const [data, setData] = useState({});
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
            loginMethods: ["wallet"],
            walletChainType: "ethereum-and-solana",
            disableSignup: false,
          })
        }
      >
        Login Privy
      </button>
      <ReactJson src={data} />
    </>
  );
}

export default App;
