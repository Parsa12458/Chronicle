export function useReplyCount({ replies, comments }) {
  return replies.reduce((total, reply) => {
    const nestedReplies = comments.filter(
      (c) => c.parentCommentId === reply.id
    );
    const nestedCount = nestedReplies.reduce((nestedTotal, nestedReply) => {
      return (
        nestedTotal +
        1 +
        comments.filter((c) => c.parentCommentId === nestedReply.id).length
      );
    }, 0);

    return total + 1 + nestedCount;
  }, 0);
}
