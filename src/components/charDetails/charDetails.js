import React, {Component} from 'react';
import styled from 'styled-components';

import GotService from '../../services';
import ErrorMessage from '../errorMessage';

// ----------------- Style -----------------

const DivCarDetails = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-top: 20px;
    margin-bottom: 40px;
    text-align: center;

    h4 {
        margin-bottom: 20px;
        text-align: center;
    }

    .select-error {
    color: #000000;
    text-align: center;
    font-size: 26px;
}
`

// ----------------- App -----------------

// * Logic *
export default class CharDetails extends Component {
    gotService = new GotService();
    state = {
        char: null,
        error: false
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar() {
        const {charId} = this.props;
        if (!charId) {return;}

        this.gotService.getCharacter(charId)
            .then(char => this.setState({char}))
            .catch(err => this.setState({
                char: null,
                error: false
            }));
    }

    render() {
        const {char, error} = this.state;

        const noSelect = <span className="select-error">Please, select a character</span>
        const content = error ? <ErrorMessage/> : char ? <UlListCharacter info={char}/> : noSelect;

        return (
            <DivCarDetails className="rounded">
                {content}
            </DivCarDetails>
        );
    }
}

// * Render *
const UlListCharacter = ({info}) => {
    const {name, gender, born, died, culture} = info;
    return (
        <>
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender</span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born</span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died</span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture</span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    );
};