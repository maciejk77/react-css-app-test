import React, { useEffect, useState } from 'react';
import getPosts from '../../services/posts';
import Post from './Post';
import CreatePost from './CreatePost';

const Lister = () => {
  const [loading, setLoading] = useState(true);
  const [allPosts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState('');

  const lastIndex = allPosts.reduce(
    (acc, post) => (acc = acc > post.id ? acc : post.id),
    0
  );

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
    setPosts([...allPosts, { id: lastIndex + 1, ...post }]);
  };

  if (loading) return <div>Loading...</div>;

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const filteredPosts = allPosts.filter((post) =>
    // case insensitive and filtering by keyword matching as substring of post title
    post.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div>
      <input value={keyword} onChange={handleChange} />
      <div className="postList">
        {!allPosts.length ? (
          <h2>No posts available...</h2>
        ) : (
          filteredPosts.map(({ id, title, body, author }, idx) => (
            <Post
              key={idx}
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
    </div>
  );
};

export default Lister;

// Beyond the scope of the test, but I would refactor for readability as below...
// ...
//   const renderPosts = allPosts.map(({ id, title, body, author }, idx) => (
//     <Post
//       key={idx}
//       id={id}
//       title={title}
//       body={body}
//       author={author}
//       onDelete={onDeletePost}
//     />
//   ));

//   return (
//     <div className="postList">
//       {!allPosts.length ? <h2>No posts available...</h2> : renderPosts}

//       <CreatePost onCreate={onCreatePost} />
//     </div>
//   );
// ...
