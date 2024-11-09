import { useContext, useState } from "react";
import Input from "../../components/Input/Input";
import { AuthProps } from "./Auth";
import { FormProps } from "./type";
import Action from "./Action";
import { useNavigate } from "react-router-dom";
import PopUp from "../../components/PopUp/PopUp";
import handleSubmit from "./handleSubmit";
import { AppName, authURL } from "../../global/Links/Links";
import { UserContext } from "../../global/Context/UserContext";
import Loading from "../../components/Loading/Loading";
import logo from "../../assets/TransparentLogo.png";

const Form = ({ page = "Login" }: AuthProps) => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [input, setInput] = useState<FormProps>({
    name: "",
    username: "",
    password: "",
    cpassword: "",
    profile_pic_url: "",
    bio: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmitCheck = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (page === "Register") {
      const check = /^[a-z0-9_]{7,}$/;
      if (!check.test(input.username)) {
        setMessage(
          "The username must contain only lowercase letters, numbers, and underscores, and be more than 6 characters long."
        );
      } else if (
        !input.name ||
        !input.password ||
        !input.username ||
        !input.cpassword
      ) {
        setMessage("input field cannot be empty.");
      } else if (input.password.length < 8) {
        setMessage("Password must be at least 8 characters long.");
      } else if (input.cpassword !== input.password) {
        setMessage(
          "Password do not match. Please make sure both fields are identical"
        );
      } else {
        if (input.username.length >= 6 && page === "Register") {
          const fetchStatus = async () => {
            const response = await fetch(authURL + "check-username-status", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username: input.username }),
            });
            if (response.status === 200) {
              setMessage("Username already exists.");
            } else {
              navigate("/register/set-profile", {
                state: input,
              });
            }
          };
          fetchStatus();
        }
      }
    } else {
      setLoading(true);
      const response = await handleSubmit(input, "login");
      if (response.status) {
        userContext?.setUser({
          username: response.data.username,
          bio: response.data.bio,
          created_at: response.data.created_at,
          profile_pic_url: response.data.profile_pic_url,
          user_id: response.data.user_id,
          name: response.data.name,
        });
        navigate("/");
        setLoading(false);
      } else {
        setMessage(response.message);
        setLoading(false);
      }
    }
  };
  const messages = {
    Register: "Create your account and start chatting with friends!",
    Login:
      "Welcome back! Log in to continue your chats and stay connected with your friends.",
  };
  return (
    <form
      onSubmit={handleSubmitCheck}
      className="flex flex-col gap-3 px-10 sm:w-[500px]"
    >
      {loading && <Loading />}
      {message && <PopUp message={message} setMessage={setMessage} />}
      <div className="flex flex-col">
        <img src={logo} className="self-center h-16" />
        <p className="text-center font-bold">{AppName}</p>
        <p className="text-center">
          {page === "Register" ? messages.Register : messages.Login}{" "}
        </p>
      </div>
      {page === "Register" && (
        <Input
          type="text"
          placeholder="Name"
          value={input.name}
          name="name"
          onChange={handleChange}
          maxlength={20}
          minlength={6}
        />
      )}
      <Input
        type="text"
        placeholder="Username"
        value={input.username}
        name="username"
        onChange={handleChange}
        maxlength={15}
        minlength={6}
      />

      <Input
        type="password"
        placeholder="Password"
        value={input.password}
        name="password"
        onChange={handleChange}
      />
      {page === "Register" && (
        <Input
          type="password"
          placeholder="Confirm Password"
          value={input.cpassword}
          name="cpassword"
          onChange={handleChange}
        />
      )}
      <Action page={page} />
    </form>
  );
};

export default Form;
