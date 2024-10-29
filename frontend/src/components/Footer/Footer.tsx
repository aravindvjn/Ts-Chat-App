import { Home, Person, Search } from "@mui/icons-material";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserData } from "../../global/UserData/UserData";
import { UserContext } from "../../global/Context/UserContext";

const Footer = () => {
  const userContext = useContext(UserContext);
  const footerClasses = "text-black cursor-pointer";
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  useEffect(() => {
    console.log("Refreshed");
    const fetchUser = async () => {
      const userData = await getUserData();
      console.log(userData);
      userContext?.setUser(userData);
    };
    if (userContext) {
      fetchUser();
    }
  }, [pathname]);
  return (
    <div className="flex justify-around items-center bg-secondary h-16 fixed right-0 left-0 bottom-0 shadow-top">
      <Home
        className={`${footerClasses} ${pathname === "/" ? "opacity-75" : ""}`}
        fontSize="large"
        onClick={() => navigate("/")}
      />
      <Search
        className={`${footerClasses} ${
          pathname === "/search" ? "opacity-75" : ""
        }`}
        fontSize="large"
        onClick={() => navigate("/search")}
      />
      <Person
        className={`${footerClasses} ${
          pathname === "/user-profile" ? "opacity-75" : ""
        }`}
        fontSize="large"
        onClick={() => navigate("/user-profile")}
      />
    </div>
  );
};

export default Footer;
