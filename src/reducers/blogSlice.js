import {createAsyncThunk, createEntityAdapter, createSelector, createSlice, nanoid} from "@reduxjs/toolkit";
import {createBlog, deleteBlog, getAllBlogs, updateBlog} from "../../server/blogsServices.js";

const blogAdaptor = createEntityAdapter({
    sortComparer: (a,b) => b.date.localeCompare(a.date),
})

// ids: [], entities: {} - They create into createEntityAdaptor automatically
const initialState = blogAdaptor.getInitialState({
    status: 'idle',
    error: null
})

// const initialState = {
//     blogs: [],
//     status: 'idle',
//     error: null
// }

export const fetchBlogs = createAsyncThunk('/blogs/fetchBlogs', async () => {
    const response = await getAllBlogs()
    return response.data
})

export const addNewBlog = createAsyncThunk('/blogs/addNewBlog', async initialBlog => {
    const response = await createBlog(initialBlog)
    return response.data
})

export const deleteApiBlog = createAsyncThunk('/blogs/deleteApiBlog', async initialBlogId => {
    await deleteBlog(initialBlogId)
    return initialBlogId
})

export const updateApiBlog = createAsyncThunk('/blogs/updateApiBlog', async initialBlog => {
    const response = await updateBlog(initialBlog, initialBlog.id)
    return response.data
})


const blogSlice = createSlice({
    name: 'blogs',
    initialState: initialState,
    reducers: {
        reactionAdded: (state, action) => {
            const {blogId, reaction} = action.payload
            const existingBlog = state.entities(blogId)

            if (existingBlog) {
                existingBlog.reactions[reaction]++
            }
        }

    },
    extraReducers: builder => {
        builder
            .addCase(fetchBlogs.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.status = "completed"
                // state.blogs = action.payload
                blogAdaptor.upsertMany(state, action.payload)
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(addNewBlog.fulfilled, (state, action) => {
                // state.blogs.push(action.payload)
                blogAdaptor.addOne(action.payload)
            })
            .addCase(deleteApiBlog.fulfilled, blogAdaptor.removeOne)
            .addCase(updateApiBlog.fulfilled, blogAdaptor.updateOne)
    }
})

// export const selectAllBlogs = state => state.blogs.blogs
//
// export const selectBlogById = (state, blogId) => state.blogs.blogs.find(blog => blog.id === blogId)

export const {selectAll : selectAllBlogs, selectById : selectBlogById, selectIds : selectBlogIds} = blogAdaptor.getSelectors(state => state.blogs)

export const selectUserBlogs = createSelector(
    [selectAllBlogs, (_, userId) => userId],
    (blogs, userId) => blogs.filter(blog =>blog.user === userId)
)
// selectUserBlogs(state, userId)

export const {blogAdded, blogUpdated, blogDeleted, reactionAdded} = blogSlice.actions
export default blogSlice.reducer;
