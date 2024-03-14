import React from "react";

import * as Styles from "./styles";

interface ILoaderProps {
  children: React.ReactNode;
  loading: boolean;
}

export const Loading: React.FC = () => <Styles.Loading />;

const Loader: React.FC<ILoaderProps> = ({ children, loading, ...props }) => {
  if (!loading) return <>{children}</>;

  return (
    <Styles.Container {...props}>
      <Loading />
    </Styles.Container>
  );
};

export default Loader;
