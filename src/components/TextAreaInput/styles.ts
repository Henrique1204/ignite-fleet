import styled from "styled-components/native";

export const TextAreaInput = styled.TextInput`
  margin-top: 16px;

  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  vertical-align: top;

  color: ${({ theme }) => theme.COLORS.GRAY_200};
`;
