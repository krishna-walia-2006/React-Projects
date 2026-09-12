import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userid === userData.$id : false;

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

    const deletePost = () => {
        if (!window.confirm("Delete this post? This can't be undone.")) return;

        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredimage);
                navigate("/");
            }
        });
    };

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
                <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-[var(--color-hairline)] bg-black/5">
                    <img
                        src={appwriteService.getFilePreview(post.featuredimage)}
                        alt={post.title}
                        className="h-full w-full object-cover"
                    />

                    {isAuthor && (
                        <div className="absolute right-4 top-4 flex gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button variant="secondary" className="bg-white/90 backdrop-blur">
                                    Edit
                                </Button>
                            </Link>
                            <Button variant="danger" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                <h1 className="mb-6 max-w-3xl text-[32px] font-semibold leading-tight tracking-tight sm:text-[40px]">
                    {post.title}
                </h1>

                <div className="browser-css max-w-3xl">{parse(post.content)}</div>
            </Container>
        </div>
    ) : null;
}
