import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import styled from 'styled-components';


import GotService from '../../services';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';

import CharacterPage from '../pages/characterPage';
import HousesPage from '../pages/housesPage';
import BooksPage from '../pages/booksPage';

// ----------------- Style -----------------

const DivError = styled.div`
    width: 50%;
    position: absolute;
    top: 50%;
    left:50%;
    transform: translateX(-50%) translateY(-50%);
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
`

// ----------------- App -----------------

export default class App extends Component {
    gotService = new GotService();
    state = {
        view: true,
        error: false
    }

    componentDidCatch() {this.setState({error: true});}

    onToggleView = () => this.setState(({view}) => ({view: !view}));

    render() {
        const {view, error} = this.state;

        if (error) {
            return (
                <DivError>
                    <ErrorMessage/>
                </DivError>
            )
        }

        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {view ? <RandomChar view={view}/> : null}
                            <Button
                                color="secondary"
                                onClick={this.onToggleView}
                                >toggle Char
                            </Button>
                        </Col>
                    </Row>

                    <CharacterPage />
                    <HousesPage />
                    <BooksPage />

                </Container>
            </>
        );
    }
};