import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";

import pic from "../assets/a_branch_with_pink_flowers.jpg";
import {Link} from "react-router-dom";

function PostCard({ id, title, content }) {
    return (
        <div className="card" style={{ width: "20rem" }}>
            <img src={pic} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{content.length <= 200 ? content : content.substring(0, 200) + "..."}</p>
                <Link to={`/posts/${id}`} className="btn btn-dark">
                    Read More
                </Link>
            </div>
        </div>
    );
}

export default PostCard;
