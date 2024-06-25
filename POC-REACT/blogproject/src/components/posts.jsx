import "../style/posts.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { faCircle } from '@fortawesome/free-solid-svg-icons' 

import Pagination from "./pagination";
 
 
 
const PostList = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
 
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPostList, setFilteredPostList] = useState([]);
 
    const [sortCriteria, setSortCriteria] = useState('');
 
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(10);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPost = filteredPostList.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
     
  //dynamic css for the particular categories
    const categoryColor = {
      LifeStyle : "#d71b3b",
      Business : "#ff6e40",
      Marketing : "#12a4d9",
      Travel : "#cfb845",
      Technology : "#8a307f",
      Sports : "#05716c"
    }
    //dynamic css for the row style
    const rowStyle = {
        backgroundColor: '#ffffff',
        height: '50px',
    };

    //dynamic css for the button style
    const buttonStyle = {
        padding: '5px 10px',
        marginRight: '5px',
        cursor: 'pointer',
        borderRadius: '50%',
        border: '1px solid #ccc',
        backgroundColor: 'whitesmoke',
       
    };
     
    useEffect(() => {
      //check for the stored data in createPost object
      const storedData = localStorage.getItem('createPost');
 
      try {
        // to save all the posts in one single object for easy traversal
        const parsedData = JSON.parse(storedData) || {};
        const allPosts = [
          ...parsedData.topHighlights,
          ...parsedData.sponsoredNews,
          ...parsedData.recentPosts,
        ];

        setPosts(allPosts);
        setFilteredPostList(allPosts);
      } catch (error) {
        console.error("Error parsing 'createPost' data:", error);
      }
 
    }, []);

  // add editpost route to go to edit-post page along with the postId
  const editPost = (postId) => {
    navigate(`/edit-post/${postId}`);
  }
 
  const deletePost = (postId) => {
    //To filter the posts with the specified selected ID
    const updatedPostList = filteredPostList.filter((post) => post.postId !== postId);


    //To retrieve the data from localstorage
    const storedData = JSON.parse(localStorage.getItem('createPost')) || {};
    const { topHighlights = [], sponsoredNews = [], recentPosts = [] } = storedData;
    //Update the array based on post Category
    const updatedData = {
      ...storedData,
      topHighlights: topHighlights.filter(post => post.postId !== postId),
      sponsoredNews: sponsoredNews.filter(post => post.postId !== postId),
      recentPosts: recentPosts.filter(post => post.postId !== postId),
    };

  
    //Save the data to localstorage
    localStorage.setItem("createPost", JSON.stringify(updatedData));
  
    // update the post list after deletion
    setFilteredPostList(updatedPostList);
  };

  const handleSearch = () => {
    //filter the data based on search string
    const newFilteredPostList = posts.filter(
      (post) =>
        post.postName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.postCategory.toLowerCase().includes(searchQuery.toLowerCase())
    );
 
    setFilteredPostList(newFilteredPostList);
  };
 
  //sorting the data based on the criteria using switch case
  const handleSort = (criteria) => {
    let sortedList = [...filteredPostList];
 
    switch (criteria) {
      case 'name':
        sortedList.sort((a, b) => a.postName.localeCompare(b.postName));
        break;
      case 'newest':
        sortedList.sort((a, b) => {
          const dateComparison = new Date(b.submissionDay + ' ' + b.submissionTime) - new Date(a.submissionDay + ' ' + a.submissionTime);
          return dateComparison !== 0 ? dateComparison : a.postName.localeCompare(b.postName);
        });
        break;
      case 'oldest':
        sortedList.sort((a, b) => {
          const dateComparison = new Date(a.submissionDay + ' ' + a.submissionTime) - new Date(b.submissionDay + ' ' + b.submissionTime);
          return dateComparison !== 0 ? dateComparison : a.postName.localeCompare(b.postName);
        });
        break;
      default:
        break;
    }

    //update the criteria and the sorted list
    setFilteredPostList(sortedList);
    setSortCriteria(criteria);
  };
   
 
    return <div className="table-container">
    <div className="search-list-container">
    <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
    <button className="search-btn" type="submit" onClick={handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} size="lg" style={{color: "#000000",}} /></button>
    <select name="sort" id="sort" value={sortCriteria} onChange={(e)=>handleSort(e.target.value)}>
        <option value="">Sort by</option>
        <option value="name">Name</option>
        <option value="newest">Latest Posts</option>
        <option value="oldest">Oldest Posts</option>
    </select>
    <button className="red-btn" onClick={()=>{navigate("/create-post")}}>Create Post</button>
    </div>
    <div>
      <table className="table" >
        <thead>
            <tr>
                <th>Post Name</th>
                <th>Published Date</th>
                <th>Category</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
          {currentPost?.map((post,index) => (
            <React.Fragment key={post.postId}>
            <tr style={rowStyle}>
                <td>
                    {post.postName}
                </td>
                <td>
                    {post.submissionDay}
                </td>
                <td>
                  <button className="post-category-btn" style={{ backgroundColor : categoryColor[post.postCategory] || "crimson", color : "#fff"}}><FontAwesomeIcon icon={faCircle} size='2xs'style={{marginRight : "0.3em"}}/>{post.postCategory}</button>                    
                </td>
                <td>
                <button style={buttonStyle} onClick={() => deletePost(post.postId)}>
                      <FontAwesomeIcon icon={faTrash} size="lg"  />
                    </button>{" "}
                    <button style={buttonStyle} onClick={() => editPost(post.postId)} >
                      <FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#000000" }} />
                    </button>
                     
                </td>
              </tr>
              {index !== filteredPostList.length-1 && (
                <tr style={{height:'0.5px', backgroundColor:'#ccc'}}>
                    <td colSpan="4"></td>
                </tr>
              )}
              </React.Fragment>
          ))}
        </tbody>
      </table>
      <Pagination totalPages={Math.ceil(filteredPostList.length / postPerPage)} currentPage={currentPage} onPageChange={paginate}/>
    </div>
    </div>
 
}
 
 
 
export default PostList;