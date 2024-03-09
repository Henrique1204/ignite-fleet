import styled from "styled-components/native";

export const Input = styled.TextInput`
  margin-top: 16px;

  font-size: ${({ theme }) => theme.FONT_SIZE.XXXL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  text-align: center;

  color: ${({ theme }) => theme.COLORS.GRAY_300};
`;
