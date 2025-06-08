
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import Footer from './components/Footer'
import CartPage from './pages/CartPage'
import { ToastContainer } from 'react-toastify';
import Admin from './components/Admin'
export default function App() {

  return (
    <div className="app-container d-flex flex-column min-vh-100">
      <Navbar />
      <ToastContainer />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path='/admin' element={<Admin/>}/>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}


