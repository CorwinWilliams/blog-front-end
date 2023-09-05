import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./Read.scss";
import APIURL from "./APIURL";
import { Buffer } from "buffer";

const Read = () => {
    const [post, setPost] = useState();
    // 31 Get the ID from the URL
    const { id } = useParams();
    const navigateTo = useNavigate();

    // console.log(timestamp);

    useEffect(() => {
        const makeAPICall = async () => {
            //33 When the page loads make an API call to get the specific ID from the DB
            const response = await fetch(`${APIURL}/post/${id}`);
            // 35 Parses data from #34 on backend
            const data = await response.json();
            //36 Sets into state
            setPost(data.post);

            console.log(data.post);
        };

        makeAPICall();
    }, [id]);

    const deletePost = async () => {
        if (window.confirm("Are you sure you want to delete?")) {
            await fetch(`${APIURL}/post/${id}`, { method: "DELETE" });
            navigateTo("/");
        }
    };

    const postComment = async (event) => {
        event.preventDefault();

        const response = await fetch(`${APIURL}/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                author: event.target.elements.author.value,
                content: event.target.elements.content.value,
                postID: id,
            }),
        });

        const data = await response.json();
        setPost({ ...post, comments: data.comments });
    };

    if (!post) {
        return <h1>Hold your 🐴</h1>;
    }

    return (
        <div id="read">
            <h2>{post.title}</h2>
            <h5>{post.author}</h5>
            <h6>{new Date(post.updatedAt).toLocaleString()}</h6>
            <hr />
            {post.image ? (
                <img
                    src={`data:${post.imageType};base64,${Buffer.from(
                        post.image.data
                    ).toString("base64")}`}
                    style={{ maxWidth: "100%" }}
                />
            ) : null}
            <p>{post.content}</p>
            <Link to="/">Return to Home</Link>
            <button className="btn btn-danger" onClick={deletePost}>
                Delete Post
            </button>

            <hr />
            <form onSubmit={postComment}>
                <label>Comment text:</label>
                <textarea id="content" className="form-control"></textarea>

                <label>Name:</label>
                <input type="text" id="author" className="form-control" />

                <button type="submit" className="btn btn-success">
                    Post
                </button>
            </form>
            <hr />
            {post.comments.map((comment) => {
                return (
                    <div key={comment.id}>
                        <h6>{comment.author}</h6>
                        <img
                            src={`/images/${comment.commentPicturePath}`}
                            style={{ height: 100 }}
                        />
                        <p>{comment.content}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default Read;
