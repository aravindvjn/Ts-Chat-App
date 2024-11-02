import { Menu } from "@mui/icons-material";
import { AppName } from "../../global/Links/Links";
import { useState } from "react";
import MenuSlider from "../MenuSlider/MenuSlider";

const Header = () => {
  const [menuStatus, setMenuStatus] = useState<boolean>(false);
  return (
    <div className="bg-secondary z-10 fixed right-0 left-0 top-0 h-16 flex items-center max-w-[640px] m-auto justify-between shadow-sm shadow-gray-300">
      {menuStatus && <MenuSlider setMenuStatus={setMenuStatus} />}
      <p className="text-black pl-4 text-lg font-semibold">{AppName}</p>
      <Menu
        onClick={() => setMenuStatus(true)}
        fontSize="large"
        className="text-black mr-4 cursor-pointer"
      />
    </div>
  );
};

export default Header;
