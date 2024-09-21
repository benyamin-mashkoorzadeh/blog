import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useEditBlogMutation, useGetBlogQuery} from "../api/apiSlice.js";

const EditBlogForm = () => {
    const {blogId} = useParams()

    const {data: blog} = useGetBlogQuery(blogId)
    const [updateBlog, {isLoading}] = useEditBlogMutation()

    const [title, setTitle] = useState(blog.title);
    const [content, setContent] = useState(blog.content);


    const navigate = useNavigate()

    if (!blog) {
        return (
            <section>
                <h2>پستی که دنبالش میگردید وجود ندارد🤗</h2>
            </section>
        )
    }

    const handleSubmitForm = async () => {
        const editedBlog = {
            id: blogId,
            date: blog.date,
            title,
            content,
            user: blog.user,
            reactions: {
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0
            }
        }
        if (title && content) {
            await updateBlog({...editedBlog})
            navigate(`/blogs/${blogId}`)
        }
    }

    const onTitleChange = (e) => setTitle(e.target.value)
    const onContentChange = (e) => setContent(e.target.value)

    return (
        <section>
            <h2>ویرایش پست</h2>
            <form autoComplete="off">
                <label htmlFor="blogTitle">عنوان پست : </label>
                <input type="text" id="blogTitle" name="blogTitle" value={title} onChange={onTitleChange}/>
                <label htmlFor="blogContent">محتوای اصلی : </label>
                <textarea id="blogContent" name="blogContent" value={content} onChange={onContentChange}/>
                <button type="button" onClick={handleSubmitForm}>ویرایش پست</button>
            </form>
        </section>

    )
}

export default EditBlogForm;
