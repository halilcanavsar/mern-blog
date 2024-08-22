import React, { useState } from 'react';
import api from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const PostForm = ({ post, onSubmit }) => {
  const [title, setTitle] = useState(post ? post.title : '');
  const [content, setContent] = useState(post ? post.content : '');
  const navigate = useNavigate(); // Updated to use useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, content };

    if (post) {
      await api.put(`/posts/${post._id}`, newPost);
    } else {
      await api.post('/posts', newPost);
    }

    navigate('/'); // Navigate back to the home page after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">{post ? 'Update' : 'Create'} Post</button>
    </form>
  );
};

export default PostForm;
