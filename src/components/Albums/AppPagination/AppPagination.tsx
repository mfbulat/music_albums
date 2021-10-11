import React from 'react';
import {Pagination} from '@mui/material'
import style from './AppPagination.module.css'


type AppPaginationPropsType = {
    itemsLength: number,
    itemsPerPage: number,
    setCurrentPage: (value: number) => void,
}


const AppPagination = (props: AppPaginationPropsType) => {
    const {itemsLength, itemsPerPage, setCurrentPage} = props

    return (
            <Pagination
                className={style.albumsContainer}
                onChange={(e, value) => setCurrentPage(value)}
                count={Math.ceil(itemsLength / itemsPerPage)}
                variant='outlined'
                showFirstButton
                showLastButton
            />
    )
};

export default AppPagination;