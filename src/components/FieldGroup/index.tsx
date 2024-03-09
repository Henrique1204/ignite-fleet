import React from "react";

import * as Styles from "./styles";

export type FieldGroupProps = {
  label: string;
};

type Props = Styles.ContainerProps & FieldGroupProps & {
  children: React.ReactNode;
};

const FieldGroup: React.FC<Props> = ({ label, children, ...props }) => {
  return (
    <Styles.Container {...props}>
      <Styles.Label>{label}</Styles.Label>

      {children}
    </Styles.Container>
  );
};

export default FieldGroup;
