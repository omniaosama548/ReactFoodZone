import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css' 
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/ReactFoodZone">
  <CartProvider>
    <App />
    </CartProvider>
  </BrowserRouter>,
)
