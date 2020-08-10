import React, {Component} from 'react';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';

import GotService from '../../../services';
import ItemList from '../../itemList';
import ErrorMessage from '../../errorMessage';

// ----------------- Style -----------------

const DivCharPageError = styled.div`
    width: 50%;
    margin: 20px auto;
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
`

// ----------------- App -----------------

class BooksPage extends Component {
    gotService = new GotService();
    state = {
        error: false
    }

    componentDidCatch() {this.setState({error: true});}

    render() {
        const {error} = this.state;

        if (error) {
            return (
                <DivCharPageError>
                    <ErrorMessage/>
                </DivCharPageError>
            )
        }

        return (
            <ItemList 
                getData={this.gotService.getAllBooks}
                onItemSelected={id => {
                    this.props.history.push(`/books/${id}`)
                }}
                minPage={1}
                maxPage={1}
                renderItem={({name}) => name}
            />
        );
    }
}
export default withRouter(BooksPage);