import styled, { keyframes } from "styled-components";
import { fadeIn } from 'react-animations';
import { fadeInLeft } from 'react-animations';
import { fadeInRight } from 'react-animations';

const fadeInAnimation = keyframes`${fadeIn}`;
const fadeInLeftAnimation = keyframes`${fadeInLeft}`;
const fadeInRightAnimation = keyframes`${fadeInRight}`;

//* FADE IN
export const OneSecondsFadeIn = styled.div`
    animation: 1s ${fadeInAnimation};
`
export const TwoSecondsFadeIn = styled.div`
    animation: 2s ${fadeInAnimation};
`
export const ThreeSecondsFadeIn = styled.div`
    animation: 3s ${fadeInAnimation};
`
//* FADE IN LEFT
export const OneSecondsFadeInLeft = styled.div`
    animation: 1s ${fadeInLeftAnimation};
`
//* FADE IN RIGHT
export const OneSecondsFadeInRight = styled.div`
    animation: 1s ${fadeInRightAnimation};
`
