import React from 'react';
import { Link } from 'react-router-dom'
function RecentPostComp({recentPosts}) {
  return (
    <>
      {recentPosts.map((post, idx) => (
        <div key={idx} className="recent-post-item">
          <Link to={`/detail-page/${post.postId}`}><img src={post.postImage} alt="3" /></Link>
          <div className="content-rp">
            <h5>{post.postName}</h5>
            <small>{post.submissionDay}</small>
          </div>
        </div>
      ))}
    </>

  );
}

export default RecentPostComp;
