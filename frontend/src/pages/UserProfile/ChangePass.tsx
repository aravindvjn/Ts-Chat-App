import React, { useState } from "react";
import Input from "../../components/Input/Input";
import { authURL } from "../../global/Links/Links";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import PopUp from "../../components/PopUp/PopUp";

type PasswordProps = {
  oldpassword: string | undefined;
  newpassword: string | undefined;
  cnewpassword: string | undefined;
};
const ChangePass = () => {
  const [input, setInput] = useState<PasswordProps>({
    oldpassword: "",
    newpassword: "",
    cnewpassword: "",
  });
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [event.target.name]: event.target.value });
    console.log(input);
  };
  const submitHandler = async () => {
    if (!input.cnewpassword || !input.newpassword || !input.oldpassword) {
      setMessage("input field cannot be empty.");
    } else if (input.newpassword.length < 8) {
      setMessage("Password must be at least 8 characters long.");
    } else if (input.newpassword !== input.cnewpassword) {
      setMessage(
        "Password do not match. Please make sure both fields are identical"
      );
    } else if (input.newpassword === input.oldpassword) {
      setMessage(
        "The new password must be different from the current password."
      );
    } else {
      try {
        setLoading(true);
        const response = await fetch(authURL + "change-mypass", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(input),
        });
        const data = await response.json();
        setLoading(false);
        console.log(data.message)
        if (response.status === 200) {
          setMessage(data.message);
          navigate("/");
        } else {
          setMessage(data.message);
        }
      } catch (err) {
        console.log("Error in Updating profile.");
      }
    }
  };
  return (
    <div className="p-5 flex flex-col justify-center items-center gap-5 min-h-svh">
      <p className="font-bold">Change Your Password</p>
      {loading && <Loading />}
      {message && <PopUp message={message} setMessage={setMessage} />}
      <Input
        onChange={handleChange}
        type="password"
        placeholder="Current Password"
        name="oldpassword"
        value={input.oldpassword}
      />
      <Input
        value={input.newpassword}
        onChange={handleChange}
        type="password"
        placeholder="New Password"
        name="newpassword"
      />
      <Input
        value={input.cnewpassword}
        onChange={handleChange}
        type="password"
        placeholder="Confirm New Password"
        name="cnewpassword"
      />
      <button
        onClick={submitHandler}
        className="px-3 py-2 bg-green-600 text-white rounded-lg"
      >
        Submit
      </button>
    </div>
  );
};

export default ChangePass;
