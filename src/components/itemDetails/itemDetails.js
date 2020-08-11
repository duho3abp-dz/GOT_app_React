import React, {Component} from 'react';
import styled from 'styled-components';

import GotService from '../../services';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

// ----------------- Style -----------------

const DivCarDetails = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;

    h4 {
        margin-bottom: 20px;
        text-align: center;
    }

    .select-error {
    color: #000000;
    text-align: center;
    font-size: 26px;
}
`

// ----------------- App -----------------

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}
export {Field};

export default class ItemDetails extends Component {
    gotService = new GotService();
    state = {
        item: null,
        loading: false,
        error: false
    }

    componentDidMount() { this.updateItem(); }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.updateItem();
        }
    }

    updateItem = () => {
        const {id, getDataElem} = this.props;
        if (!id) {return;}

        this.setState({loading: true})
        
        getDataElem(id)
            .then(item => this.setState({
                item,
                loading: false
            }))
            .catch(err => this.setState({
                item: null,
                error: false
            }));
    }

    renderListItem = (name, item) => (<>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
            {React.Children.map(this.props.children, child => React.cloneElement(child, {item}))}
        </ul>
    </>);

    render() {
        const {item, error, loading} = this.state;

        const noAddItem = <span className="select-error">Please, select a character</span>;
        const content = error ? <ErrorMessage/> : 
                        loading ? <Spinner/> : 
                        item ? this.renderListItem(item.name, item) : noAddItem;

        return (
            <DivCarDetails className="rounded">
                {content}
            </DivCarDetails>
        );
    }
}