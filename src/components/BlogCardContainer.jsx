import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { getPosts } from '../services/firebase/firebase';
import { useRedux } from '../hooks/useRedux';
import { Empty } from 'antd';
import BlogCard from './BlogCard';
import { useSelector } from 'react-redux';

const BlogCardContainer = () => {
    console.count('BlogCardContainer');

    const posts = useSelector(state => state.posts.allPosts);

    const fetchData = useCallback(async () => {
        await getPosts();
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const postsList = useMemo(() => {
        return posts.map((post) => (
            <BlogCard key={post.postId} post={post} />
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