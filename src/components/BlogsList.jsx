import {Link, useNavigate} from "react-router-dom";
import ShowTime from "./ShowTime.jsx";
import ShowAuthor from "./ShowAuthor.jsx";
import ReactionButtons from "./ReactionButtons.jsx";
import Spinner from "./Spinner.jsx";
import {useGetBlogsQuery} from "../api/apiSlice.js";
import {useMemo} from "react";

const Blog = ({blog}) => {
    return (
        <>
            {
                    <article className="blog-excerpt">
                        <h3>{blog.title}</h3>

                        <div style={{marginTop: '10px', marginRight: '20px'}}>
                            <ShowTime timestamp={blog.date}/>
                            <ShowAuthor userId={blog.user}/>
                        </div>

                        <p className="blog-content">{blog.content.substring(0, 100)}</p>

                        <ReactionButtons blog={blog}/>

                        <Link to={`/blogs/${blog.id}`} className="button muted-button">
                            دیدن کامل پست
                        </Link>
                    </article>
            }
        </>
    )
}

const BlogsList = () => {
    const {data: blogs = [], isLoading, isSuccess, isError, error} = useGetBlogsQuery()
    const navigate = useNavigate()

    const sortedBlogs = useMemo(() => {
        const sortedBlogs = blogs.slice()
        sortedBlogs.sort((a, b) => b.date.localeCompare(a.date))
        return sortedBlogs
    }, [blogs]);

    let content;

    if (isLoading) {
        content = <Spinner text='بارگذاری...'/>
    } else if (isSuccess) {
        content = sortedBlogs.map((blog) => (
            <Blog blog={blog} key={blog.id} />
        ))
    } else if (isError) {
        content = <div>{error}</div>
    }
    return (
        <section className="blogs-list">
            <button style={{marginTop: '1em'}} className="full-button accent-button"
                    onClick={() => navigate('/blogs/create-blog')}>ساخت پست جدید
            </button>
            <h2>تمامی پست ها</h2>
            {content}
        </section>
    )
}

export default BlogsList;
