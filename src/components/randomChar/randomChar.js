import React, {Component} from 'react';
import styled from 'styled-components';
import GotService from '../../services';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

// ----------------- Style -----------------

const DivRandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;

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

export default class RandomChar extends Component {
    constructor(props) {
        super(props);
        this.updateChar()
    }

    gotService = new GotService();
    state = {
        char: {},
        loading: true,
        error: false
    }

    onCharLoaded = (char) => this.setState(({
        char,
        loading: false
    }));

    updateChar() {
        const id = Math.floor(Math.random() * 130 + 25);
        
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onError = (err) => {this.setState({
        loading: false,
        error: true
    });}

    render() {
        const {char, loading, error} = this.state;

        const content = error ? <ErrorMessage/> : loading ? <DivSpinner><Spinner/></DivSpinner> : <View char={char}/>
        
        return (
            <DivRandomBlock className="rounded">
                {content}
            </DivRandomBlock>
        );
    }
}

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
    )
}
