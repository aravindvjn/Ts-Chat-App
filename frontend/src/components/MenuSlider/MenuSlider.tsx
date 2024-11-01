import React, { useContext } from "react";
import { AppName } from "../../global/Links/Links";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../global/Context/UserContext";

export type MenuProps = {
  setMenuStatus: React.Dispatch<React.SetStateAction<boolean>>;
};
const MenuSlider = ({ setMenuStatus }: MenuProps) => {
  const navigate = useNavigate();
  const Content = useContext(UserContext);
  const logoutHandler = () => {
    Content?.setUser(null);
    localStorage.clear();
    navigate("/login");
  };
  const liClassess = "py-5 flex justify-center  border-b-2";
  return (
    <div
      data-aos="fade-in"
      className="fixed right-0 bottom-0 top-0 left-0 z-10 backdrop-blur-sm flex justify-end bg-black/10"
    >
      <div onClick={() => setMenuStatus(false)} className=" h-full w-1/2"></div>
      <div
        data-aos="slide-left"
        className=" bg-background h-full w-1/2 border-l-2"
        onClick={() => {
          setMenuStatus(true);
        }}
      >
        <ul className="flex flex-col">
          <li className={liClassess}>Account</li>
          <li className={liClassess}>About us</li>
          <li className={liClassess} onClick={logoutHandler}>
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuSlider;
