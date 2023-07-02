import { Collapse } from "antd";
import { useEffect, useState } from "react";
import { getPosts } from "../services/firebase/firebase";
import { NavLink } from "react-router-dom";
import SlideAnimation from "../components/motion/SlideAnimation";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

export const AllPosts = () => {
  const selectGetAllPost = state => state.posts.allPosts;
  const getAllPostsSelector = createSelector(
    selectGetAllPost,
    posts => posts
  )
  const posts = useSelector(getAllPostsSelector);

  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState(posts ?? null)

  useEffect(() => {
    fetchGetAllPosts();
  }, []);

  const fetchGetAllPosts = async () => {
    await getPosts();
    filterPosts();
  }

  const filterPosts = () => {
    const filteredList = posts.filter((post) => post.postTitle.toLowerCase().includes(search.toLowerCase().trim()));
    setFilteredList(filteredList);
  };

  useEffect(() => {
    filterPosts();
  }, [search, posts]);


  return (
    <SlideAnimation>
      <div className="w-full flex items-center justify-center py-5 text-center my-10 drop-shadow-dark-btn ">
        <h6 className="header-stroke lg:text-4xl sm:text-3xl xs:text-2xl text-center uppercase">
          Tüm Gönderiler
        </h6>
      </div>
      <div className="max-w-[1300px] mx-auto px-5 ">
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="w-full h-[46px] rounded-2xl px-5 mb-3 outline-none"
          type="text"
          placeholder="Gönderi ara"
        />
      </div>
      <div className="max-w-[1300px] mx-auto px-5 flex flex-col gap-3">
        {
          posts && filteredList.map(post => (
            <Collapse
              key={post.postId}
              className="glassmorphism line-clamp-1"
              size="medium"
              items={[
                {
                  key: post.postId,
                  label: post.postTitle.toUpperCase(),
                  children:
                    <div >
                      <p className="mb-5">{post.metaDescription}</p>
                      <div className="w-full flex justify-end ">
                        <NavLink className="glassmorphism-button px-10 py-1" to={`/post/${post.postTitle.replace(/\s+/g, "-")}`}>
                          incele
                        </NavLink>
                      </div>
                    </div>
                },
              ]}
            />
          ))
        }
      </div>
    </SlideAnimation>
  );
};
