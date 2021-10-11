import React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import style from './AppModal.module.css'

type AppModalPropsType = {
    open: boolean,
    imgUrl: string | null,
    handleClose: (value: number) => void,
}

const AppModal = (props: AppModalPropsType) => {
    const {open, handleClose, imgUrl} = props

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className={style.modalImg}>
                <img src={imgUrl ? imgUrl : '#'} alt='Big for song'/>
            </Box>
        </Modal>
    )
};

export default AppModal;