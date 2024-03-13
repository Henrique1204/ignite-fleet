import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  width: 56px;
  height: 56px;
  border-radius: 6px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_600};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};

  color: ${({ theme }) => theme.COLORS.WHITE};
`;
export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
    color: theme.COLORS.WHITE,
  }))``;

