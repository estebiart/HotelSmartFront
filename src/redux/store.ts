 import { Hotel} from "../models";
 import { configureStore } from '@reduxjs/toolkit'
import { favoritesSlice, hotelSlice } from "./states";

export interface AppStore {
    hotel:  Hotel[];
    favorites:  Hotel[];

}
export default configureStore <AppStore>({
    reducer: {
        hotel: hotelSlice.reducer,
        favorites: favoritesSlice.reducer
    }
});


