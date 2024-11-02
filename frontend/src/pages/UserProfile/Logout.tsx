import { LogoutOutlined } from "@mui/icons-material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../global/Context/UserContext";

const Logout = () => {
  const navigate = useNavigate();
  const Content = useContext(UserContext);
  const logoutHandler = () => {
    Content?.setUser(null);
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div
      onClick={logoutHandler}
      className="flex px-3 py-2 bg-red-500 w-fit rounded-lg text-white cursor-pointer"
    >
      <LogoutOutlined />
      <p>Logout</p>
    </div>
  );
};

export default Logout;
