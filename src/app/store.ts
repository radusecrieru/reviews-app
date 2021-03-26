import {configureStore, ThunkAction, Action, createStore} from '@reduxjs/toolkit';
import {loadState, saveState} from "./localStorage";
import reviewsReducer from "../services/reviews";


const persistedState = loadState();
const store = configureStore({
    reducer: {
        reviews: reviewsReducer,
    },
    preloadedState: persistedState
});

store.subscribe(() => {
    saveState({
        reviews: store.getState().reviews
    });
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
export default store;