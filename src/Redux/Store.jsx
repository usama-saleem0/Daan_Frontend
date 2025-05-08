import { configureStore } from "@reduxjs/toolkit";
import questionCounterReducer from '../Redux/Features/QuestionsSlice'

import authReducer from '../Redux/Features/UserSlice'
import storyReducer from '../Redux/Features/storySlice'

export const store=configureStore({

    reducer:{

        questionCounter:questionCounterReducer,
        auth:authReducer,
        story: storyReducer,
        
    }



})