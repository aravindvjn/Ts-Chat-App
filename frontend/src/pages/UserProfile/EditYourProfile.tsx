import React, { useContext, useState } from "react";
import { UserContext } from "../../global/Context/UserContext";
import { FormProps } from "../Auth/type";
import Input from "../../components/Input/Input";
import { uploadProfilePicture } from "../../firebase/firebase";
import Avatar from "../../components/Avatar/Avatar";
import { authURL } from "../../global/Links/Links";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import ChatHeader from "../ChatRoom/ChatHeader";

const EditYourProfile = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<FormProps>({
    name: userContext?.user?.name,
    username: "",
    profile_pic_url: userContext?.user?.profile_pic_url,
    bio: userContext?.user?.bio,
  });
  const handlePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    if (fileList && fileList.length > 0 && userContext?.user?.username) {
      const file = fileList[0];
      setLoading(true);
      uploadProfilePicture(file, userContext?.user?.username).then((url) => {
        if (url) {
          console.log("Profile picture URL:", url);
          setInput({
            ...input,
            profile_pic_url: url,
          });
          setLoading(false);
        }
      });
    } else {
      console.error("No file selected.");
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };
  const submitHandler = async () => {
    try {
      setLoading(true);
      const response = await fetch(authURL + "change-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(input),
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        console.log(data.message);
        navigate("/");
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log("Error in Updating profile.");
    }
  };
  return (
    <div className=" text-gray-600 p-5 flex flex-col justify-center items-center pt-24">
      <ChatHeader />
      {loading && <Loading />}
      <Input
        type="text"
        placeholder="Name"
        onChange={handleChange}
        value={input.name}
        name="name"
        maxlength={20}
        minlength={6}
      />
      <Input
        type="text"
        placeholder="Bio"
        onChange={handleChange}
        value={input.bio}
        name="bio"
      />
      <p className=" pt-3 self-start">Profile Picture : </p>
      <div className="relative">
        <Avatar
          variant="double"
          src={input.profile_pic_url}
          className="w-[224px] h-[180px]"
        />
        <Delete
          className="absolute cursor-pointer -right-6 top-0"
          onClick={() => setInput({ ...input, profile_pic_url: "" })}
        />
      </div>
      <p className="text-sm mt-3 text-red-700">
        Note: Once you upload a new picture, you won't be able to revert to the
        previous one.
      </p>
      <label
        htmlFor="photo-upload"
        className="mt-2 flex flex-col items-center justify-center w-1/3 h-16 bg-gray-50 rounded-lg border-4 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <p className="text-sm text-gray-500">Click to upload.</p>
        </div>
        <input
          id="photo-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handlePreview}
        />
      </label>
      <p className="text-gray-600 mt-5 self-start">Confirm Changes?</p>
      <button
        onClick={submitHandler}
        className="px-3 py-2 bg-green-600 text-white rounded-lg self-start"
      >
        Save{" "}
      </button>
    </div>
  );
};

export default EditYourProfile;
