import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";

function App() {
  const [data,setData] = useState("");
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
      <pre>   
        <code>
          {data}
        </code>
      </pre>
    </>
  );
}

export default App;
