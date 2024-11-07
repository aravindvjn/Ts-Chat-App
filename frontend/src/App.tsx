import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import UserProvider, { UserContext } from "./global/Context/UserContext";
import Auth from "./pages/Auth/Auth";
import Search from "./pages/Search/Search";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import SetProfile from "./pages/Auth/SetProfile";
import UserProfile from "./pages/UserProfile/UserProfile";
import { useContext, useEffect, useState } from "react";
import Notifications from "./pages/Notifications/Notifications";
import OtherProfiles from "./pages/OtherProfiles/OtherProfiles";
import { getUserData } from "./global/UserData/UserData";
import EditYourProfile from "./pages/UserProfile/EditYourProfile";
import ChangePass from "./pages/UserProfile/ChangePass";
import AboutApp from "./pages/About/AboutApp";
import AboutUs from "./pages/About/AboutUs";
import Notification from "./components/DropDown/Notification";
import SplashScreen from "./components/SplashScreen/SplashScreen";

function App() {
  const [gotData, setGotData] = useState<boolean>(false);
  const location = useLocation();
  const userData = useContext(UserContext);
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserData();
      setGotData(true);
      userData?.setUser(user);
      console.log(user);
    };
    fetchUser();
  }, [location.pathname]);
  if (!gotData) {
    return <SplashScreen />;
  }
  return (
    <div className="max-w-[640px] m-auto min-h-svh bg-background">
      {userData?.notification && (
        <Notification
          notification={userData?.notification}
          setNotification={userData?.setNotification}
        />
      )}
      <Routes>
        <Route path="/" element={userData?.user ? <Home /> : <Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register/set-profile" element={<SetProfile />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/about-this-app" element={<AboutApp />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route
          path="/notifications"
          element={userData?.user ? <Notifications /> : <Auth />}
        />
        <Route
          path="/chat-room/:chat_id"
          element={userData?.user ? <ChatRoom /> : <Auth />}
        />
        <Route
          path="/profile-user/:id"
          element={userData?.user ? <OtherProfiles /> : <Auth />}
        />
        <Route
          path="/search"
          element={userData?.user ? <Search /> : <Auth />}
        />
        <Route
          path="/user-profile"
          element={userData?.user ? <UserProfile /> : <Auth />}
        />
        <Route
          path="/edit-your-profile"
          element={userData?.user ? <EditYourProfile /> : <Auth />}
        />
        <Route
          path="/change-your-password"
          element={userData?.user ? <ChangePass /> : <Auth />}
        />
        {/* <Route path="*" element={<Auth />} /> */}
      </Routes>
    </div>
  );
}

const AppWrapper = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  );
};

export default AppWrapper;
