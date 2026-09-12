import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "../conf/conf";

export default function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className="w-full">
            {label && (
                <label className="mb-1.5 block text-[13px] font-medium text-[var(--color-ink-soft)]">
                    {label}
                </label>
            )}

            <div className="overflow-hidden rounded-xl border border-[var(--color-hairline)]">
                <Controller
                    name={name || "content"}
                    control={control}
                    render={({ field: { onChange } }) => (
                        <Editor
                            apiKey={conf.tinymceApiKey}
                            initialValue={defaultValue}
                            init={{
                                initialValue: defaultValue,
                                height: 500,
                                menubar: true,
                                plugins: [
                                    "image",
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "help",
                                    "wordcount",
                                ],
                                toolbar:
                                    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                                content_style:
                                    "body { font-family:-apple-system,BlinkMacSystemFont,sans-serif; font-size:15px }",
                            }}
                            onEditorChange={onChange}
                        />
                    )}
                />
            </div>
        </div>
    );
}
