import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import styled from 'styled-components';

import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage';

// ----------------- Style -----------------

const DivCharPageError = styled.div`
    width: 50%;
    margin: 20px auto;
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
`

// ----------------- App -----------------

export default class CharacterPage extends Component {
    state = {
        charId: null,
        error: false
    }

    componentDidCatch() {this.setState({error: true});}

    onCharSelected = charId => this.setState({charId});

    render() {
        const {charId, error} = this.state;

        if (error) {
            return (
                <DivCharPageError>
                    <ErrorMessage/>
                </DivCharPageError>
            )
        }

        return (
            <Row>
                <Col md='6'>
                    <ItemList onCharSelected={this.onCharSelected}/>
                </Col>
                <Col md='6'>
                    <CharDetails charId={charId}/>
                </Col>
            </Row>
        );
    }
}