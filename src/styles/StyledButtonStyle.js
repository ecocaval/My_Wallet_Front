import styled from "styled-components"

export const StyledButton = styled.button`
    background: #A328D6;
    border-radius: 5px;
    border: none;
    width: 326px;
    height: 46px;
    margin: auto;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;

    > p {
        font-family: 'Raleway';
        font-weight: 700;
        font-size: 20px;
        color: #FFFFFF;
    }

    &:hover {
        cursor: pointer;
        background: #7E0A8F;
    }
`