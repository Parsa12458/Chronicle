import { motion } from "framer-motion";
import CommentItem from "./CommentItem";

function CommentReplies({
  replies,
  commentsLikes,
  comments,
  users,
  currentUser,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2, ease: "easeIn" }}
    >
      {replies.map((reply) => (
        <CommentItem
          key={reply.id}
          comments={comments}
          comment={reply}
          commentsLikes={commentsLikes}
          users={users}
          currentUser={currentUser}
          blogId={reply.blogId}
        />
      ))}
    </motion.div>
  );
}

export default CommentReplies;
