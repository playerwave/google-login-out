import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

function App() {
  const clientId =
    "534884705598-aclcrjgtdc488ant011232g7gsfa25mp.apps.googleusercontent.com";
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const onSuccess = (res) => {
    setProfile(res.profileObj);
    console.log("success", res);
  };

  const onFailure = (res) => {
    console.log("fail", res);
  };

  const logOut = () => {
    setProfile(null);
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br /> <br />
      {profile ? (
        <div>
          <img src={profile.imageUrl} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <br />
          <br />
          <GoogleLogout
            clientId={clientId}
            buttonText="Log out"
            onLogoutSuccess={logOut}
          />
        </div>
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      )}
    </div>

    // <GoogleLogin
    //   clientId={clientId}
    //   buttonText="Sign in with Google"
    //   onSuccess={onSuccess}
    //   onFailure={onFailure}
    //   cookiePolicy={"single_host_origin"}
    //   isSignedIn={true}
    // />
  );
}

export default App;
