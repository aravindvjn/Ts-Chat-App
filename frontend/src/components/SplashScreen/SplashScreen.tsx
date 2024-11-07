import { AppName } from "../../global/Links/Links";

const SplashScreen = () => {
  return (
    <div data-aos="fade-in" className="bg-background justify-center flex items-center min-h-svh">
      <p className="text-black opacity-5 text-4xl font-extrabold">{AppName}</p>
    </div>
  );
};

export default SplashScreen;
