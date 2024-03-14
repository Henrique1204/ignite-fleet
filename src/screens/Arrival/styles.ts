import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};

  flex: 1;
`;

export const Content = styled.View`
  padding: 32px;

  flex-grow: 1;
`;

export const Label = styled.Text`
  margin-top: 32px;
  margin-bottom: 32px;

  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};

  color: ${({ theme }) => theme.COLORS.GRAY_300};
`;

export const LicensePlate = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.XXXL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};

  color: ${({ theme }) => theme.COLORS.GRAY_100};
`;

export const Description = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  text-align: justify;

  color: ${({ theme }) => theme.COLORS.GRAY_100};
`;

export const SyncMessage = styled.Text`
  margin: 32px;

  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  text-align: center;

  color: ${({ theme }) => theme.COLORS.GRAY_300};

  flex: 1;
`;


export const Footer = styled.View`
  width: 100%;
  padding: 32px;
  margin-top: 32px;

  flex-direction: row;
  gap: 16px;
`;
