import React, { useEffect, memo } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import { getPostById } from "../services/firebase/firebase";
import CommentsContainer from "../components/CommentsContainer";
import { Helmet } from "react-helmet";
import { shallowEqual, useSelector } from "react-redux";



const PostDetails = () => {
  const { title } = useParams();
  const currentPost = useSelector(state => state.currentPost.value, shallowEqual)
  const user = useSelector(state => state.user.value, shallowEqual);

  useEffect(() => {
    if (title) {
      getPostById(title)
    }
  }, [title]);
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={currentPost.metaDescription} />
        <html lang="tr" />
        <link rel="canonical" href={window.location.href} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <main className="min-h-screen min-w-screen max-w-[1000px] mx-auto text-white">
        {currentPost && (
          <ReactMarkdown
            key={currentPost.postId}
            className="w-full h-full overflow-x-hidden overflow-auto p-10 "
            remarkPlugins={[remarkGfm]}
            children={currentPost.content}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    children={String(children).replace(/\n$/, "")}
                    style={atomOneDark}
                    wrapLines={true}
                    language={match[1]}
                    showLineNumbers={true}
                    startingLineNumber={1}
                    PreTag="div"
                  />
                ) : (
                  <code {...props} className={className}>
                    {children}
                  </code>
                );
              },
              h1: ({ node, ...props }) => (
                <h1 className="text-4xl mb-5 font-bold capitalize" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-3xl mb-5 font-bold capitalize" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-2xl mb-5 font-bold capitalize" {...props} />
              ),
              h4: ({ node, ...props }) => (
                <h4 className="text-lg mb-5 font-bold capitalize" {...props} />
              ),
              p: ({ node, ...props }) => (
                <article className="text-base inline-block max-w-full mb-5" {...props} />

              ),
              img: ({ node, ...props }) => (
                <div className="max-w-full mx-auto bg-red-400">
                  <img
                    className="mb-5 mx-auto  object-contain"
                    {...props}
                  />
                </div>
              ),
            }}
          />
        )}
        <CommentsContainer postId={currentPost.postId} isLoggedIn={user} />
      </main>
    </>
  );
};
export default memo(PostDetails); 