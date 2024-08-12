import { gapi } from "gapi-script";
import { useEffect } from "react";
import { GoogleLogin } from "react-google-login";

function App() {
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId:
          "970416655854-lshvdvota7og26upes5tij7n9vslke8g.apps.googleusercontent.com",
        scope: "email",
      });
    });
  }, []);
  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <GoogleLogin
      clientId="970416655854-lshvdvota7og26upes5tij7n9vslke8g.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
}

export default App;
