import React, {Component} from 'react';
import styled from 'styled-components';

import GotService from '../../services';

import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

// ----------------- Style -----------------

const UlItemList = styled.ul`
    margin-top: 20px;

    li {
        cursor: pointer;
    }
`

// ----------------- App -----------------

export default class ItemList extends Component {
    gotService = new GotService();
    state = {
        charList: null,
        error: false
    };

    componentDidMount() {
        // const num = Math.floor(Math.random() * 8 + 2);
        this.gotService.getAllCharacters(5)
            .then(charList => this.setState({charList}))
            .catch(err => this.setState({
                charList : null,
                error: true
            }));
    }

    renderItem = (arr) => {
        return arr.map((info, i) => {
            return (
                <li 
                    key={i} 
                    className="list-group-item"
                    onClick={() => this.props.onCharSelected(41 + i)}
                    >
                    {info.name}
                </li>
            );
        })
    }

    render() {
        const {charList, error} = this.state;

        const content = error ? <ErrorMessage/> : !charList ? <Spinner/> : this.renderItem(charList) ;

        return (
            <UlItemList className="list-group">
                {content}
            </UlItemList>
        );
    }
}