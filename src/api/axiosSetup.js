import axiosInstance, { setAuthToken } from "./api";

import axios from "axios";

let isRefreshing = false; // Flag for preventing multiple refresh requests
let failedQueue = []; // Holds multiple pending requests that were waiting for the accessToken to be refreshed

// Processes each pending request in failedQueue
// If accessToken is refreshed, then this function resolves each pending requests with the token
// Else it rejects them with error
const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// This intercepts any failed response
// If we get res.status == 401 Unauthorized then it tries refreshing authToken
// Otherwise just through the error
axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
        // Keep the original response
        const originalRequest = error.config;
        console.log(originalRequest);

        // If the response was an Unauthorization(401) error and no retry happended
        // then check if the token is refreshing or not
        if (error.response?.status == 401 && !originalRequest._retry) {
            // If already refreshing then push the failed request to queue
            // When refresh completes we retry this request with the new token
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                    originalRequest.headers["Authorization"] =
                        `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                });
            }
        }

        // This prevents the retrying infinitely
        originalRequest._retry = true;
        isRefreshing = true;

        // Try refreshing the token
        // If not possible then send the original error
        try {
            const response = await axiosInstance.get("/api/users/refresh-token", {
                withCredentials: true,
            });

            // Set the new access token as token
            const newAccessToken = response.data.accessToken;
            setAuthToken(newAccessToken);

            // Try replaying all failed request with the new token
            processQueue(null, newAccessToken);

            // Retry the original failed request
            return axiosInstance(originalRequest);
        } catch (err) {
            // Tell all failed request that the refreshing failed
            processQueue(err, null);
            return Promise.reject(err);
        } finally {
            // Reset the flag
            isRefreshing = false;
        }
        return Promise.reject(error);
    }
);
