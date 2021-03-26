import * as server from '../server';
import moment from "moment";
import {reviewsSlice, selectReviews} from "./reviews";
import { useAppSelector, useAppDispatch } from '../app/hooks';

export type Review = {
    userId: number;
    id: number;
    title: string;
    body: string;
    timestamp: number;
}

export const get30SecNormalizedDate = () => {
  if (moment().seconds() > 30) {
      return +moment().startOf('minute').seconds(30);
  }
  return +moment().startOf('minute');
};

export const getTop3 = (existingTop3: Review[]): Review[] => {
    console.log(existingTop3);
    if (!existingTop3 || existingTop3.length === 0) {
        console.log("getting new")
        let _30SecNormalizedDate = get30SecNormalizedDate();
        const reviews = server.getTopThree(_30SecNormalizedDate).topThree as Review[];
        reviewsSlice.actions.addCurrentTop3([_30SecNormalizedDate, reviews])
        return reviews;
    }
    return existingTop3;
};

