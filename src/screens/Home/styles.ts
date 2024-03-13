import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const Content = styled.View`
  padding: 0 32px;

  flex: 1;
`;

export const Title = styled.Text`
  margin-bottom: 12px;

  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};

  color: ${({ theme }) => theme.COLORS.GRAY_400};
`;

export const EmptyMessage = styled.Text`
  margin-top: 32px;

  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  text-align: center;

  color: ${({ theme }) => theme.COLORS.GRAY_400};
`;
