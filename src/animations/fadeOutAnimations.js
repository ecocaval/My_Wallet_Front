import styled, { keyframes } from "styled-components";
import { fadeOutRight } from 'react-animations';

const fadeOutRightAnimation = keyframes`${fadeOutRight}`;

//* FADE OUT
export const TwoSecondsFadeOutAnimation = styled.div`
    animation: 2s ${fadeOutRightAnimation}
`
