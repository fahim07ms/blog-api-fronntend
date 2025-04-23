import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import PostCard from "./PostCard";

import { useState, useEffect } from "react";
import React from "react";

import {useAuth} from "../context/AuthContext";
import { getPosts, getAuthorPosts } from "../api/utils";

function PostBoard() {
    const [posts, setPosts] = useState([]);
    const {isAuthenticated} = useAuth();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const retrievedPosts = isAuthenticated ? await getAuthorPosts() : await getPosts();
                setPosts(retrievedPosts);
            } catch (error) {
                console.error("Failed to fetch posts.", error);
                setPosts([]);
            }
        }

        fetchPosts();
    }, [isAuthenticated]);

    return (
        <>
            <div className="post-board">
                {posts &&
                    posts.map((post) => {
                        if (post) {
                            return (
                                <PostCard
                                    key={post.id}
                                    id={post.id}
                                    title={post.title}
                                    content={post.content}
                                />
                            );
                        } else {
                            return <></>;
                        }
                    })
                }
            </div>
        </>
    );
}

export default PostBoard;
