import styled, { css } from "styled-components/native";

export enum SIZE_ENUM {
  SMALL = "SMALL",
  NORMAL = "NORMAL",
}

export type ContainerProps = {
  size: SIZE_ENUM;
};

const varientSizeStyles = (size: SIZE_ENUM) => {
  return {
    [SIZE_ENUM.SMALL]: css`
      width: 32px;
      height: 32px;
    `,
    [SIZE_ENUM.NORMAL]: css`
      width: 46px;
      height: 46px;
    `,
  }[size];
};

export const Container = styled.View<ContainerProps>`
  border-radius: 6px;
  margin-right: 12px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};

  justify-content: center;
  align-items: center;

  ${({ size }) => varientSizeStyles(size)}
`;
