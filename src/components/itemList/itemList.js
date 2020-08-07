import React, {Component} from 'react';
import styled from 'styled-components';

// ----------------- Style -----------------

const UlItemList = styled.ul`
    margin-top: 20px;
    
    li {
        cursor: pointer;
    }
`

// ----------------- App -----------------

export default class ItemList extends Component {
    render() {
        return (
            <UlItemList className="list-group">
                <li className="list-group-item">
                    John Snow
                </li>
                <li className="list-group-item">
                    Brandon Stark
                </li>
                <li className="list-group-item">
                    Geremy
                </li>
            </UlItemList>
        );
    }
}