import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import { uploadProfilePicture } from "../../firebase/firebase";
import handleSubmit from "./handleSubmit";
import { useState } from "react";
import { FormProps } from "./type";
import Loading from "../../components/Loading/Loading";
import PopUp from "../../components/PopUp/PopUp";

const SetProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { state } = location;
  const [input, setInput] = useState<FormProps>({
    name: "",
    username: "",
    password: "",
    cpassword: "",
    profile_pic_url: "",
    bio: "",
    ...state,
  });
  const handlePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      setLoading(true);
      uploadProfilePicture(file, input.username).then((url) => {
        if (url) {
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
  const bioHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput({
      ...input,
      bio: e.target.value,
    });
  };

  //create account
  const submitHandler = async () => {
    setLoading(true);
    const response = await handleSubmit(input, "Register");
    if (response.status) {
      setLoading(false);
      navigate("/");
    } else {
      setMessage(response.message);
      setLoading(false);
    }
  };
  return (
    <div className="bg-black min-h-lvh flex justify-center items-center flex-col">
      {message && <PopUp message={message} setMessage={setMessage} />}
      {loading && <Loading />}
      <p className="text-white">Profile Picture</p>
      <Avatar src={input.profile_pic_url} variant="double" />
      <label
        htmlFor="photo-upload"
        className="mt-5 flex flex-col items-center justify-center w-1/3 h-16 bg-gray-50 rounded-lg border-4 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100"
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
      <div className="min-w-[250px] flex flex-col mt-5">
        <label htmlFor="bio" className="text-white">
          Bio:
        </label>
        <textarea
          value={input.bio}
          onChange={bioHandler}
          className="p-3 rounded "
          placeholder="What's on your mind."
        />
      </div>
      <button
        className="px-4 py-2 rounded bg-white mt-4"
        onClick={submitHandler}
      >
        Create Account
      </button>
    </div>
  );
};

export default SetProfile;
