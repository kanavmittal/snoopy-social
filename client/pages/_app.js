import "../styles/globals.css";
import axios from "axios";
import NavBar from "../components/navBar.tsx";
import { useRouter } from "next/router";
axios.defaults.baseURL = "http://localhost:5001/api";
axios.defaults.withCredentials = true;
function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const authRoutes = ["/register", "/login"];
  const authRoute = authRoutes.includes(pathname);
  return (
    <>
      {!authRoute && <NavBar></NavBar>}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
