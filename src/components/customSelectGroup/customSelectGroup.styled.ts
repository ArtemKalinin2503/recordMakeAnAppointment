import styled from 'styled-components';

export const StyledWrapper = styled.div``;

export const StyledWrapperSelect = styled.div`
    display: flex;
    width: 100%;
    margin-left: 0;
    .MuiFormControl-root {
        min-width: 350px;
        margin-left: 0;
        margin-top: 0;
        width: 100%;
    }
    
    .invalid {
        .MuiOutlinedInput-notchedOutline {
            border: 2px solid red;
        }
    }
`;

export const StyeldWrapperItem = styled.div`
    display: flex;
    width: 100%;
`;

export const StyledTabName = styled.span`
    display: inline-block;
    padding: 5px 10px 5px 10px;
    margin-right: 5px;
    border-radius: 15px;
    background: #.;
    color: #7314d9;
`;

export const StyledWrapperCheckbox = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
`;

export const StyledSearchMessage = styled.div`
    display: flex;
    padding: 10px;
`;
