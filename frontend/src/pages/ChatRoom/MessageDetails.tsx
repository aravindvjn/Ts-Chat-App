import React from "react";
import { convertToIST } from "../../global/Functions/DateConvert";
import classNames from "classnames";
type MessageDetailsProps = {
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  sent_at: string | undefined;
  content: string | undefined;
  status?: boolean | undefined;
};
const MessageDetails = ({
  setShowDetails,
  sent_at,
  status,
  content,
}: MessageDetailsProps) => {
  const messageClasses = classNames(
    "bg-[#BEE3F8] text-black mt-3 w-fit rounded-[12px] p-4 break-words  max-w-[300px] sm:max-w-[450px]",
    {
      "bg-[#E5E7EB]": !status,
    }
  );
  return (
    <div data-aos="fade-in"
      onClick={() => {
        setShowDetails(false);
      }}
      className="flex fixed right-0 left-0 top-0 bottom-0 backdrop-blur-sm justify-center items-center bg-black/50"
    >
      <div className={messageClasses}>
        <p>{content}</p>
        <p className="text-end pt-4 text-gray-600 text-sm">
          {sent_at && convertToIST(sent_at)}
        </p>
      </div>
    </div>
  );
};

export default MessageDetails;
