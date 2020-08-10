import React, {Component} from 'react';
import styled from 'styled-components';

import GotService from '../../../services';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
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

export default class HousesPage extends Component {
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
                getData={this.gotService.getAllHouses}
                onItemSelected={this.onItemSelected}
                minPage={1}
                maxPage={45}
                renderItem={({name}) => name}
            />
        );

        const houseDetails = (
            <ItemDetails 
                id={id}
                getDataElem={this.gotService.getHouse}
            >
                <Field field='region' label="Region" />
                <Field field='words' label="Words" />
                <Field field='titles' label="Titles" />
                <Field field='overlord' label="Overlord" />
                <Field field='ancestralWeapons' label="AncestralWeapons" />
            </ItemDetails>
        );

        return (
            <RowBlock 
                left={itemList} 
                right={houseDetails}
            />
        );
    }
}