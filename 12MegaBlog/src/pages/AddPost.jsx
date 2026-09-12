import { Container, PostForm } from "../components";

function AddPost() {
    return (
        <div className="w-full py-10">
            <Container>
                <h1 className="mb-8 text-[28px] font-semibold tracking-tight">
                    New post
                </h1>
                <PostForm />
            </Container>
        </div>
    );
}

export default AddPost;
