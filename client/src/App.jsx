import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from './views/HomePage'
import LoginPage from './views/LoginPage'
import RegisterPage from './views/RegisterPage'
import ProfilePage from './views/ProfilePage'
import NewsDetailPage from './views/NewsDetailPage'
import BaseLayout from './views/BaseLayout'
import EditPPPage from './views/EditPPPage'
import FavoritePage from './views/FavoritePage'


function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route element={<BaseLayout/>}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/editProfile" element={<EditPPPage />} />
            <Route path="/article/:id" element={<NewsDetailPage />} />
            <Route path="/myFavorite" element={<FavoritePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
