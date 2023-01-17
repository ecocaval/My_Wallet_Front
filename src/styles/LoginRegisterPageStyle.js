import styled from "styled-components";

export const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const StyledMain = styled.main`
    display: flex;
    flex-direction: column;

    > form {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
    }
`