import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import Footer from './components/layout/Footer';
import PostPage from './pages/PostPage';

function App() {
  return (
    <div className="App d-flex flex-column justify-content-between overflow-y-hidden" style={{height: '100vh'}}>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/posts/:postId" element={<PostPage />} />
          <Route path="*" element={<h1>404: No Encontrado</h1>} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
