import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';
import '../styles/PostPage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Swal from 'sweetalert2';

const PostPage = () => {

  const topCommentsRef = useRef(null);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;

  useEffect(() => {
    const fetchPostData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        const commentsRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);

        if (!postRes.ok || !commentsRes.ok) {
          throw new Error('Error al cargar el post o sus comentarios.');
        }

        const postData = await postRes.json();
        const commentsData = await commentsRes.json();

        setPost(postData);
        setComments(commentsData);

      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleNewComment = async (commentData) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: parseInt(postId),
          ...commentData,
          id: Date.now(),
        }),
      });

      if (!response.ok) {
        throw new Error('Error al publicar el comentario.');
      }

      const newComment = await response.json();
      setComments(prevComments => [newComment, ...prevComments]);
      topCommentsRef.current?.scrollIntoView({ behavior: 'smooth' });
      setCurrentPage(1);

      Toast.fire({
        icon: "success",
        title: "Comentario publicado"
      });

    } catch (error) {
      Toast.fire({
        icon: "error",
        title: `Error: ${error.message}`
      });
    }
  };

  /* paginación */
  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const startIndex = (currentPage - 1) * commentsPerPage;
  const currentComments = comments.slice(startIndex, startIndex + commentsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (isLoading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <a href='/' style={{ textDecoration: 'none', color: 'white', '-webkit-text-stroke': '.5px', marginRight: '20px' }}><i class="bi bi-arrow-left"></i></a>
        <h2>Error al cargar</h2>
        <p>{error.message}</p>
        <p>Por favor, inténtelo de nuevo más tarde.</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="not-found">
        <h2>Post no encontrado</h2>
        <p>El post solicitado no existe.</p>
      </div>
    );
  }

  return (
    <div className="main-container d-flex align-items-center">
      <article className="post-content">
        <div className='d-flex align-items-center justify-content-start flex-row'>
          <a href='/' style={{ textDecoration: 'none', color: 'white', '-webkit-text-stroke': '.5px', marginRight: '20px' }}><i class="bi bi-arrow-left"></i></a>
          <h1>{post.title}</h1>
        </div>
        <div className='overflow-y-auto'>
          <p className="post-body m-0">{post.body}</p>
        </div>
      </article>

      <section className="comments-section">
        <h2>Comentarios ({comments.length})</h2>

        {comments.length === 0 ? (
          <p className="no-comments">Aún no hay comentarios. ¡Sé el primero en comentar!</p>
        ) : (
          <>
            <div ref={topCommentsRef}></div>
            <div className="comments-list">
              {currentComments.map(comment => (
                <Comment
                  key={comment.id}
                  name={comment.name}
                  body={comment.body}
                  email={comment.email}
                />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  aria-label="Página anterior de comentarios"
                >
                  Anterior
                </button>
                <span>Página {currentPage} de {totalPages}</span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  aria-label="Página siguiente de comentarios"
                >
                  Siguiente
                </button>
              </div>
            )}
            <CommentForm onPublish={handleNewComment} />
          </>
        )}
      </section>
    </div>
  );
};

export default PostPage;