import React from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, {SelectChangeEvent} from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import style from './AppSelect.module.css'

type AppSelectPropsType = {
    items: number[],
    albumId: string,
    handleChange: (event: SelectChangeEvent)=>void
}

const AppSelect = (props: AppSelectPropsType) => {
    const {items, albumId, handleChange} = props

    return (
        <Box className={style.selectBlock}>
            <FormControl fullWidth>
                <InputLabel>Album ID</InputLabel>
                <Select value={albumId} onChange={handleChange}>
                    {items.map((el, key) => {
                        return <MenuItem value={el} key={key}>{el}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </Box>
    )
};

export default AppSelect;