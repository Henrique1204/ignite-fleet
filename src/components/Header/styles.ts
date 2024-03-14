import styled from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    padding: 0 32px 24px;

    background-color: ${({ theme }) => theme.COLORS.GRAY_700};

    flex-direction: row;
    justify-content: space-between;
`;

export const Title = styled.Text`
    font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};

    color: ${({ theme }) => theme.COLORS.GRAY_100};
`;
