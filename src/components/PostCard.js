import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PostCard.css';

const PostCard = React.memo(({ id, title, body }) => {
  const getBody = (text) => {
    const words = text.split(' ');
    if (words.length > 20) {
      return words.slice(0, 20).join(' ') + '...';
    }
    return text;
  };

  return (
    <Link to={`/posts/${id}`} className="post-card" aria-label={`Leer publicación: ${title}`}>
      <div className='d-flex flex-column' style={{height: '90%'}}>
        <h2 className="post-title">{title}</h2>
        <p className="post-body">{getBody(body)}</p>
      </div>
      <div className="read-more">Leer más →</div>
    </Link>
  );
});

export default PostCard;