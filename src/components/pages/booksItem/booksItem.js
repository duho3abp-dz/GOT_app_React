import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import GotService from '../../../services';
import ItemDetails, {Field} from '../../itemDetails';

// ----------------- Style -----------------

const DivWrap = styled.div`
    width: 70%;
    margin: 0 auto;
`

const DivBtnWrap = styled.div`
    text-align: center;
`

const SpanBtn = styled.span`
    background: #fff;
    margin: 0 auto;
    padding: 5px 20px;
    border-radius: 0.25rem;
`

// ----------------- App -----------------

export default class BooksItem extends Component {
    gotService = new GotService();

    render() {
        const {id} = this.props;
        return (
            <DivWrap>
                <ItemDetails 
                    id={id}
                    getDataElem={this.gotService.getBooks}
                >
                    <Field field='numberOfPages' label="numberOfPages" />
                    <Field field='publisher' label="publisher" />
                    <Field field='released' label="released" />
                </ItemDetails>
                <DivBtnWrap>
                    <Link to="/books"><SpanBtn>Back</SpanBtn></Link>
                </DivBtnWrap>
            </DivWrap>
        )
    }
}