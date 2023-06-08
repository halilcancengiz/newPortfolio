import { useMemo } from 'react';

const useSortedReplies = (replies, showReply) => {
    const sortedReplies = useMemo(() => {
        if (replies.length > 0 && showReply) {
            return replies
                .slice()
                .sort((a, b) => {
                    const aDate = a.updatedAt || a.createdAt;
                    const bDate = b.updatedAt || b.createdAt;
                    return new Date(bDate) - new Date(aDate);
                });
        }
        return [];
    }, [replies, showReply]);

    return sortedReplies;
};

export default useSortedReplies;