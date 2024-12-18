import { useEffect, useState } from "react";
import { AppName } from "../../global/Links/Links";
const SplashScreen = () => {
  const [wait, setWait] = useState<string>("");
  useEffect(() => {
    setTimeout(() => {
      setWait("Almost there,Please wait.");
      setTimeout(() => {
        setWait("Just a little longer!");
setTimeout(() => {
        setWait("Please check your Connection.");
      }, 30000);
      }, 10000);

    }, 3000);
  }, []);
  return (
    <div
      data-aos="fade-in"
      className="bg-background justify-center flex items-center min-h-svh flex-col gap-2"
    >
      <p className="text-black opacity-20 text-4xl font-extrabold">{AppName}</p>
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-black opacity-20 animate-bounce"></div>
        <div className="w-3 h-3 rounded-full bg-black opacity-20 animate-bounce animation-delay-400"></div>
        <div className="w-3 h-3 rounded-full bg-black opacity-20 animate-bounce animation-delay-800"></div>
      </div>
      <div data-aos="fade-in" style={{ opacity: `${wait ? "0.4" : "0"}` }}>
        {wait || "Loading"}
      </div>
    </div>
  );
};

export default SplashScreen;
