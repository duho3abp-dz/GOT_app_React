import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import styled from 'styled-components';
import {BrowserRouter as Router, Route} from 'react-router-dom';


import GotService from '../../services';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';

import IndexPage from '../pages/indexPage';
import CharacterPage from '../pages/characterPage';
import HousesPage from '../pages/housesPage';
import BooksPage from '../pages/booksPage';
import BooksItem from '../pages/booksItem';
// import NotExistingPage from '../pages/notExistingPage';

import img from './got.jpeg';

// ----------------- Style -----------------

const DivBody = styled.div`
    padding-bottom: 40px;
    overflow-x: hidden;
    background: url(${img}) center center no-repeat;
    background-size: cover;
    font-size: 16px;
    height: 100vh;	
`

const DivBooks = styled.div`
    width: 50%;
    text-align: center;
    margin: 0 auto;
`

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
        const {view, error, idBook} = this.state;

        if (idBook) {return}

        if (error) {
            return (
                <DivError>
                    <ErrorMessage/>
                </DivError>
            )
        }

        return (
            <Router>
                <DivBody>
                    <Container>
                        <Header />
                    </Container>
                    <Container>

                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {view ? <RandomChar interval={5000} view={view}/> : null}
                                <Button
                                    color="secondary"
                                    onClick={this.onToggleView}
                                    >toggle Char
                                </Button>
                            </Col>
                        </Row>

                        <Route path="/" exact component={IndexPage} />
                        <Route path="/characters" component={CharacterPage} />
                        <Route path="/houses" component={HousesPage} />
                        <DivBooks><Route path="/books" exact component={BooksPage} /></DivBooks>
                        <Route path="/books/:id" render={({match}) => <BooksItem id={match.params.id}/>} />
                        

                    </Container>
                </DivBody>
            </Router>
        );
    }
};