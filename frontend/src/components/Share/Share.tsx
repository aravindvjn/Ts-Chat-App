import { ShareOutlined } from "@mui/icons-material";
import React from "react";

type ShareProps = {
  title: string;
  text: string;
  url: string;
  className?: string;
  variant?: "small" | "medium" | "large";
  children?: React.ReactNode;
};

const Share: React.FC<ShareProps> = ({
  title,
  text,
  url,
  className,
  variant,
  children,
}) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        console.log("Content shared successfully");
      } catch (error) {
        console.error("Error sharing content:", error);
      }
    } else {
      alert("Sharing not supported on this device");
    }
  };

  return (
    <div className={className}  onClick={handleShare}>
      <ShareOutlined fontSize={variant}/>
      {children}
    </div>
  );
};

export default Share;
