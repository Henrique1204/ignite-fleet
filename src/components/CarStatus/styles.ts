import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  width: 100%;
  margin: 32px 0;
  padding: 22px;
  border-radius: 6px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};

  flex-direction: row;
  align-items: center;
`;

export const IconBox = styled.View`
  width: 77px;
  height: 77px;
  margin-right: 12px;
  border-radius: 6px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_600};

  justify-content: center;
  align-items: center;
`;

export const Message = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  text-align: justify;
  textAlignVertical: center;

  color: ${({ theme }) => theme.COLORS.GRAY_600};

  flex: 1;
`;

export const TextHighlight = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};

  color: ${({ theme }) => theme.COLORS.BRAND_LIGHT};
`;
