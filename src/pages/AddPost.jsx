import React, { useState } from "react";
import { useRedux } from "../hooks/useRedux";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import { addPost, addPostImageToStorage } from "../services/firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";

export const AddPost = () => {
  const user = useSelector(state => state.user.value, shallowEqual);
  const navigate = useNavigate();

  const [postImage, setPostImage] = useState(null);
  const [post, setPost] = useState({
    id: uuidv4(),
    title: "",
    content: "",
    category: "",
    metaDescription: "",
  });

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleImage = async (e) => {
    const image = e.target.files[0];
    setPostImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      post.title.length <= 0 ||
      post.content.length <= 0 ||
      post.category.length <= 0 ||
      post.metaDescription.length <= 0 ||
      !postImage
    ) {
      toast.error("Lütfen Tüm alanları Doldurunuz");
    } else {
      await addPostImageToStorage(post.id, postImage);
      await addPost(post, user);

      toast.success("Post başarıyla gönderildi.");
      setPost({
        title: "",
        content: "",
        category: "",
        metaDescription: "",
      });
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="bg-transparent w-full min-h-screen px-10  ">
      <form
        onSubmit={handleSubmit}
        className="min-h-screen min-w-screen pt-3 mx-auto flex flex-col gap-10 items-center"
      >
        <div className="w-full flex items-center justify-center text-center drop-shadow-dark-btn ">
          <h6 className="header-stroke lg:text-4xl sm:text-3xl xs:text-2xl text-center uppercase">
            ADD POST
          </h6>
        </div>
        <div className="flex lg:flex-row xs:flex-col items-center flex-row w-full gap-10">
          <div className="flex flex-col lg:w-1/2 xs:w-full h-96  ">
            <span className="h-10 text-white py-10 flex items-center justify-center font-semibold text-xl uppercase">
              New Post
            </span>
            <textarea
              onChange={handleChange}
              name="content"
              value={post.content}
              className="w-full outline-none p-10 resize-none h-full rounded-2xl"
            ></textarea>
          </div>
          <div className="flex flex-col lg:w-1/2 xs:w-full h-96 ">
            <span className="h-10 text-white  py-10 flex items-center justify-center font-semibold text-xl uppercase">
              Preview
            </span>
            <ReactMarkdown
              className="w-full overflow-x-hidden overflow-auto p-10 bg-white h-full rounded-2xl"
              remarkPlugins={[remarkGfm]}
              children={post.content}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      {...props}
                      children={String(children).replace(/\n$/, "")}
                      style={atomOneDark}
                      language={match[1]}
                      PreTag="div"
                    />
                  ) : (
                    <code {...props} className={className}>
                      {children}
                    </code>
                  );
                },
                h1: ({ node, ...props }) => (
                  <h1 className="text-4xl mb-5 font-bold" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-3xl mb-5 font-bold" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-2xl mb-5 font-bold" {...props} />
                ),
                h4: ({ node, ...props }) => (
                  <h4 className="text-lg mb-5 font-bold" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="text-base flex max-w-full mb-5" {...props} />
                ),
                img: ({ node, ...props }) => (
                  <div className="flex items-center">
                    <img
                      className="mb-5 mx-auto max-w-[50%] object-contain"
                      {...props}
                    />
                  </div>
                ),
                em: ({ node, ...props }) => (
                  <em className="text-base mx-1" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="text-base mx-1" {...props} />
                ),
              }}
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex gap-2 flex-col">
            <div className="gap-5 flex">
              <input
                onChange={(e) => handleImage(e)}
                className="w-full py-2 px-5 text-white outline-none rounded-lg bg-transparent placeholder:text-white border-2"
                name="image"
                value={post.image}
                type="file"
                placeholder="Post Title"
              />
              <input
                onChange={handleChange}
                className="w-full py-2 px-5 text-white outline-none rounded-lg bg-transparent placeholder:text-white border-2"
                name="title"
                value={post.title}
                type="text"
                placeholder="Post Title"
              />
              <input
                onChange={handleChange}
                className="w-full py-2 px-5 text-white outline-none rounded-lg bg-transparent placeholder:text-white border-2"
                name="category"
                value={post.category}
                type="text"
                placeholder="Post Category"
              />
            </div>
            <div>
              <textarea
                onChange={handleChange}
                placeholder="Meta Description"
                className="rounded-lg text-white placeholder:text-white resize-none outline-none bg-transparent border-2 p-5 w-full h-20"
                name="metaDescription"
                value={post.metaDescription}
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center mt-2 py-2 px-20 uppercase justify-end bg-blue-btn"
          >
            Ekle
          </button>
        </div>
      </form>
    </div>
  );
};
