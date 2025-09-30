const Posts = ({ posts }) => {
  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => <h3 key={post.id}>{post.title}</h3>)
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
};

export default Posts;
