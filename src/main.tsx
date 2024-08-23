import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.tsx'
import './index.css'
import './components/Fragments/navbar.css'
import Pokemon from './pages/pokemon.tsx';
import Bag from './pages/bag.tsx';
import { BagProvider } from './contexts/BagContext.tsx';
import { Provider } from 'react-redux';
import store from './redux/store.tsx';

export default function Main() {
  return (
    <Provider store={store}>
      <BagProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<App />}>
              <Route path="pokemon" element={<Pokemon />} />
              <Route path="bag" element={<Bag />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </BagProvider>
    </Provider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Main />
  </StrictMode>,
)
