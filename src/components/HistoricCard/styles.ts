import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  width: 100%;
  padding: 20px 16px;
  border-radius: 6px;
  margin-bottom: 12px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  z-index: 1;
`;

export const Info = styled.View`
  flex: 1;
`;

export const LicensePlate = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};

  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const Departure = styled.Text`
  margin-top: 4px;

  font-size: ${({ theme }) => theme.FONT_SIZE.XS}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};

  color: ${({ theme }) => theme.COLORS.GRAY_200};
`;
