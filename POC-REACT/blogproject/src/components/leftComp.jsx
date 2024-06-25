import React, { useState, useEffect } from "react";
import RightComp from "../components/rightComp";
import { Link } from "react-router-dom";

function LeftComp() {
    // States to manage displayed images, formatted images, and recent posts
    const [displayedImages, setDisplayedImages] = useState([]);
    const [formattedImages, setFormattedImages] = useState([]);
    const [recentPost, setRecentPost] = useState([]);
    const imagesPerPage = 6; // Number of images to display per page
    const [startIndex, setStartIndex] = useState(0);

    // Fetch data from localStorage and update states when the startIndex changes
    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem("createPost")) || [];
        // Extracting top highlights and recent posts from stored data
        const latest_topHighlights = storedPosts["topHighlights"] || [];
        const recentPostNewsArray = storedPosts["recentPosts"] || [];
        const latest_recentPosts = recentPostNewsArray.reverse().slice(0, 4);

        // Update recentPost state with latest recent posts
        setRecentPost(latest_recentPosts);
        
        // Format top highlights data into an array of images

        const images = latest_topHighlights?.map((post) => ({
            id: post.postId,
            src: post.postImage,
            alt: post.postName,
            title: post.postName,
            description: post.shortDescription,
            date: post.submissionTime,
        })) || [];

        // Update formattedImages state with formatted data
        setFormattedImages(images);
        
        // Display a subset of images based on startIndex and imagesPerPage
        const displayed = images.length > 0 ? images.reverse().slice(0, startIndex + imagesPerPage) : [];
        setDisplayedImages(displayed);
    }, [startIndex]);

    // Function to handle "Load more posts" button click
    const handleShowMore = () => {
        setStartIndex((prevIndex) => prevIndex + imagesPerPage);
    };

    return (
        <>
            <div className='main-section'>
                <div className="left">
                    {/* Section for today's top highlights */}
                    <div className="icon">
                        <div className="icon-container">
                            <img className="image" src="images/icon.png" alt="icon" />
                            <h2>Today's top highlights</h2>
                        </div>
                        <h5>Latest breaking news, pictures, videos, and special reports</h5>
                    </div>
                    
                    {/* Displaying images with titles, descriptions, users, and dates */}
                    <div className="images">
                        {displayedImages?.map((image) => (
                            <div key={image.id}>
                                <Link to={`/detail-page/${image.id}`}>
                                    <img src={image.src} alt="image" />
                                </Link>
                                <h3>{image.title}</h3>
                                <p>{image.description}</p>
                                <div className="user">
                                    <img src={`images/user-2.jpg`} alt="user" />
                                    <p>by Louis  &bull; {image.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Load more button if there are more formatted images to display */}
                    {formattedImages.length > imagesPerPage && displayedImages.length < formattedImages.length && (
                        <div className="button">
                            <button onClick={handleShowMore}>Load more posts <img src="images/arrow.jpg" alt="arrow" /></button>
                        </div>
                    )}
                </div>
                
                {/* Rendering RightComp component with recent posts */}
                <RightComp recentPosts={recentPost} />
            </div>
        </>
    );
}

export default LeftComp;
