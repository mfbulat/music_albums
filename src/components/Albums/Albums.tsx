import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setItemsTC, AlbumsType} from '../../state/albums-reducer'
import {AppRootStateType} from '../../state/store'
import styles from './Albums.module.css'
import ItemsTable from './ItemsTable/ItemsTable'
import AppPagination from './AppPagination/AppPagination'
import AppModal from './AppModal/AppModal'
import {SelectChangeEvent} from '@mui/material/Select'
import AppSelect from './AppSelect/AppSelect'

const Albums = () => {
    const items = useSelector<AppRootStateType, AlbumsType[]>(state => state.albums)
    const dispatch = useDispatch()
    const [open, setOpen] = useState<boolean>(false)
    const [openedItem, setOpenedItem] = useState<AlbumsType | null>(null)

    const [albumId, setAlbumId] = useState('')
    const [filteredItems, setFilteredItems] = useState<AlbumsType[]>([])

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [itemsPerPage] = useState<number>(20)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)

    useEffect(() => {
        dispatch(setItemsTC())
    }, [dispatch])

    useEffect(() => {
        if (albumId === '') {
            setFilteredItems(items)
        } else {
            setFilteredItems(filterItemsByAlbumsID(items, albumId))
        }
    }, [items, albumId])

    const handleOpen = (item: AlbumsType) => {
        setOpenedItem(item)
        setOpen(true)
    }
    const handleClose = () => setOpen(false);

    const filterItemsByAlbumsID = (items: AlbumsType[], albumId: number | string) => {
        return items.filter(i => i.albumId === Number(albumId))
    }

    const handleChange = (event: SelectChangeEvent) => {
        setAlbumId(event.target.value)
        setFilteredItems(filterItemsByAlbumsID(items, event.target.value))
        setCurrentPage(1)
    };

    const getAlbumsId = (items: AlbumsType[]) => {
        const resArr = []
        for (let i = 0; i < items.length; i++) {
            if (i === items.length - 1) {
                resArr.push(items[i].albumId)
            }
            if (i < items.length - 1 && items[i].albumId !== items[i + 1].albumId) {
                resArr.push(items[i].albumId)
            }
        }
        return resArr
    }

    // const getAlbumsId = (items: AlbumsType[]) => {
    //     let resArr: number[] = [];
    //     items.forEach((item) => {
    //         let i = resArr.findIndex(x => (x === item.albumId));
    //         if (i <= -1) {
    //             resArr.push(item.albumId);
    //         }
    //     })
    //     return resArr
    // }

    return (
        <div className={styles.albumsContainer}>
            <AppSelect items={getAlbumsId(items)} albumId={albumId} handleChange={handleChange}/>
            <ItemsTable items={currentItems} handleOpen={handleOpen}/>
            <AppPagination itemsLength={filteredItems.length}
                           itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage}/>
            <AppModal open={open} imgUrl={openedItem && openedItem.url} handleClose={handleClose}/>
        </div>
    );
}

export default Albums;