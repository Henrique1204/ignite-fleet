import React from "react";

import * as Styles from "./styles";

interface ILoaderProps {
  children: React.ReactNode;
  loading: boolean;
}

const Loader: React.FC<ILoaderProps> = ({ children, loading, ...props }) => {
  if (!loading) return <>{children}</>;

  return (
    <Styles.Container {...props}>
      <Styles.Loading />
    </Styles.Container>
  );
};

export default Loader;
