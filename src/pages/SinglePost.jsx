import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, {useEffect, useState} from "react";
import { format } from "date-fns";

import { useParams } from "react-router-dom";
import { getSinglePost } from "../api/utils";
import Navbar from "../components/Navbar.jsx";

function SinglePost() {
    const {id} = useParams();
    const [post, setPost] = useState({});
    const [comment, setComment] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            const post = await getSinglePost(id);
            setPost(post);
        }

        fetchPost();
    }, []);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        // Implement comment submission logic here
        setComment("");
    };


    return (
        <>
            <Navbar />
            <div className="single-post-container mt-5">
                <div className="post-header">
                    {post.thumbnail && (
                        <div className="post-thumbnail">
                            <img src={post.thumbnail} alt={post.title} />
                        </div>
                    )}
                    <h1 className="post-title">{post.title}</h1>
                    <div className="post-meta">
                        <div className="author">
                            {post.author?.avatar && (
                                <img src={post.author.avatar} alt={post.author.name} className="author-avatar" />
                            )}
                            <span className="author-name">{post.author?.name}</span>
                        </div>
                        <div className="post-date">
                            {post.createdAt && format(new Date(post.createdAt), 'MMMM dd, yyyy')}
                        </div>
                    </div>
                </div>

                <div className="post-content">
                    {post.content}
                </div>

                <div className="comments-section">
                    <h3>Comments</h3>
                    <div className="comments-list">
                        {post.comments?.map((comment) => (
                            <div key={comment.id} className="comment">
                                <div className="comment-header">
                                    <div className="comment-author">
                                        {comment.author?.avatar && (
                                            <img src={comment.author.avatar} alt={comment.author.name} className="comment-author-avatar" />
                                        )}
                                        <span className="comment-author-name">{comment.author?.name}</span>
                                    </div>
                                    <div className="comment-date">
                                        {format(new Date(comment.createdAt), 'MMM dd, yyyy')}
                                    </div>
                                </div>
                                <div className="comment-content">
                                    {comment.content}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="add-comment">
                        <h4>Add a Comment</h4>
                        <form onSubmit={handleCommentSubmit}>
                            <div className="mb-3">
                            <textarea
                                className="form-control comment-textarea border border-dark"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write your comment..."
                                rows="4"
                            ></textarea>
                            </div>
                            <button type="submit" className="btn btn-dark comment-submit">
                                Post Comment
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SinglePost;