import styled from "styled-components"

export const StyledHeader = styled.header`
    width: 100%;
    display: flex;  
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;

    > img {
        width: 23px;
        height: 24px;
     
        &:hover {
        cursor: pointer;
    }
    }
`