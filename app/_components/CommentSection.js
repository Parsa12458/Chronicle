"use client";

import { useQuery } from "@tanstack/react-query";
import CommentItem from "./CommentItem";
import { getBlogComments } from "../_lib/data-service";

const commentLikes = [
  {
    userId: "user_003",
    commentId: "comment_001",
  },
  {
    userId: "user_001",
    commentId: "comment_002",
  },
  {
    userId: "user_004",
    commentId: "comment_003",
  },
  {
    userId: "user_005",
    commentId: "comment_004",
  },
  {
    userId: "user_002",
    commentId: "comment_005",
  },
  {
    userId: "user_003",
    commentId: "comment_006",
  },
  {
    userId: "user_001",
    commentId: "comment_007",
  },
  {
    userId: "user_004",
    commentId: "comment_008",
  },
  {
    userId: "user_005",
    commentId: "comment_008",
  },
];

function CommentSection({ blogId }) {
  // Fetch comments
  const { data: comments = [] } = useQuery({
    queryKey: ["blogComments", blogId],
    queryFn: () => getBlogComments(blogId),
    staleTime: 10000,
  });

  // Fetch users commented
  const usersIds = [...new Set(comments?.map((comment) => comment.userId))];
  const { data: users = [] } = useQuery({
    queryKey: ["users", usersIds],
    queryFn: () => getUsersById(usersIds),
    staleTime: 10000,
  });

  return (
    <div className="mt-5">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          commentLikes={commentLikes}
          replies={comments.filter((c) => c.parentCommentId === comment.id)}
          comments={comments}
          users={users}
        />
      ))}
    </div>
  );
}

export default CommentSection;
