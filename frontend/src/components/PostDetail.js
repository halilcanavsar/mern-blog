import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from './PostForm';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Updated to use useNavigate
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await api.get(`/api/posts/${id}`);
      setPost(res.data);
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    await api.delete(`/api/posts/${id}`);
    navigate('/'); // Navigate back to the home page after deletion
  };

  return (
    <div>
      {post && (
        <div>
          {isEditing ? (
            <PostForm post={post} onSubmit={() => setIsEditing(false)} />
          ) : (
            <>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PostDetail;
