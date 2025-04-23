import axiosInstance from "./api.js";

export const getAuthorPosts = async () => {
    const response = await axiosInstance("http://localhost:3000/api/posts/authorPost");
    return response.data.authorPosts;
};

export const getPosts = async () => {
    const response = await axiosInstance("http://localhost:3000/api/posts/");
    return response.data.publishedPosts;
}

export const getSinglePost = async (id) => {
    const response = await axiosInstance(`http://localhost:3000/api/posts/${id}`);
    return response.data.post;
}