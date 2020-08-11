import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

// ----------------- Style -----------------

const UlItemList = styled.ul`
    margin-top: 20px;

    li {
        cursor: pointer;
    }
`

// ----------------- App -----------------

// * Logic *
const withData = (View) => {
    return class extends Component {
        state = {
            data: null,
            error: false
        };
    
        static defaultProps = {
            onItemSelected: () => {}
        }
        static propTypes = {
            onItemSelected: PropTypes.func
        }
    
        componentDidMount() {
            const {getData, maxPage, minPage} = this.props;
            const page = Math.floor(Math.random() * maxPage + minPage);
    
            getData(page)
                .then(data => this.setState({data}))
                .catch(err => this.setState({
                    data : null,
                    error: true
                }));
        }
        
        render() {
            const {data, error} = this.state;
            return <View {...this.props} data={data} error={error} />
        }
    };
};

// * Render *
class ItemList extends Component {

    renderItem = (arr) => {
        return arr.map(info => {
            const {id} = info
            const label = this.props.renderItem(info);
            return (
                <li 
                    key={id} 
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}
                    >{label}
                </li>
            );
        })
    }

    render() {
        const {data, error} = this.props

        const content = error ? <ErrorMessage/> : 
                        !data ? <Spinner/> : this.renderItem(data) ;

        return (
            <UlItemList className="list-group">
                {content}
            </UlItemList>
        );
    }
}

export default withData(ItemList);