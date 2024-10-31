import classNames from "classnames";
import React from "react";
import defaultProfile from "../../assets/defaultFemaleProfile.png";
export type AvatarProps = {
  src?: string | null;
  alt?: string;
  className?: React.ReactNode;
  variant?: "double" | "small" | "normal";
};

const Avatar = ({ src = "", alt, className, variant="normal" }: AvatarProps) => {
  const avatarClasses = classNames(
    " rounded object-cover",
    {
      "w-[112px] h-[94px]" : variant === "normal",
      "w-[224px] h-[188px]": variant === "double",
      "w-[90px] h-[70px]": variant === "small",
    },
    className
  );
  return (
    <img src={src || defaultProfile} alt={alt} className={avatarClasses} />
  );
};

export default Avatar;
