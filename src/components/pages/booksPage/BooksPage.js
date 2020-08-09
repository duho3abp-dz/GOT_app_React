import React, {Component} from 'react';
import styled from 'styled-components';

import GotService from '../../../services';
import ItemList from '../../itemList';
import CharDetails, {Field} from '../../charDetails';
import RowBlock from '../../rowBlock';
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

export default class BooksPage extends Component {
    gotService = new GotService();
    state = {
        id: null,
        error: false
    }

    componentDidCatch() {this.setState({error: true});}

    onItemSelected = id => this.setState({id});

    render() {
        const {id, error} = this.state;

        if (error) {
            return (
                <DivCharPageError>
                    <ErrorMessage/>
                </DivCharPageError>
            )
        }

        const itemList = (
            <ItemList 
                getData={this.gotService.getAllBooks}
                onItemSelected={this.onItemSelected}
                minPage={1}
                maxPage={2}
                renderItem={({name}) => name}
            />
        );

        const charDetails = (
            <CharDetails 
                id={id}
                getDataElem={this.gotService.getBooks}
            >
                <Field field='numberOfPages' label="numberOfPages" />
                <Field field='publisher' label="publisher" />
                <Field field='released' label="released" />
            </CharDetails>
        );

        return (
            <RowBlock 
                left={itemList} 
                right={charDetails}
            />
        );
    }
}