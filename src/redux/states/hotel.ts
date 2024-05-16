import { LocalStorageTypes, Hotel } from '../../models';
import { getLocalStorage, setLocalStorage } from '../../utilities';
import { createSlice} from '@reduxjs/toolkit'

const initialState: Hotel[] =[];
 
export const hotelSlice = createSlice({
    name: `hotel`,
    initialState: getLocalStorage(LocalStorageTypes.HOTEL) ? JSON.parse(getLocalStorage(LocalStorageTypes.HOTEL) as string): initialState,
    reducers:{
        addHotel: ( state,action) =>{
            setLocalStorage(LocalStorageTypes.HOTEL, state);
            return action.payload;
        }
    }
})
export const {
    addHotel
}= hotelSlice.actions;