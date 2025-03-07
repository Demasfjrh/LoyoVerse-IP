// redux/slicers/favoriteSlicer.js
import { createSlice } from '@reduxjs/toolkit'
import baseUrl from '../../api/baseUrl';
import axios from 'axios';

const initialState = {
    favorites: [],
    loading: false,
    error: ""
}

export const favoriteSlicer = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    fetchPending(state) {
        state.loading = true;
        state.favorites = [];
        state.error = "";
      },
      fetchSuccess(state, action) {
        state.loading = false;
        state.favorites = action.payload;
        state.error = "";
      },
      fetchReject(state, action) {
        state.loading = false;
        state.favorites = [];
        state.error = action.payload;
      },
      removeFavorite(state, action) {
        state.favorites = state.favorites.filter(fav => fav.id !== action.payload);
      }
  },
})

// Action creators
export const { 
  fetchPending, 
  fetchSuccess, 
  fetchReject, 
  removeFavorite 
} = favoriteSlicer.actions

// Async thunk untuk fetch favorites
export const fetchFavoritesAsync = () => async (dispatch) => {
    try {
      dispatch(fetchPending());
  
      const token = localStorage.getItem('access_token');
      const { data } = await axios.get(`${baseUrl}/favorites`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      // console.log(data, "Data Favorites dari API:");
      dispatch(fetchSuccess(data));
    } catch (error) {
      // console.error("Error fetching favorites:", error);
      dispatch(fetchReject(error.message));
    }
};

// Async thunk untuk menghapus favorit
export const removeFavoriteAsync = (favoriteId) => async (dispatch) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`${baseUrl}/favorites/${favoriteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      dispatch(removeFavorite(favoriteId));
    } catch (error) {
      // console.error("Error removing favorite:", error);
      dispatch(fetchReject(error.message));
    }
};

export default favoriteSlicer.reducer