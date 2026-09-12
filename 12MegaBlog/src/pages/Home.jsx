import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import heroGraphic from "../assets/hero.png";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        appwriteService.getPosts().then((response) => {
            if (response) {
                setPosts(response.documents);
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--color-hairline)] border-t-[var(--color-accent)]" />
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full">
                <Container>
                    <div className="flex flex-col items-center py-24 text-center">
                        <img
                            src={heroGraphic}
                            alt=""
                            className="animate-float-slow mb-10 w-40 sm:w-56"
                        />
                        <h1 className="animate-rise-in max-w-md text-[34px] font-semibold leading-tight tracking-tight sm:text-[42px]">
                            {authStatus ? "Write your first post" : "Ideas worth writing down"}
                        </h1>
                        <p
                            className="animate-rise-in mt-3 max-w-sm text-[16px] text-[var(--color-ink-soft)]"
                            style={{ animationDelay: "0.08s" }}
                        >
                            {authStatus
                                ? "Nothing published yet - start a new post and it'll show up here."
                                : "Sign in to read what's been published, or create an account to start writing."}
                        </p>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-10">
            <Container>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
