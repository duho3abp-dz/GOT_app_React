import React, {Component} from 'react';
import GotService from '../../../services';
import ItemDetails, {Field} from '../../itemDetails';

export default class BooksItem extends Component {
    gotService = new GotService();
    
    render() {
        const {id} = this.props;
        return (
            <ItemDetails 
                id={id}
                getDataElem={this.gotService.getBooks}
            >
                <Field field='numberOfPages' label="numberOfPages" />
                <Field field='publisher' label="publisher" />
                <Field field='released' label="released" />
            </ItemDetails>
        )
    }
}