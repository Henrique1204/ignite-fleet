import React from "react";

type ShowProps = {
  children: React.ReactNode;
  isShowing: boolean;
};

const Show: React.FC<ShowProps> = ({ children, isShowing }) => {
  if (!isShowing) return <></>;

  return <>{children}</>;
};

export default Show;
