import axios from "axios";

const SERVER_URL = 'http://localhost:8000/api'

// Get All Blogs
// Get http://localhost:8000/api/blogs
export const getAllBlogs = () => {
    const url = `${SERVER_URL}/blogs`
    return axios.get(url)
}

// Get contact with Blog ID
// Get http://localhost:8000/api/blogs/:blogId
export const getBlog = (blogId) => {
    const url = `${SERVER_URL}/blogs/${blogId}`
    return axios.get(url)
}

// Get All Users
// Get http://localhost:8000/api/users
export const getAllUsers = () => {
    const url = `${SERVER_URL}/users`
    return axios.get(url)
}

// Get All Blogs
// Get http://localhost:8000/api/users/:userId
export const getUser = (userId) => {
    const url = `${SERVER_URL}/users/${userId}`
    return axios.get(url)
}

// Create new Blog
// Post http://localhost:8000/api/blogs
export const createBlog = (blog) => {
    const url = `${SERVER_URL}/blogs`
    return axios.post(url, blog)
}

// Update Blog
// Put http://localhost:8000/api/blogs/:blogId
export const updateBlog = (blog, blogId) => {
    const url = `${SERVER_URL}/blogs/${blogId}`
    return axios.put(url, blog)
}

// Delete Blog
// Delete http://localhost:8000/api/blogs/:blogId
export const deleteBlog = (blogId) => {
    const url = `${SERVER_URL}/blogs/${blogId}`
    return axios.delete(url)
}

// Create new User
// Post http://localhost:8000/api/users
export const createUser = (user) => {
    const url = `${SERVER_URL}/users`
    return axios.post(url, user)
}

// Delete User
// Delete http://localhost:8000/api/users/:userId
export const deleteUser = (userId) => {
    const url = `${SERVER_URL}/users/${userId}`
    return axios.delete(url)
}
