import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Review} from "./top3";
import {useAppSelector} from "../app/hooks";
import {RootState} from "../app/store";

// Define a type for the slice state
interface ReviewsState {
    reviewsByTimestamp: Map<number, Review[]>
}

// Define the initial state using that type
const initialState: ReviewsState = {
    reviewsByTimestamp: new Map<number, Review[]>()
}
export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        addCurrentTop3: (state, action: PayloadAction<[number, Review[]]>) => {
            state.reviewsByTimestamp = state.reviewsByTimestamp.set(action.payload[0], action.payload[1]);
        }
    }
})

export const {addCurrentTop3} = reviewsSlice.actions;
export const selectReviews = (state: RootState, timestamp: number) => state.reviews.reviewsByTimestamp.get(timestamp);
export const selectMostRecentReviews = (state: RootState) => Array.from(state.reviews.reviewsByTimestamp.values()).pop();
export default reviewsSlice.reducer;