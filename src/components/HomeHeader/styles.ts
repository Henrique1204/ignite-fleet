import styled from "styled-components/native";

import { Image } from "expo-image";

export const Container = styled.View`
  width: 100%;
  padding: 32px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};

  flex-direction: row;
  align-items: center;
`;

export const Greeting = styled.View`
  maring-left: 12px;

  flex: 1;
`;

export const Message = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};

  color: ${({ theme }) => theme.COLORS.GRAY_100};
`;

export const Name = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};

  color: ${({ theme }) => theme.COLORS.GRAY_100};
`;

export const Picture = styled(Image)`
  width: 54px;
  height: 54px;
  border-radius: 7px;
`;
