import { configureStore } from '@reduxjs/toolkit'
import articleSlicer from '../features/articles/article-slicer'
import favoriteSlicer from '../features/favorite/favorite-slicer'

export const store = configureStore({
  reducer: {
    article: articleSlicer,
    favorites: favoriteSlicer
  },
})