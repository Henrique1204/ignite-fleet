import styled from "styled-components/native";

export const Container = styled.ImageBackground`
  padding: 52px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_800};

  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.XXXL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  text-algin: center;

  color: ${({ theme }) => theme.COLORS.BRAND_LIGHT};
`;

export const Slogan = styled.Text`
  margin-bottom: 32px;

  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  text-algin: center;

  color: ${({ theme }) => theme.COLORS.GRAY_100};
`;
