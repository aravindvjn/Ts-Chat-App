import { useState } from "react";
import Input from "../../components/Input/Input";
import { AuthProps } from "./Auth";
import { FormProps } from "./type";
import Action from "./Action";
import { useNavigate } from "react-router-dom";
import PopUp from "../../components/PopUp/PopUp";
import handleSubmit from "./handleSubmit";
import { AppName } from "../../global/Links/Links";

const Form = ({ page = "Login" }: AuthProps) => {
  const navigate = useNavigate();
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
    console.log(input);
    if (page === "Register") {
      if (
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
        navigate("/register/set-profile", {
          state: input,
        });
      }
    } else {
      console.log("login");
      const response = await handleSubmit(input, "login");
      console.log(response)
      if (response.status) {
        navigate("/");
      } else {
        console.log(response.message);
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
      {message && <PopUp message={message} setMessage={setMessage} />}
      <p className="text- text-center font-bold">{AppName}</p>
      <p className="text-center">
        {page === "Register" ? messages.Register : messages.Login}{" "}
      </p>
      {page === "Register" && (
        <Input
          type="text"
          placeholder="Name"
          value={input.name}
          name="name"
          onChange={handleChange}
        />
      )}
      <Input
        type="text"
        placeholder="Username"
        value={input.username}
        name="username"
        onChange={handleChange}
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
