import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ProtectedRoute from './utils/ProtectedRoute';
import Items from './pages/Items/Items';
import Profile from './pages/Profile';
import Item from './pages/Items/Item';
import Layout from './utils/Layout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<>Homepage</>} />
              <Route path="/items" element={<Items />} />
              <Route path="/items/:id" element={<Item />} />
              <Route path="/profile" element={<Profile />} />
            </Route>


          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
