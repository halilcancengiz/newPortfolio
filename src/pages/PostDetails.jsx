import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import { useRedux } from "../hooks/useRedux";
import { getPostById } from "../services/firebase/firebase";
import { CommentsContainer } from "../components/CommentsContainer";
import { AddComment } from "../components/AddComment";

export const PostDetails = () => {
  const params = useParams();
  const { currentPost } = useRedux();

  useEffect(() => {
    if (params.title) {
      getPostById(params.title);
    }
  }, [params.title]);
  return (
    <>
      <div className="min-h-screen min-w-screen max-w-[1000px] mx-auto text-white">
        {currentPost && (
          <ReactMarkdown
            key={currentPost.postId}
            className="w-full h-full overflow-x-hidden overflow-auto p-10"
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
                <div className="mx-auto">
                  <img
                    className="mb-5 mx-auto max-w-[50%] object-contain"
                    {...props}
                  />
                </div>
              ),
            }}
          />
        )}

        <CommentsContainer />
      </div>
    </>
  );
};
