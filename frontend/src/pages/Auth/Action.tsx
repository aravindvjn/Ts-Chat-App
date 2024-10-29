import { AuthProps } from "./Auth";
import { useNavigate } from "react-router-dom";

const Action = ({ page }: AuthProps) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    if (page === "Register") {
      navigate("/login");
    } else {
      navigate("/register");
    }
  };
  const navigateClasses = "font-bold cursor-pointer";
  return (
    <>
      <button
        type="submit"
        className="uppercase bg-white text-black p-2 rounded mt-2"
      >
        {page}
      </button>
      {page === "Register" ? (
        <p className="text-center">
          Already have an account?{' '}
          <span className={navigateClasses} onClick={handleNavigation}>
             Login
          </span>
        </p>
      ) : (
        <p className="text-center">
          Don't have an account?{' '}
          <span className={navigateClasses} onClick={handleNavigation}>
             Register
          </span>
        </p>
      )}
    </>
  );
};

export default Action;
