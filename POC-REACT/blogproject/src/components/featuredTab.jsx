import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const FeaturedTab = ({ featuredTab, categoryColor }) => {
  const hasFeaturedPosts = featuredTab.some(post => post.isFeatured);
  // using parameters and loading the data 
  return (
    <>
      {hasFeaturedPosts && (
        <div className="container">
          {/* Checks if the post is isFeatured or not */}
          {featuredTab.filter(post => post.isFeatured).map((post, idx) => (
            <div key={idx} className={`content1 image${idx + 1}`} style={{ backgroundImage: `url(${post.postImage})` }}>
              <div className="div">
                <button className="red-label" style={{ backgroundColor: categoryColor[post.postCategory] || "crimson", color: "#fff" }}>
                  <FontAwesomeIcon icon={faCircle} size="2xs" style={{ marginRight: "0.3em" }} />
                  {post.postCategory}
                </button>

                <Link to={`/detail-page/${post.postId}`}>{post.postName}</Link>

                <div>{idx === 0 && post.shortDescription}</div>

                <div className="profile">
                  {idx === 0 && <img src="images/user-1.jpg" alt="" />}
                  <ul>
                    <li>by Louis</li>
                    <li>{post.submissionDay}</li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FeaturedTab;
