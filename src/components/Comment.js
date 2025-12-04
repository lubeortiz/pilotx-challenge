import React from 'react';
import '../styles/Comment.css';

const Comment = ({ name, email, body }) => {
  const initial = name ? name.charAt(0).toUpperCase() : '?';

  return (
    <div className="comment-card" aria-label={`Comentario de ${name}`}>
      <div className="comment-avatar">
        <div className="avatar-placeholder">
          {initial}
        </div>
      </div>
      <div className="comment-content">
        <div className="comment-header">
          <h4 className="comment-name">{name}</h4>
          <span className="comment-email">{email}</span>
        </div>
        <p className="comment-body">{body}</p>
      </div>
    </div>
  );
};

export default Comment;
