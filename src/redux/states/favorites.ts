import { LocalStorageTypes, Hotel } from '@/models';
import { getLocalStorage, setLocalStorage } from '@/utilities';
import { createSlice, current } from '@reduxjs/toolkit'

const initialState: Hotel[] =[];

export const favoritesSlice = createSlice({
    name: `favorites`,
    initialState: getLocalStorage(LocalStorageTypes.FAVORITES) ? JSON.parse(getLocalStorage(LocalStorageTypes.FAVORITES) as string): initialState,
    reducers:{
        addFavorite: (state, action)=>{
            setLocalStorage(LocalStorageTypes.FAVORITES, state);
            return action.payload;
        },
        removeFavorite: (state, action)=>{
            const filteredState = current(state).filter((p: Hotel) => p.id !== action.payload.id);
            setLocalStorage(LocalStorageTypes.FAVORITES, filteredState);
            return filteredState;
        }
    }
})
export const {
    addFavorite,removeFavorite
}= favoritesSlice.actions;