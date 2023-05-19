import { Collapse } from "antd";
import { useRedux } from "../hooks/useRedux";
import { useEffect, useState } from "react";
import { getPosts } from "../services/firebase/firebase";
import { NavLink } from "react-router-dom";
import SlideAnimation from "../components/motion/SlideAnimation";
const { Panel } = Collapse;

export const AllPosts = () => {
  const { posts } = useRedux();
  const [search, setSearch] = useState("");
  const [filteredList,setFilteredList]=useState(posts ?? null)

  useEffect(() => {
    getPosts();
    setFilteredList(posts.filter((post) => post.postTitle.toLowerCase().includes(search.toLowerCase().trim())))
  }, [search]);

  return (
    <SlideAnimation>
      <div className="w-full flex items-center justify-center py-5 text-center my-10 drop-shadow-dark-btn ">
        <h6 className="header-stroke lg:text-4xl sm:text-3xl xs:text-2xl text-center uppercase">
          ALL POSTS
        </h6>
      </div>
      <div className="max-w-[1300px] mx-auto px-5 ">
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="w-full h-[46px] rounded-2xl px-5 mb-3 outline-none"
          type="text"
          placeholder="Search Post"
        />
      </div>
      <div className="max-w-[1300px] mx-auto px-5 flex flex-col gap-3">
        {posts &&
          filteredList.map((post) => (
            <Collapse
              className="glassmorphism"
              key={post.postId}
              defaultActiveKey={["1"]}
            >
              <Panel
                className="flex flex-col border-0"
                header={post.postTitle.toUpperCase()}
              >
                <p className="mb-5">{post.metaDescription}</p>
                <div className="w-full flex justify-end">
                  <NavLink
                    className="bg-blue-btn text-white h-8 px-5 rounded-xl flex items-center justify-center capitalize"
                    to={`/post/${post.postTitle.replace(/\s+/g, "-")}`}
                  >
                    incele
                  </NavLink>
                </div>
              </Panel>
            </Collapse>
          ))}
      </div>
    </SlideAnimation>
  );
};
