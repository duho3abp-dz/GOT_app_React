import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';

import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';

// ----------------- App -----------------

export default class App extends Component {

    state = {
        view: true
    }

    onToggleView = () => {
        this.setState(({view}) => ({view: !view}))
    }

    render() {
        const {view} = this.state;

        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {view ? <RandomChar/> : null}
                            <Button
                                color="secondary"
                                onClick={this.onToggleView}
                                >toggle Char
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};