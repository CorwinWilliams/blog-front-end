import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import NewPost from "./NewPost";
import Read from "./Read.js";
import Layout from "./Layout";

const myRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/newPost",
                element: <NewPost />,
            },
            {
                path: "/read/:id",
                element: <Read />,
            },
        ],
    },
    // {
    // 	path: "/admin",
    // 	element: <AdminLayout />,
    // 	children: [
    // 		{ path: "/setPassword", element: <SetPassword /> },
    // 		{ path: "/profile", element: <Profile /> },
    // 	],
    // },
]);

function App() {
    return (
        <div className="App">
            <RouterProvider router={myRoutes} />
        </div>
    );
}

export default App;
