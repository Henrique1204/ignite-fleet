import styled from 'styled-components/native';

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
