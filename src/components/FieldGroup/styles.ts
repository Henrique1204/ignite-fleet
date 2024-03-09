import styled from "styled-components/native";

export type ContainerProps = {
  height?: string;
};

export const Container = styled.View<ContainerProps>`
  width: 100%;
  ${({ height }) => (height ? `height: ${height};` : "")};

  padding: 16px;
  border-radius: 6px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const Label = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};

  color: ${({ theme }) => theme.COLORS.GRAY_300};
`;
