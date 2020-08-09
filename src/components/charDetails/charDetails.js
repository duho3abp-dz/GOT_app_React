import React, {Component} from 'react';
import styled from 'styled-components';

import GotService from '../../services';
import Spinner from '../spinner';
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

const Field = ({char, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{char[field]}</span>
        </li>
    )
}
export {Field};

export default class CharDetails extends Component {
    gotService = new GotService();
    state = {
        char: null,
        loading: false,
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

        this.setState({loading: true})
        this.gotService.getCharacter(charId)
            .then(char => this.setState({
                char,
                loading: false
            }))
            .catch(err => this.setState({
                char: null,
                error: false
            }));
    }

    render() {
        const {char, error, loading} = this.state;

        if (!char) {
            return (
                <DivCarDetails className="rounded">
                    <span className="select-error">Please, select a character</span>
                </DivCarDetails>
            )
        }
        
        const listItem = (<>
                <h4>{char.name}</h4>
                <ul className="list-group list-group-flush">
                    {React.Children.map(this.props.children, (child) => React.cloneElement(child, {char}))}
                </ul>
        </>);

        const content = error ? <ErrorMessage/> : 
                        loading ? <Spinner/> : 
                        char ? listItem : null;

        return (
            <DivCarDetails className="rounded">
                {content}
            </DivCarDetails>
        );
    }
}