import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faEnvelope, faEllipsis, faShapes} from '@fortawesome/free-solid-svg-icons'
import { faEye, faHeart} from '@fortawesome/free-regular-svg-icons'
import { faFacebook, faSquareXTwitter, faLinkedin, faPinterest, faSquareFacebook } from '@fortawesome/free-brands-svg-icons'
import "../style/detail.css"
import { useState, useEffect } from 'react'
import { Header } from './header'
import { Footer } from './footer'
import CommentsComp from './comments'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

export let DetailPage = () => {
  const {postId} = useParams();
  const [showPost, setShowPost] = useState({})
  const [relatedPost, setRelatedPost] = useState([])

  // Getting the Post Data from the localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('createPost');
    try {
      const parsedData = JSON.parse(storedData) || {};
      const latest_relatedPosts = parsedData["sponsoredNews"].slice(0,2) || [];
     /* Rendering the related post using sponsored news i.e any 2 posts */
      setRelatedPost(latest_relatedPosts)
      const allPosts = [
        ...parsedData.topHighlights,
        ...parsedData.sponsoredNews,
        ...parsedData.recentPosts,
      ];
      // Compressing all data into allPosts to find the particular PostId 

      const selectedPost = allPosts.find((p) => p.postId == postId) || {};
    /* Fetching the data from local storage according to the particular postId*/
      setShowPost(selectedPost);
    } catch (error) {
      console.error("Error parsing 'createPost' data:", error);
    }

  }, [postId]);

// Dynamically added the color based on the category

  const categoryColor = {
    LifeStyle : "#d71b3b",
    Business : "#ff6e40",
    Marketing : "#12a4d9",
    Travel : "#cfb845",
    Technology : "#8a307f",
    Sports : "#05716c"
  }
  /* Assigning color accordin to the category */
  return(
    <>
    <div className="main-container">
      <Header/>
      {/* Main Content Header */}
      
      <div className="main">
      <header className="main-header">
        {/* Renderring the color according to type of color provided */}
        <button className="btn" style={{backgroundColor : categoryColor[showPost.postCategory] || "crimson",}}><FontAwesomeIcon icon={faCircle} size='sm'style={{marginRight : "0.2rem"}}/>{showPost.postCategory}</button>
        <h1>{showPost.postName}</h1>
        <p>{showPost.shortDescription}</p>
      </header>
      {/* Left Sidebar about the Author*/}

      <section className="left-sidebar">
        <img src="../images/profile.jpg" alt="profile-1" />
        <div className="left-sidebar-about">
          <h4>Louis Ferguson</h4>
          <p>An editor at blog</p>
        </div>
        <hr />
        <div className="left-sidebar-content">
          <div>
            <p>{showPost.submissionDay}</p>
            <p>{showPost.submissionTime}</p>
            <p><FontAwesomeIcon icon={faHeart} style={{marginRight : "0.2rem"}}/>266 </p>
            <p><FontAwesomeIcon icon={faEye} style={{marginRight : "0.2rem"}}/>2678 Views</p>
          </div>
          <div>
            <p>#agency #business</p>
            <p>#theme #marketing</p>
          </div>
        </div>
      </section>
      {/* Right Sidebar for the Advertisement and social media logo*/}
      <aside className="right-sidebar">
        <h4>Share this article</h4>
        <FontAwesomeIcon icon={faFacebook} style={{color: "#619bff", marginRight : "0.3em"}} size='2xl'/>
        <FontAwesomeIcon icon={faSquareXTwitter} style={{color: "#000000", marginRight : "0.3em"}} size='2xl'/>
        <FontAwesomeIcon icon={faLinkedin} style={{color: "#1b3a6f", marginRight : "0.3em"}} size='2xl' />
        <FontAwesomeIcon icon={faPinterest} style={{color: "#ff0000", marginRight : "0.3em"}} size='2xl' />
        <FontAwesomeIcon icon={faEnvelope} style={{color: "#6ba1ff",}} size='2xl' />
        <div className="right-sidebar-img">
          <img src="../images/advertisement.PNG" alt=""/>
        </div> 
      </aside>
      <main className="main-content">
        {/* Section-1 to display the data from The postBody(Rich Editor)*/}
        <div className="section-1">

          {/* Converting the  html string to react jsx  using dangerouslySetInnerHTML*/}
          <div className="section-1-img" dangerouslySetInnerHTML={{__html : showPost.postBody}}/>
          <br/>
          <div className="main-content-img">
            <img src={showPost.postImage} alt=""/>
          </div>
          <FontAwesomeIcon icon={faEllipsis} style={{color: "#001842", width : "100%"}} size='xl'/>
        </div>
        <div className="section-2-quote">
            <div className="sq-content">
              <img src="../images/quote.png" alt="quote" />
              <p>
                Success is not the key to happiness. Happiness is the key to
                success. If you love what you are doing, you will be
                sucessful.
                <cite>- Albert Schweitzer</cite>
              </p>
            </div>
          </div>
        {/* Section-2 To show the Related post */}
        

        <div className="related-post">
          <h3><FontAwesomeIcon icon={faShapes} /> Related Post</h3>
          <div className="rp-content">
            {relatedPost.map((post,idx) => (
            <div key={idx} className={`rp-card${idx + 1} image-hover`}>
              <div className="rp-card-img1">
              <Link to={`/detail-page/${post.postId}`}><img src={post.postImage} alt=""/></Link>
                <button style={{backgroundColor : categoryColor[post.postCategory] || "crimson",}}><FontAwesomeIcon icon={faCircle} size='sm' style={{ marginRight : "0.2rem"}}/>{post.postCategory}</button>
              </div>
              <div className="rp-card-content">
                <h4>{post.postName}</h4>
                <div className="rp-card-content-about">
                  <img src="../images/profile-3.jpg" alt="" />
                  <p>by Bryan</p>
                  &bull;
                  <p>{post.submissionDay}</p>
                </div>
              </div>
            </div>            
            ))}
          </div>
        </div>
        
        {/* Author Testimonials */}

        <hr className="author-testimonial-hr"/>
        <div className="author-testimonial">
          <div className="at-img">
            <img src="../images/profile.jpg" alt="Profile" />
          </div>
          <div className="at-content">
            <div className="at-about">
              <div className="at-about-editor">
                <h3>Louis Ferguson</h3>
                <p>An editor at Blog</p>
              </div>
              <div>
                <button>View Articles</button>
              </div>
            </div>
            <p>
              Louis Ferguson is a senior editor for the blog and also reports
              on breaking news based in London. He has written abput
              government, criminal justice, and the role of money in politics
            </p>
            <FontAwesomeIcon icon={faSquareFacebook} size="lg" style={{color: "#1c222b", marginRight : "0.3em"}} />
            <FontAwesomeIcon icon={faSquareXTwitter} size="lg" style={{color: "#1c222b", marginRight : "0.3em"}} />
            <FontAwesomeIcon icon={faLinkedin} size="lg" style={{color: "#1c222b",}} />
          </div>
        </div>
      <hr className="author-testimonial-hr"></hr>
      {/* Adding the comment section of specific post */}
      <CommentsComp postId={postId}/>
      </main>      
    </div>
  </div>
  <Footer/> 
  </>   
  )
}