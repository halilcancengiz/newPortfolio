import { useSelector } from 'react-redux';

export const useRedux = () => {
    const user = useSelector(state => state.user.value)
    const posts = useSelector(state => state.posts.allPosts)
    const currentPost = useSelector(state => state.currentPost.value)

    return { user, posts, currentPost };
}
