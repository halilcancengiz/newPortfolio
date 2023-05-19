import React, { memo, useCallback, useEffect, useState } from "react";
import authorImg from "../assets/images/author.jpeg";
import { AiOutlineClockCircle, FaRegComments, AiFillEye } from "../assets/icon";
import { NavLink } from "react-router-dom";
import { dateTimeFormat } from "../utils/dateTimeFormatHelper";
import { getPostImageFromStorage, updateReadingCount } from "../services/firebase/firebase";
import { Image, Tooltip } from "antd";
import { calculateReadingTime } from "../utils/calculateReadingTimeHelper";


const BlogCard = ({ post }) => {
  console.count("blogcard rendered")
  const [image, setImage] = useState("");
  const { postId } = post;

  const fetchImageURL = useCallback(async () => {
    const url = await getPostImageFromStorage(postId);
    setImage(url);
  }, [postId]);

  useEffect(() => {
    fetchImageURL();
  }, [fetchImageURL()]);

  return (
    <>
      {post && (
        <div
          // style={{ boxShadow: "0 0 10px rgba(29, 144, 244, .2)" }}
          className={`bg-black-400 overflow-hidden flex rounded-lg items-center justify-center mb-10 max-w-[1000px] mx-auto md:flex-row xs:flex-col `}
        >
          <div
            id="last-posts"
            className="overflow-hidden xs:w-full md:max-w-[50%] w-full flex items-center justify-center"
          >
            <Image
              className="aspect-[4/2]  p-5 object-cover drop-shadow-green-btn transition-all bg-center duration-500"
              src={image}
              alt=""
            />
          </div>
          <div className="md:w-1/2 md:pl-2 md:h-auto md:justify-between lg:pl-0 lg:w-full xs:w-full flex flex-col lg:text-base xs:text-sm ">
            <div className="w-full max-h-[320px] my-auto px-5 flex flex-col md:justify-around ">
              <div className="flex flex-col max-h-[320px]  ">
                <h3 className="line-clamp-1 text-white lg:text-lg xs:text-base font-bold mt-2 capitalize ">
                  {post.postTitle}
                </h3>
                <div className="flex items-center justify-between my-1">
                  <Tooltip title="Tahmini Okuma Süresi">
                    <div className="flex items-center my-1">
                      <AiOutlineClockCircle
                        className="text-blue-btn mr-2"
                        size={16}
                      />
                      <span className="text-xs italic">{calculateReadingTime(post.content)}</span>
                    </div>
                  </Tooltip>
                  <Tooltip title="Görüntülenme">
                    <div className="flex items-center my-1">
                      <AiFillEye className="text-blue-btn mr-2" size={16} />
                      <span className="text-xs italic">{post.readingCount}</span>
                    </div>
                  </Tooltip>
                  <Tooltip title="Yorum">
                    <div className="flex items-center my-1">
                      <FaRegComments className="text-blue-btn mr-2" size={16} />
                      <span className="text-xs italic">
                        {post.comments.length}
                      </span>
                    </div>
                  </Tooltip>
                </div>
                <p className="line-clamp-3 sm:text-justify xs:text-left tracking-tighter">
                  {post.metaDescription}
                </p>
              </div>

              <div className="w-full  flex sm:items-center xs:items-start xs:flex-col sm:flex-row justify-between my-5 sm:gap-10 xs:gap-4">
                <div className="sm:w-1/2 xs:w-full flex items-center">
                  <div className="w-8 h-8 mr-2">
                    <img
                      src={authorImg}
                      id="author-image"
                      className="h-full w-full rounded-full  object-fit flex items-center justify-center "
                      alt="author"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span
                      id="author-name"
                      className="text-xs  italic whitespace-nowrap text-blue-btn"
                    >
                      Halil Can Cengiz
                    </span>
                    <span className="text-xs italic w-full whitespace-nowrap ">
                      {dateTimeFormat(post.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="xs:w-full sm:max-w-1/3  xs:min-w-[125px] flex justify-end h-8  rounded-full group">
                  <NavLink
                    onClick={() => updateReadingCount(post.postId)}
                    to={`/post/${post.postTitle.replace(/\s+/g, "-")}`}
                    className="w-full h-full text-sm relative font-bold overflow-hidden flex items-center justify-center group border border-blue-btn sm:max-w-[125px] rounded-xl xs:max-w-none transition-all duration-500 hover:bg-blue-btn hover:bg-opacity-30"
                  >
                    Read More
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(BlogCard);
