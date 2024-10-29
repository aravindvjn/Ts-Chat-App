import classNames from "classnames";
import React from "react";
import defaultProfile from "../../assets/defaultFemaleProfile.png";
export type AvatarProps = {
  src?: string | null ;
  alt?: string;
  className?: React.ReactNode;
};

const Avatar = ({ src = "", alt, className }: AvatarProps) => {
  const avatarClasses = classNames("w-[112px] h-[94px] rounded object-cover", {}, className);
  return <img src={src || defaultProfile} alt={alt} className={avatarClasses} />;
};

export default Avatar;
