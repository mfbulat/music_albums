import {AlbumsType} from '../state/albums-reducer'
import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://jsonplaceholder.typicode.com/',
    withCredentials: true,
})

// api
export const albumsAPI = {
    getAlbums() {
        return instance.get<AlbumsType[]>('photos');
    }
}



