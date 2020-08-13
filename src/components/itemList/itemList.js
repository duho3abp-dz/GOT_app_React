import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

// ----------------- Style -----------------

const UlItemList = styled.ul`
    margin-top: 20px;
    min-height: 491px;
    background: #fff;

    li {
        cursor: pointer;
    }
`

const DivBtnWrap = styled.div`
    text-align: center;

    
`

const Btn = styled.button`
    width: 100px;
    height: 30px;
    margin: 10px 10px;
    background: #fff;
    border-radius: 0.25rem;
`

const SpanNumPage = styled.span`
    color: #fff;
`

// ----------------- App -----------------

function ItemList({getData, onItemSelected, renderItem, maxPage, minPage})  {
    const [data, setData] = useState(null);
    const [error, setErr] = useState(false);
    const [page, setPage] = useState(minPage);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData(page)
            .then(data => {
                setLoading(false);
                setData(data);
            })
            .catch(err => {
                setLoading(false);
                setData(null);
                setErr(true);
            });
    }, []);

    const changePage = (page, side) => {
        setLoading(true);
        let nextPage;
        if (side === 'next') {
            page < maxPage ? nextPage = page + 1 : nextPage = minPage;
        } else {
            page > minPage ? nextPage = page - 1 : nextPage = maxPage;
        }
        
        getData(nextPage)
            .then(data => {
                setPage(nextPage);
                setLoading(false);
                setData(data);
            })
            .catch(err => {
                setLoading(false);
                setData(null);
                setErr(true);
            });
    };
    
    const renderItems = (arr) => {
        return arr.map(info => {
            const {id} = info
            const label = renderItem(info);
            return (
                <li 
                    key={id} 
                    className="list-group-item"
                    onClick={() => onItemSelected(id)}
                    >{label}
                </li>
            );
        })
    };

    const content = loading ? <Spinner/> : error ? <ErrorMessage/> : 
                    !data ? <Spinner/> : renderItems(data) ;

    return (<>
        <UlItemList className="list-group">
            {content}
        </UlItemList>
        <DivBtnWrap>
            <Btn onClick={() => changePage(page, 'prev')}>Prev</Btn>
            <SpanNumPage>{page}/{maxPage}</SpanNumPage>
            <Btn onClick={() => changePage(page, 'next')}>Next</Btn>
        </DivBtnWrap>
    </>);
};

ItemList.defaultProps = {
    onItemSelected: () => {}
}
ItemList.propTypes = {
    onItemSelected: PropTypes.func
}

export default ItemList;