import {Dispatch} from 'redux'
import {albumsAPI} from '../api/albums-api'

const initialState: AlbumsType[] = []

export type AlbumsType = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string,
}

export const albumsReducer = (state: AlbumsType[] = initialState, action: ActionsType): AlbumsType[] => {
    switch (action.type) {
        case 'REMOVE-ITEM':
            return state.filter(item => item.id !== action.id)
        case 'SET-ITEMS':
            return action.items
        default:
            return state
    }
}

// actions
export const removeItemAC = (id: number) =>
    ({type: 'REMOVE-ITEM', id} as const)

export const setItemsAC = (items: AlbumsType[]) =>
    ({type: 'SET-ITEMS', items: items} as const)

// thunks
export const setItemsTC = () => (dispatch: Dispatch<ActionsType>) => {
    albumsAPI.getAlbums()
        .then(res => {
            dispatch(setItemsAC(res.data))
        })
        .catch((error) => {
            console.log(error)
        })
}

// types
export type RemoveAlbumActionType = ReturnType<typeof removeItemAC>
export type AddAlbumsActionType = ReturnType<typeof setItemsAC>

type ActionsType = RemoveAlbumActionType | AddAlbumsActionType
