import "../style/style.css"
import "../style/mobile.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"
let SponseredNews=({sponsoredNews, categoryColor})=>{
    return( 
    <div className="sponsered">
    <div className="s-container">
        <img src="images/icon-2.png" alt="icon"/>
        <h2> Sponsered news</h2>
    </div>
    <div className="rp-content">
        {sponsoredNews.map((post, idx) => (
        <div key={idx} className={`image-hover s${idx + 1}`}>
            <div className="rp-card-img1">
            <Link to={`/detail-page/${post.postId}`}><img src={post.postImage} alt="1"/></Link>
                <button className="image1-btn" style={{ backgroundColor : categoryColor[post.postCategory] || "crimson",}}><FontAwesomeIcon icon={faCircle} size="2xs"  /> {post.postCategory}</button>
            </div>
            <div className="rp-card-content">
                <h3>{post.postName}</h3>
                <div className="rp-card-content-about">
                    <img src="images/profile-2.jpg" alt=""/>
                    <p>by Bryan</p>&bull;
                    <p>{post.submissionDay}</p>
                </div>
            </div>
        </div>
        ))}

        </div>
    </div>
    )

}


export default SponseredNews