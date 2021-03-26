import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {getTop3, get30SecNormalizedDate} from "./services/top3";
import _ from "underscore";
import {useAppSelector, useAppDispatch} from './app/hooks'
import store, {RootState} from "./app/store";
import {selectMostRecentReviews, selectReviews} from "./services/reviews";
import {Provider} from "react-redux";


function App() {
    let existingTop3 = useAppSelector(state => selectReviews(state, get30SecNormalizedDate())) || [];
    const [top3, setTop3] = useState(existingTop3);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log("getting new top3; existing ", existingTop3);
            let newTop3 = getTop3(existingTop3);
            setTop3(_.uniq(newTop3.concat(top3)));
        }, 1000);
        return () => clearInterval(interval);
    }, [top3, existingTop3]);

    const top3Elems = top3.map(review => (
        <li key={review.id}>{review.body}</li>
    ));

    return (
            <div className="App">
                <ul>
                    {top3Elems}
                </ul>
            </div>
    );
}

export default App;
