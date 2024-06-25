import { useEffect, useReducer } from "react"
let CommentsComp = ({ postId }) => {

    // Reducer function

    let reducerFun = (state, action) => {
        switch (action.type) {
            case "SET_VALUE": return { ...state, [action.field]: action.value }
            case "SUBMIT": var options = { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric" }
                const submissionDate = new Date().toLocaleString("en", options);
                const commentId = Math.floor(Math.random() * 100000000);
                return { ...state, list: [...state.list, { commentId: commentId, postId: postId, name: state.name, email: state.email, comment: state.comment, time: submissionDate }] }
            case "RESET_FORM": return { name: "", email: "", comment: "", list: state.list, rememberMe: state.rememberMe }
            case "SET_DATA_FROM_STORAGE": return { ...state, list: action.list || [] }
            case "DELETE_COMMENT":
                const updatedComments = state.list.filter(
                    (comment) => comment.commentId !== action.commentId
                );
                return { ...state, list: updatedComments };
            default: return state;

        }
    }
    // Store and initial value
    let [store, dispatch] = useReducer(reducerFun, {}, () => {
        const storedData = JSON.parse(localStorage.getItem("userlist")) || [];
        const latestEntry = storedData[storedData.length - 1] || {};
        const commentId = Math.floor(Math.random() * 100000000);

        return {
            postId: postId,
            commentId: commentId,
            name: latestEntry.name || "",
            email: latestEntry.email || "",
            list: storedData || [],
        };
    });
    // set and get data in localStorage
    useEffect(() => {
        var storeName = localStorage.getItem("userlist")
        const storedList = JSON.parse(storeName) || [];
        if (storedList && storedList.length > 0) {
            dispatch({ type: "SET_DATA_FROM_STORAGE", list: storedList })
        }
    }, [postId])
    useEffect(() => {
        const jsonList = JSON.stringify(store.list)
        localStorage.setItem("userlist", jsonList);
    }, [store.list, postId ])

    // Changing the value in form
    let changeHandler = (evt) => {
        let { id, value } = evt.target;
        
            dispatch({ type: "SET_VALUE", field: id, value })
        
    }

    // Click on submit button
    let submitChange = (e) => {
        if (store.name.trim() !== "" && store.comment.trim() !== "") {
            dispatch({ type: "SUBMIT" })
        }
    }
    // Reset Form
    useEffect(() => {
        dispatch({ type: "RESET_FORM" })
    }, [store.list]);



    // For the specific post comment will display
    const checkId = store.list.filter((val) => val.postId === postId);
    // Delete the specific id
    const deleteComment = (commentId) => {
        dispatch({ type: "DELETE_COMMENT", commentId });
    };

    return <div className="main-content">
        <section className="heading">
            <h1>{checkId.length} Comments</h1>
        </section>

        <section className="box1">
            <ol className="ol">
                {checkId && checkId.map((val, idx) => (

                    <li key={idx}>
                        <div className="comments">
                            <div className="image">
                                <img src="../images/user-2.jpg" alt="user" />
                            </div>
                            <div className="content-comments">
                                <p>{val.name}</p>
                                <p>{val.time}</p>
                                <button className="reply">Reply</button>
                                <p>{val.comment}
                                </p>
                            </div>
                        </div>
                        <button onClick={() => deleteComment(val.commentId)}>Delete
                        </button>
                    </li>))}
            </ol>

        </section>
        <section className="form">
            <h2>Leave a reply</h2>
            <p>Your email address will notbe published. Required fields are marked*</p>
            <form action="#">
                <div className="form-container">
                    <div className="name">
                        <label htmlFor="name">Name</label>
                        <br /><br />
                        <input onChange={changeHandler} value={store.name} type="text" name="name" id="name" required />
                    </div>
                    <div className="email">
                        <label htmlFor="email">Email</label>
                        <br /><br />
                        <input onChange={changeHandler} value={store.email} type="email" name="email" id="email" required />
                    </div>
                </div>

                <div className="check">
                    <input type="checkbox" name="check" id="check" />
                    <p className="para-info">Save my name and email in this browser for the next time I comment</p>
                </div>
                <br />
                <div className="textarea">
                    <label htmlFor="comment">Your Comment</label><br />
                    <textarea onChange={changeHandler} value={store.comment} name="comment" id="comment" rows="7" required></textarea>
                </div>
                <button onClick={submitChange} className="btn-comment" >Post comment</button>
            </form>
        </section>
    </div>


}

export default CommentsComp