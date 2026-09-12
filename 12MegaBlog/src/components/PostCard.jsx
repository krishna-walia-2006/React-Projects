import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

function PostCard({ $id, title, featuredimage }) {
    return (
        <Link to={`/post/${$id}`} className="group block">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--color-hairline)] bg-black/5">
                <img
                    src={appwriteService.getFilePreview(featuredimage)}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
            </div>
            <h2 className="mt-3 text-[15px] font-medium leading-snug text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
                {title}
            </h2>
        </Link>
    );
}

export default PostCard;
