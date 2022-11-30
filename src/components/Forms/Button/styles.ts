import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.Button`
    width: 100px;
    background-color: ${({ theme}) => theme.colors.secondary};
    border-radius: 5px;
    align-items: center;
`;

export const Title = styled.Button`
    font-size: ${RFValue(14)}px;
    color: ${({ theme}) => theme.colors.shape};
    padding: 18px;
`;
