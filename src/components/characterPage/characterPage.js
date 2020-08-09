import React, {Component} from 'react';
import styled from 'styled-components';

import GotService from '../../services';
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails';
import RowBlock from '../rowBlock';
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
    gotService = new GotService();
    state = {
        charId: null,
        error: false
    }

    componentDidCatch() {this.setState({error: true});}

    onItemSelected = charId => this.setState({charId});

    render() {
        const {charId, error} = this.state;

        if (error) {
            return (
                <DivCharPageError>
                    <ErrorMessage/>
                </DivCharPageError>
            )
        }

        const itemList = (
            <ItemList 
                getData={this.gotService.getAllCharacters}
                onItemSelected={this.onItemSelected}
                renderItem={({name, gender}) => `${name}(${gender})`}
            />
        );

        const charDetails = (
            <CharDetails charId={charId}>
                <Field field='gender' label="Gender" />
                <Field field='born' label="Born" />
                <Field field='died' label="Died" />
                <Field field='culture' label="Culture" />
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