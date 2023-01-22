import styled, { keyframes } from 'styled-components';
import { fadeIn} from 'react-animations';

const fadeInAnimation = keyframes`${fadeIn}`;

export default function Logo() {

    return (
        <>
            <StyledH1>MyWallet</StyledH1>
        </>
    )
}

const StyledH1 = styled.h1`
    animation: 1s ${fadeInAnimation};
    font-family: 'Saira Stencil One';
    font-size: 32px;
    margin: auto;
    margin-bottom: 30px;
    color: #FFFFFF;
`