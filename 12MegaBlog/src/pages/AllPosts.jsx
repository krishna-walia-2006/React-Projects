import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Bug fix: this call used to run directly in the render body (not
        // inside this effect), which set state on every render and caused
        // an infinite fetch loop.
        appwriteService.getPosts([]).then((response) => {
            if (response) {
                setPosts(response.documents);
            }
            setLoading(false);
        });
    }, []);

    return (
        <div className="w-full py-10">
            <Container>
                <h1 className="mb-8 text-[28px] font-semibold tracking-tight">All posts</h1>

                {loading ? (
                    <div className="flex justify-center py-16">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--color-hairline)] border-t-[var(--color-accent)]" />
                    </div>
                ) : posts.length === 0 ? (
                    <p className="text-[15px] text-[var(--color-ink-soft)]">
                        No posts yet.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default AllPosts;
