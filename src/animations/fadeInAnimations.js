import styled, { keyframes } from "styled-components";
import { fadeIn } from 'react-animations';

const fadeInAnimation = keyframes`${fadeIn}`;

export const OneSecondsFadeIn = styled.div`
    animation: 1s ${fadeInAnimation};
`
export const TwoSecondsFadeIn = styled.div`
    animation: 2s ${fadeInAnimation};
`
export const ThreeSecondsFadeIn = styled.div`
    animation: 3s ${fadeInAnimation};
`
export const FourSecondsFadeIn = styled.div`
    animation: 4s ${fadeInAnimation};
`
export const FiveSecondsFadeIn = styled.div`
    animation: 5s ${fadeInAnimation};
`
export const SixSecondsFadeIn = styled.div`
    animation: 6s ${fadeInAnimation};
`