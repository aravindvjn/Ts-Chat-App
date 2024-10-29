type PopUpProps = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
    duration: 100, 
});
const PopUp = ({ message, setMessage }: PopUpProps) => {
  return (
    <div data-aos="fade-in" className="fixed right-0 left-0 bottom-0 top-0 flex justify-center items-center  text-black backdrop-blur-sm">
      <div data-aos="zoom-in" className="p-6 m-6 rounded-md bg-white flex flex-col items-center gap-4 border-2 border-yellow-500 text-center">
        <p>{message}</p>
        <button
          className="px-4 py-2 bg-black text-white rounded-lg w-fit"
          onClick={() => setMessage("")}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default PopUp;
