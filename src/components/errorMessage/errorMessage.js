import React from 'react';
import styled from 'styled-components';
import img from './errorPic.jpg'

// ----------------- Style -----------------

const DivError = styled.div`
    height: 100%;
    width: 100%;
    text-align: center;
    font-size: 20px;

    img {
        width: 100%;    
    }
`

// ----------------- App -----------------

const ErrorMessage = () => {
    return (
        <DivError>
            <img src={img} alt="error"></img>
            Something went wrong...
        </DivError>
    )
}

export default ErrorMessage;