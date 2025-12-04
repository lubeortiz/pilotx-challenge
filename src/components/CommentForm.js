import React, { useState } from 'react';
import '../styles/CommentForm.css'; 

const CommentForm = ({ onPublish }) => {
  const [formData, setFormData] = useState({
    name: 'A',
    email: 'A@A.COM',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus ante non odio finibus ultrices. Donec vehicula, eros vel varius feugiat, arcu neque tincidunt metus, vel interdum lorem enim aliquam urna. Cras commodo commodo quam quis venenatis. Duis sodales tempus metus, et sodales urna ornare vitae. Nunc volutpat vestibulum erat, eu vestibulum nisi molestie et. Nulla vestibulum sodales est vitae varius. Cras mattis egestas maximus. Phasellus mattis lacinia massa, eget fermentum arcu scelerisque eget. In tempus est eget volutpat condimentum. Nulla faucibus ut ipsum a rutrum. Praesent id venenatis eros, sed placerat sem. Sed sit amet sodales sapien, ac rhoncus est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam convallis urna non erat egestas, quis viverra velit faucibus.',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setValidationError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.body) {
      setValidationError('Todos los campos son obligatorios.');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setValidationError('Por favor, introduce un email válido.');
      return;
    }

    setIsSubmitting(true);
    setValidationError('');

    await onPublish(formData); 
    
    setFormData({ name: '', email: '', body: '' });
    setIsSubmitting(false);
  };

  return (
    <div 
      className="comment-form-container" 
    >
      <h4 >Añadir un Comentario</h4>
      
      <form onSubmit={handleSubmit} className="comment-form">
        {validationError && (
          <p className="validation-error" role="alert">{validationError}</p>
        )}

        <div className="form-group name-input"> 
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu Nombre"
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="form-group email-input">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Tu Email"
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="form-group body-input">
          <label htmlFor="body">Comentario:</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder="Escribe tu comentario aquí..."
            disabled={isSubmitting}
            rows="4"
            required
          />
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Publicando...' : 'Publicar Comentario'}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;