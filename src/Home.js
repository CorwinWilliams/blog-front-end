import { useState, useEffect } from "react";
import Post from "./Post";
import { Link } from "react-router-dom";
import APIURL from "./APIURL";

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const makeAPICall = async () => {
            const response = await fetch("http://localhost:3011/posts");
            const data = await response.json();
            setPosts(data.posts);
            console.log(data.post);
        };
        makeAPICall();
    }, []);
    const searchPosts = async (event) => {
        event.preventDefault();
        const response = await fetch(`${APIURL}/postsSearch`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: event.target.elements.searchInput.value,
            }),
            method: "POST",
        });
        //25 Parse the data
        const data = await response.json();
        //26 Use the data to set that into state
        setPosts(data.posts);
        // console.log(data.posts);
    };

    return (
        <div>
            {/* Remove container div & h1 */}

            <form onSubmit={searchPosts}>
                <input
                    type="text"
                    id="searchInput"
                    className="form-control"
                ></input>
                <button type="submit" className="form-control">
                    Search
                </button>
            </form>

            <div id="posts" className="row">
                {!posts ? (
                    <p>No posts yet...</p>
                ) : (
                    // 27 Loop over each of the posts
                    posts.map((eachPost) => {
                        // 28 Make the Post component show for each post from the DB
                        //and pass the post info in a prop called data
                        return <Post key={eachPost.id} data={eachPost} />;
                    })
                )}
            </div>
            {/* <!-- end of posts row--> */}
            <div id="actionLinks">
                <Link to="/newPost">New Post</Link>
            </div>
        </div>
    );
};

export default Home;
