import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../baseUrl";
import axios from "axios";

// Define your async thunk actions
export const signup = createAsyncThunk(
  "auth/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/signup`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify(credentials),
        body: credentials, 
      });

      const data = await response.json();
      // console.log(data, "data of signup");

      // localStorage.setItem("user", JSON.stringify(data.message));

      // localStorage.setItem("user_data", JSON.stringify(data.storeData));

      // console.log(data, " REDUX ");

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      console.log(data, "data of user");


      console.log(data.token, "data of login");

      localStorage.setItem("currentuser", JSON.stringify(data.user));

      localStorage.setItem("user", data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const loginemail = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/loginmember`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      console.log(data, "data of user");


      console.log(data.token, "data of login");

      localStorage.setItem("currentuser", JSON.stringify(data.user));

      localStorage.setItem("user", data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getFinalAnswers = createAsyncThunk(
  "getFinalAnswers",
  async (args, { rejectWithValue }) => {
    const response = await fetch(`${baseUrl}/finaldata/${args}`);

    try {
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const getFinalAnswersAudio = createAsyncThunk(
  "getFinalAnswersAudio",
  async (args, { rejectWithValue }) => {
    const response = await fetch(`${baseUrl}/finaldataaudio/${args}`);

    try {
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);




export const getUserChapter = createAsyncThunk(
  "getUserChapter",
  async (args, { rejectWithValue }) => {
    const response = await fetch(`${baseUrl}/chaptersdata/${args}`);

    try {
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getChapter = createAsyncThunk(
  "getChapter",
  async (args, { rejectWithValue }) => {
    const response = await fetch(`${baseUrl}/getChapter`);

    try {
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getChapterH = createAsyncThunk(
  "getChapter",
  async (args, { rejectWithValue }) => {
    console.log({args});
    const response = await fetch(`${baseUrl}/chapters-details/${args}`);

    try {
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getChapterById = createAsyncThunk(
  "getChapterById",
  async (args, { rejectWithValue }) => {
    const response = await fetch(`${baseUrl}/getChapter/${args}`);

    try {
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getUserChapterbyid = createAsyncThunk(
  "getUserChapterbyid",
  async (args, { rejectWithValue }) => {
    const response = await fetch(`${baseUrl}/fetchAllChapterUserIdFromStaticQues/${args}`);

    try {
      const result = await response.json();
      console.log({result});
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const AddtoCart = createAsyncThunk(
  "AddtoCart",
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/addtocart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
      });
      const data = await response.json();

      console.log('addedtocart' , data)

     

      
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);



export const getCartElement = createAsyncThunk(
  "getCartElement",
  async (args, { rejectWithValue }) => {
    const response = await fetch(`${baseUrl}/fetchcartbyid/${args}`);

    try {
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const UserChapterQuestionChat = createAsyncThunk(
  "UserChapterQuestionChat",
  async ({ user_id, questionChapterId }, { rejectWithValue }) => {
    console.log("bhaiiii");
    const response = await fetch(
      `${baseUrl}/get_user_chapter_chat/${user_id}/${questionChapterId}`
    );

    try {
      const result = await response.json();
      console.log(result);
      return result.ChatData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const fetchStaticQuestions = createAsyncThunk(
  "fetchStaticQuestions",
  async ({ user_id }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${baseUrl}/chapters/${user_id}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      console.log("Static Questions Fetched:", result.staticquestions);
      return result.staticquestions;
    } catch (error) {
      console.error("Error Fetching Static Questions:", error);
      return rejectWithValue(error.message);
    }
  }
);



export const addQuestionsToChapter = createAsyncThunk(
  'addQuestionsToChapter',
  async ({ userId, chapter, newQuestion }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/add-question-user`, {
        userId,
        chapterId:chapter,
        question: newQuestion,
      });
      return response.data;
    } catch (error) {
      toast.error('Failed to add questions'); // Show error toast
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);




// Define your slice
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: (() => {
      const user = localStorage.getItem("user");
      try {
        return user ? JSON.parse(user) : null;
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
        return null;
      }
    })(),
    user_data: (() => {
      const user_data = localStorage.getItem("user_data");
      try {
        return user_data ? JSON.parse(user_data) : null;
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
        return null;
      }
    })(),
    loading: false,
    error: null,

    FinalResponseLoading: false,
    FinalResponse: null,

    UserChapterStoryData: [],
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getFinalAnswers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFinalAnswers.fulfilled, (state, action) => {
        state.loading = false;
        state.FinalResponse = action.payload;
      })
      .addCase(getFinalAnswers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(UserChapterQuestionChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(UserChapterQuestionChat.fulfilled, (state, action) => {
        state.loading = false;
        state.UserChapterStoryData = action.payload;
      })
      .addCase(UserChapterQuestionChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchStaticQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStaticQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.UserChapterStoryData = action.payload;
      })
      .addCase(fetchStaticQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserChapterbyid.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserChapterbyid.fulfilled, (state, action) => {
        state.loading = false;
        state.UserChapterStoryData = action.payload;
      })
      .addCase(getUserChapterbyid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addQuestionsToChapter.pending, (state) => {
        state.loading = true;
      })
      .addCase(addQuestionsToChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.UserChapterStoryData = action.payload;
      })
      .addCase(addQuestionsToChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getChapterH.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChapterH.fulfilled, (state, action) => {
        state.loading = false;
        state.UserChapterStoryData = action.payload;
      })
      .addCase(getChapterH.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(AddtoCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddtoCart.fulfilled, (state, action) => {
        state.loading = false;
        state.UserChapterStoryData = action.payload;
      })
      .addCase(AddtoCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducers
export const { logout } = authSlice.actions;
export default authSlice.reducer;
