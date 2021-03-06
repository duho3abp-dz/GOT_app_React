import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import GotService from '../../services';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

// ----------------- Style -----------------

const DivRandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-top: 10px;
    margin-bottom: 10px;

    h4 {
        margin-bottom: 20px;
        text-align: center;
    }

    .term {
        font-weight: bold;
    }
`

const DivSpinner = styled.div`
    height: 100%;
    width: 100%;
    text-align: center;
`

// ----------------- App -----------------

// * Logic *
function RandomChar({interval}) {
    const gotService = new GotService();
    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, interval);
        
        return () => {clearInterval(timerId);};
    }, []);

    const onCharLoaded = char => {
        setChar(char);
        setLoading(false);
    };

    const updateChar = () => {
        const id = Math.floor(Math.random() * 130 + 25);
        
        gotService.getCharacter(id)
            .then(onCharLoaded)
            .catch(onError);
    };

    const onError = (err) => {
        setLoading(false);
        setError(true);
    };

    const content = error ? <ErrorMessage/> : 
                    loading ? <DivSpinner><Spinner/></DivSpinner> : <View char={char}/> ;

    return (
        <DivRandomBlock className="rounded">
            {content}
        </DivRandomBlock>
    );
}

// * Render *
const View = ({char}) => {
    const {name, gender, born, died, culture} = char;

    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    );
};

RandomChar.defaultProps = {
    interval: 5000
}

RandomChar.propTypes = {
    interval: PropTypes.number
}

export default RandomChar;