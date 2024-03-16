import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};

  flex: 1;
`;

export const Content = styled.View`
  padding: 32px;
  margin-top: 16px;

  flex: 1;
  gap: 16px;
`;

export const MessageContainer = styled.View`
  padding: 24px;

  justify-content: center;
  flex: 1;
`;

export const NoLocationMessage = styled.Text`
  margin: 24px;
  margin-bottom: 44px;

  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  textalign: center;

  color: ${({ theme }) => theme.COLORS.WHITE};
`;
