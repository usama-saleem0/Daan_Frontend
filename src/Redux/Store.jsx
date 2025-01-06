import { configureStore } from "@reduxjs/toolkit";
import questionCounterReducer from '../Redux/Features/QuestionsSlice'

export const store=configureStore({

    reducer:{

        questionCounter:questionCounterReducer
        
    }



})