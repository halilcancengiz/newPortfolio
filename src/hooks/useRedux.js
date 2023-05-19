import { shallowEqual, useSelector } from 'react-redux';

export const useRedux = () => {
    const currentPost = useSelector(state => state.currentPost.value, shallowEqual, shallowEqual)
    const postComments = useSelector(state => state.postComments.value, shallowEqual);
    const user = useSelector(state => state.user.value, shallowEqual);
    const posts = useSelector(state => state.posts.allPosts, shallowEqual);

    return { user, posts, currentPost, postComments };
}
