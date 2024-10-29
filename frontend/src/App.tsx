import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import UserProvider, { UserContext } from "./global/Context/UserContext";
import Footer from "./components/Footer/Footer";
import Auth from "./pages/Auth/Auth";
import Search from "./pages/Search/Search";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import SetProfile from "./pages/Auth/SetProfile";
import UserProfile from "./pages/UserProfile/UserProfile";
import { useContext } from "react";

function App() {
  const location = useLocation();
  const noFooter = ["/login", "/register", "/register/set-profile"].includes(
    location.pathname
  );
  const userData = useContext(UserContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/register/set-profile" element={<SetProfile />} />
        <Route path="/chat-room" element={<ChatRoom />} />
        <Route path="/search" element={<Search />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
      {!noFooter && <Footer />}
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
