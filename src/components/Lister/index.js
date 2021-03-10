import React, { useEffect, useState } from 'react';
import getPosts from '../../services/posts';
import Post from './Post';
import CreatePost from './CreatePost';

const Lister = () => {
  const [loading, setLoading] = useState(true);
  const [allPosts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const onDeletePost = (id) => {
    const filteredPosts = allPosts.filter((post) => post.id !== id);
    setPosts(filteredPosts);
  };

  const onCreatePost = (post) => {
    setPosts([...allPosts, post]);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="postList">
      {!allPosts.length ? (
        <>No posts available...</>
      ) : (
        allPosts.map(({ id, title, body, author }) => (
          <Post
            key={`post-${id}`}
            id={id}
            title={title}
            body={body}
            author={author}
            onDelete={onDeletePost}
          />
        ))
      )}

      <CreatePost onCreate={onCreatePost} />
    </div>
  );
};

export default Lister;
