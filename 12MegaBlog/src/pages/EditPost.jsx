import { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
                setLoading(false);
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    if (loading) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--color-hairline)] border-t-[var(--color-accent)]" />
            </div>
        );
    }

    return post ? (
        <div className="w-full py-10">
            <Container>
                <h1 className="mb-8 text-[28px] font-semibold tracking-tight">
                    Edit post
                </h1>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}

export default EditPost;
