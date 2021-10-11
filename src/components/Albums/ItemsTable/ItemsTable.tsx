import React from 'react'
import styles from './ItemsTable.module.css'
import {AlbumsType, removeItemAC} from '../../../state/albums-reducer'
import {useDispatch} from 'react-redux'
import {Paper} from "@mui/material";


type ItemsTablePropsType = {
    items: Array<AlbumsType>
    handleOpen: (a: AlbumsType) => void
}

const ItemsTable = (props: ItemsTablePropsType) => {
    const dispatch = useDispatch()
    const {items, handleOpen} = props

    return (
        <div className={styles.itemsBlock}>
            {items.map((item, key) => {
                return (
                    <div className={styles.itemBlock} key={key}>
                        <Paper elevation={3}>
                            <div className={styles.itemImage} onClick={() => handleOpen(item)}>
                                <img src={item.thumbnailUrl} alt=""/>
                            </div>
                            <div className={styles.description}>
                                <span className={styles.itemId}>Album ID: {item.albumId}</span>
                                <span className={styles.itemDescription}>Item ID: {item.id}</span>
                                <button onClick={() => dispatch(removeItemAC(item.id))}>delete</button>
                            </div>
                        </Paper>

                    </div>
                )
            })}
        </div>
    )
}


export default ItemsTable;