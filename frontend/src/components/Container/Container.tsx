import React from "react";

type ContainerProps = {
  children?: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="py-16 h-dvh overflow-y-scroll">{children}</div>;
};

export default Container;
