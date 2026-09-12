import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [submitting, setSubmitting] = useState(false);

    const submit = async (data) => {
        setSubmitting(true);
        try {
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    appwriteService.deleteFile(post.featuredimage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredimage: file ? file.$id : post.featuredimage,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    data.featuredimage = file.$id;
                    const dbPost = await appwriteService.createPost({
                        ...data,
                        userid: userData.$id,
                    });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } finally {
            setSubmitting(false);
        }
    };

    const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-")
            .replace(/-+$/, "")
            .slice(0, 36)
            .replace(/-+$/, "");

    return "";
}, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-8 lg:flex-row">
            <div className="flex-1 space-y-5">
                <Input
                    label="Title"
                    placeholder="Give your post a title"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug"
                    placeholder="post-url-slug"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
            </div>

            <div className="w-full space-y-5 lg:w-72">
                <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-[var(--color-ink-soft)]">
                        Featured image
                    </label>
                    {post && (
                        <div className="mb-3 aspect-video overflow-hidden rounded-xl border border-[var(--color-hairline)] bg-black/5">
                            <img
                                src={appwriteService.getFilePreview(post.featuredimage)}
                                alt={post.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        className="block w-full cursor-pointer rounded-xl border border-dashed border-[var(--color-hairline)] bg-white px-3.5 py-3 text-[13px] text-[var(--color-ink-soft)] transition-colors hover:border-[var(--color-accent)] file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-black/5 file:px-3 file:py-1.5 file:text-[13px] file:font-medium file:text-[var(--color-ink)]"
                        {...register("image", { required: !post })}
                    />
                </div>

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    {...register("status", { required: true })}
                />

                <Button
                    type="submit"
                    variant={post ? "secondary" : "primary"}
                    className="w-full"
                    disabled={submitting}
                >
                    {submitting ? "Saving…" : post ? "Update post" : "Publish post"}
                </Button>
            </div>
        </form>
    );
}
