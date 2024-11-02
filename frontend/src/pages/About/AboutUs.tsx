import { ArrowBackIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate()
  return (
    <div className="p-5 flex justify-center items-center flex-col min-h-lvh text-xl text-center">
      <ArrowBackIos onClick={()=>navigate(-1)} className="absolute left-4 top-4"  />
      <p className=" font-bold underline">
        About <del className="opacity-40">Us</del> Me
      </p>
      <ul>
        <li>
          <a
            className="text-link"
            href="https://aravindvjn.github.io/profile/"
            target="_blank"
          >
           My Portfolio
          </a>
        </li>
        <li>
          <a
            href="https://github.com/aravindvjn"
            className="text-link"
            target="_blank"
          >
            My GitHub
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AboutUs;
