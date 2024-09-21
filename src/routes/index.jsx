import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import App from "../App.jsx";
import SingleBlogPage from "../components/SingleBlogPage.jsx";
import CreateBlogForm from "../components/CreateBlogForm.jsx";
import EditBlogForm from "../components/EditBlogForm.jsx";
import UsersList from "../components/UsersList.jsx";
import UserPage from "../components/UserPage.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <h3 className="text-center">🤗 متأسفانه چیزی یافت نشد</h3>,
        children: [
            {
                path: "/",
                element: <App/>
            },
            {
                path: '/blogs/:blogId',
                element: <SingleBlogPage />
            },
            {
                path: '/blogs/create-blog',
                element: <CreateBlogForm />
            },
            {
                path: '/editBlog/:blogId',
                element: <EditBlogForm />
            },
            {
                path: '/users',
                element: <UsersList />
            },
            {
                path: '/users/:userId',
                element: <UserPage />
            }
        ]
    }
])