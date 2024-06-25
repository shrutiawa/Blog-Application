import { useRef, useState } from "react"
import { Editor } from "@tinymce/tinymce-react"
import "../style/createPost.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router";

let CreatePost = () => {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  // Setting default values at first render
  const [formData, setFormData] = useState({
    postName: "",
    shortDescription : "",
    postBody : "",
    postImage : "",
    postType : "",
    postCategory : "",
    isFeatured : false,
  })
  // Handles rich Text Editor inputs fields
  const handleEditor = (content) => {
    setFormData((prevData) => ({ ...prevData, postBody: content }));
  }

  // Handles other inputs from input fileds
  const handleInput = (evt) => {
    const {name, value, type, checked} = evt.target
    let inputValue;

    // Checks for if checkbox is checked for isFeatured
    if(type === "checkbox"){
      inputValue = checked
    }
    else if(name === "postImage" && type === "text"){
      inputValue = value
    }
    else{
      inputValue = value !== undefined ? value : formData[name]
    }

    // Stores the inputed data to Form Data
    setFormData((prevData) => ({...prevData, [name]: inputValue}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // On submit dynamically fetch the time and date
    const submissionTime = new Date().toLocaleTimeString();
    const submissionDay = new Date().toDateString();
    // Create a random id on submit for each post
    const postId = Math.floor(Math.random() * 100000000)
  
    // Add the dynamically fetched data to formdata
    const updatedFormData = {
      ...formData,
      submissionDay,
      submissionTime,
      postId,
    };

    // Search and Create a array based data in localStorage
    const storedData = localStorage.getItem("createPost");
    let existingData = storedData ? JSON.parse(storedData) : { topHighlights: [], sponsoredNews: [], recentPosts: [] };

    // According to the postType store data within same array as objects according to the types
    if (formData.postType === "Top Highlights") {
      existingData.topHighlights.push(updatedFormData);
    } 
    else if (formData.postType === "Sponsored News") {
      existingData.sponsoredNews.push(updatedFormData);
    } 
    else if (formData.postType === "Recent Post") {
      existingData.recentPosts.push(updatedFormData);
    };
  
    // Save the changes in the localstorage
    localStorage.setItem("createPost", JSON.stringify(existingData));
  
    if (editorRef.current) {
      editorRef.current.setContent("");
    }
    // Saves the newly added changes in the local storage
    setFormData(updatedFormData)
    window.alert(`Added Blog Post Successfully!!!`);

    // Clearing the input fileds on sumbit 
    setFormData((prevData) => ({
      ...prevData,
      isFeatured : false,
      postName : "",
      shortDescription : "",
      postImage : "",
      postType : "",
      postCategory : "",
    }))
  };
  
  return (
    <div className="post-container">
      <div className="post-navigation">
        <h2>Create Post <FontAwesomeIcon icon={faPenToSquare} style={{color : "#00000"}}/></h2>
        <div>
          <button className="red-btn" onClick={()=>{navigate("/post-list")}}>Dashboard</button>
        </div>
      </div>
      <div className="dorm-container">
        <form action="#" onSubmit={handleSubmit}>
          <div className="post-name">
            <label htmlFor="postName">Post Name</label>
            <input onChange={handleInput} type="text" name="postName" id="postName" placeholder="Post Name" value={formData.postName} required/>
          </div>
          <label className="suggestions">Moving heaven divide two sea females great midst spirit</label>
          <div className="post-description">
            <label htmlFor="shortDescription">Short Description</label>
            <textarea onChange={handleInput} name="shortDescription" id="shortDescription" rows="4" placeholder="Add Description" value={formData.shortDescription} required></textarea>
          </div>
          <div className="post-body">
            <label htmlFor="postBody">Post Body</label>
              <Editor
                apiKey='cuh8os9y3pawvjo1u8rwc0s4heflzi2fpgwtgw301onns3q2'
                onInit={(evt, editor) => editorRef.current = editor}
                init={{
                  height: 500,
                  menubar: true,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ], 
                  toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help | image',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onEditorChange={handleEditor}   
                //Handles rich text editor changes    
              />
          </div>
          <div className="post-image">
            <label htmlFor="postImage">Upload Post Image Here</label><br />
            <button>Choose File</button>
            <input onChange={handleInput} name="postImage"  type="text" id="postImage" accept=".jpg,jpeg,.png" value={formData.postImage} required/>
          </div>
          <label className="suggestions"> <strong>Note</strong>  : Only JPG,JPEG and PNG. Our suggested dimensions are 600px * 450px. Larger Image will be cropped to 4:3 to fit our thumbnails/previews.</label>
          <div className="type-category">
            <div className="post-type">
              <label htmlFor="postType">Type</label>
              <select name="postType" id="postType" onChange={handleInput} value={formData.postType} required>
                <option value="">--Select Type--</option>
                <option value="Recent Post">Recent Post</option>
                <option value="Top Highlights">Top Highlights</option>
                <option value="Sponsored News">Sponsored News</option>
              </select>
              <label className="suggestions">Maximum of 14 keywords. Keywords should all be in lowercase and seperated by commas. e.g. javascript, react, marketing.</label>
            </div>
            <div className="post-category">
              <label htmlFor="postCategory">Category</label>
              <select name="postCategory" id="postCategory" onChange={handleInput} value={formData.postCategory} required>
                <option value="">--Select Category--</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Technology">Technology</option>
                <option value="Travel">Travel</option>
                <option value="Business">Business</option>
                <option value="Sports">Sports</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
          </div>
          <div className="post-featured">
            <input type="checkbox" name="isFeatured" id="isFeatured" onChange={handleInput} checked={formData.isFeatured}/>
            <label htmlFor="isFeatured"> Make this post featured ?</label>
          </div>
          <div>
            <button className="submit-btn" type="submit">Create Post</button>
          </div>
        </form>
      </div>
      <br />
    </div>
  )
}
export default CreatePost 