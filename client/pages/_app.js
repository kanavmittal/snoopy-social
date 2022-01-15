import "../styles/globals.css";
import axios from "axios";
import NavBar from "../components/navBar.tsx";
axios.defaults.baseURL = "http://localhost:5001/api";
axios.defaults.withCredentials = true;
function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar></NavBar>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
