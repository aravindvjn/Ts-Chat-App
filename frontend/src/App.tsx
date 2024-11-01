import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import UserProvider, { UserContext } from "./global/Context/UserContext";
import Footer from "./components/Footer/Footer";
import Auth from "./pages/Auth/Auth";
import Search from "./pages/Search/Search";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import SetProfile from "./pages/Auth/SetProfile";
import UserProfile from "./pages/UserProfile/UserProfile";
import { useContext, useEffect } from "react";
import Notifications from "./pages/Notifications/Notifications";
import OtherProfiles from "./pages/OtherProfiles/OtherProfiles";
import { getUserData } from "./global/UserData/UserData";
import EditYourProfile from "./pages/UserProfile/EditYourProfile";

function App() {
  const location = useLocation();
  const currentLocation = location.pathname.split("/")[1];
  const userData = useContext(UserContext);
  useEffect(() => {
    console.log("Fetch");
    const fetchUser = async () => {
      const user = await getUserData();
      userData?.setUser(user);
    };
    fetchUser();
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={userData?.user ? <Home /> : <Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register/set-profile" element={<SetProfile />} />
        <Route path="/register" element={<Auth />} />
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
        {/* <Route path="*" element={<Auth />} /> */}
      </Routes>
      {!currentLocation && <Footer />}
    </>
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
