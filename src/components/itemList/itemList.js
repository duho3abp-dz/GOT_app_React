import React, {Component} from 'react';
import styled from 'styled-components';

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
    state = {
        itemList: null,
        error: false
    };

    componentDidMount() {
        const {getData} = this.props;
        // const num = Math.floor(Math.random() * 8 + 2);

        getData(1)
            .then(itemList => this.setState({itemList}))
            .catch(err => this.setState({
                itemList : null,
                error: true
            }));
    }

    renderItem = (arr) => {
        return arr.map((info, i) => {
            const {id} = info
            const label = this.props.renderItem(info);
            return (
                <li 
                    key={id} 
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}
                    >
                    {label}
                </li>
            );
        })
    }

    render() {
        const {itemList, error} = this.state;

        const content = error ? <ErrorMessage/> : 
                        !itemList ? <Spinner/> : this.renderItem(itemList) ;

        return (
            <UlItemList className="list-group">
                {content}
            </UlItemList>
        );
    }
}