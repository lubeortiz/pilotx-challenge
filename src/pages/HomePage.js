import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import '../styles/HomePage.css';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('No se pudieron cargar los posts.');
        }
        const data = await response.json();
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (isLoading) {
    return (
      <div className="loading-state">
        <div class="spinner-border m-5" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <h2 style={{ color: 'red' }}>Error al cargar:</h2>
        <p>{error.message}</p>
        <p>Por favor, inténtelo de nuevo más tarde.</p>
      </div>
    );
  }

  return (
    <div className="main-container">
      <h1>Publicaciones</h1>
      {posts.length === 0 ? (
        <p>No hay publicaciones disponibles.</p>
      ) : (
        <>
          <div className="posts-list">
            {currentPosts.map(post => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                body={post.body}
              />
            ))}
          </div>
          <div className="pagination">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              aria-label="Página anterior"
            >
              Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              aria-label="Página siguiente"
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
