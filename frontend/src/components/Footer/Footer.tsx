import { Home, Notifications, Person, Search } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../global/Context/UserContext";
import { friendURL } from "../../global/Links/Links";

const Footer = () => {
  const token = localStorage.getItem("token");
  const [notificationNo, setNotificationNo] = useState<number>(0);
  const userContext = useContext(UserContext);
  const footerClasses = "text-black cursor-pointer";
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  useEffect(() => {
    const fetchAllFriends = async () => {
      try {
        const response = await fetch(friendURL + "pending-requests", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.status === 200) {
          setNotificationNo(data?.length);
        } else {
          setNotificationNo(0);
        }
      } catch (err) {}
    };
    fetchAllFriends();
  }, [ userContext?.notification]);
  return (
    <div className="flex justify-around items-center bg-secondary h-16 fixed right-0 left-0 bottom-0  shadow-top max-w-[640px] m-auto">
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
      <div className="relative">
        <Notifications
          className={`${footerClasses} ${
            pathname === "/notifications" ? "opacity-75" : ""
          }`}
          fontSize="large"
          onClick={() => navigate("/notifications")}
        />

        {notificationNo > 0 && (
          <p className="absolute right-0 top-0 bg-red-600  text-white rounded-full h-4 w-4 flex justify-center items-center text-[10px]">
            {notificationNo}
          </p>
        )}
      </div>
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
