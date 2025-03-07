import { createSlice } from '@reduxjs/toolkit'
import baseUrl from '../../api/baseUrl';
import axios from 'axios';

const initialState = {
    article: [],
    loading: false,
    error: ""
}

export const articleSlicer = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    fetchPending(state) {
        state.loading = true;
        state.article = [];
        state.error = "";
      },
      fetchSuccess(state, action) {
        state.loading = false;
        state.article = action.payload;
        state.error = "";
      },
      fetchReject(state, action) {
        state.loading = false;
        state.article = [];
        state.error = action.payload;
      },
  },
})

// Action creators are generated for each case reducer function
export const { fetchPending, fetchSuccess, fetchReject } = articleSlicer.actions

export const fetchAsync = () => async (dispatch) => {
    try {
      dispatch(fetchPending());
  
      const { data } = await axios.get(`${baseUrl}/articles`);
  
      // console.log(data, "Data dari API:");
      dispatch(fetchSuccess(data));
    } catch (error) {
      // console.error("Error fetching games:", error);
      dispatch(fetchReject(error.message));
    }
  };

export default articleSlicer.reducer