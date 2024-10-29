import { useLocation } from "react-router-dom";
import Form from "./Form";

export type AuthProps = {
  page: string;
};

const Auth = () => {
  const location = useLocation();
  const page = location?.pathname === "/login" ? "Login" : "Register";
  return (
    <div className="flex justify-center min-h-lvh items-center bg-black text-background">
      <Form page={page} />
    </div>
  );
};

export default Auth;