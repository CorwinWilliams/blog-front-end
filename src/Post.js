import { Link } from "react-router-dom";

const Post = ({ data }) => {
    return (
        <div className="col-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{data.title}</h5>
                    <div className="card-text">
                        <div className="author">by {data.tagline}</div>
                        <div className="timestamp">
                            {new Date(data.updatedAt).toLocaleTimeString()}
                        </div>
                        <p>
                            {data.content.slice(0, 100)}
                            {data.content.length > 100 ? "..." : ""}
                        </p>
                    </div>
                    <Link
                        to={`read/${data.id}`}
                        className="btn btn-primary"
                    >
                        Read more
                    </Link>
                </div>
            </div>
            {/* <!-- end of my card--> */}
        </div>
    );
};

export default Post;
