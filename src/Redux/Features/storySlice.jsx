import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../baseUrl";

// Fetch Story by userId and questionId
export const fetchStory = createAsyncThunk(
  "fetchStory",
  async ({ userId, questionId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/get-stories-by-id/${userId}/${questionId}`
      );
      const story = response.data.data;
      return story;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch story"
      );
    }
  }
);

// Create or Update Story
export const saveStory = createAsyncThunk(
  "saveStory",
  async ({ userId, questionId, messages, chapterId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/stories`, {
        userId,
        questionId,
        chapterId,
        messages,
      });
      return response.data; // Returns updated or newly created story
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to save story"
      );
    }
  }
);
export const saveStoryEnchaned = createAsyncThunk(
  "saveStoryEnchaned",
  async ({ userId, questionId, messages, chapterId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/stories-enchaced`, {
        userId,
        questionId,
        chapterId,
        messages,
      });
      return response.data.data; // Returns updated or newly created story
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to save story"
      );
    }
  }
);

const storySlice = createSlice({
  name: "story",
  initialState: {
    story: null,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchStory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStory.fulfilled, (state, action) => {
        state.loading = false;
        state.story = action.payload;
      })
      .addCase(fetchStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(saveStory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveStory.fulfilled, (state, action) => {
        state.loading = false;
        state.story = action.payload;
      })
      .addCase(saveStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default storySlice.reducer;
