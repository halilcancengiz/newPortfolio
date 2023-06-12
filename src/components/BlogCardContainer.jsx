import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { getPosts } from '../services/firebase/firebase';
import { Empty } from 'antd';
import BlogCard from './BlogCard';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const BlogCardContainer = () => {
    //reselect start
    const selectAllPosts = state => state.posts.allPosts;
    const postsSelector = createSelector(
        selectAllPosts,
        posts => posts
    );
    const posts = useSelector(postsSelector);
    //reselect end

    const fetchData = useCallback(async () => {
        await getPosts();
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const postsList = useMemo(() => {
        return posts.slice(0, 3).map((post, index) => (
            <BlogCard key={post.postId} post={post} index={index} />
        ));
    }, [posts]);

    return (
        <div className="col-span-full">
            {postsList.length > 0 ? (
                postsList
            ) : (
                <Empty description="No articles shared yet." />
            )}
        </div>
    );
}

export default memo(BlogCardContainer)