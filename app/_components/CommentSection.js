"use client";

import { useQuery } from "@tanstack/react-query";
import CommentItem from "./CommentItem";
import { getBlogComments, getCommentsLikes } from "../_lib/data-service";

function CommentSection({ blogId, currentUser }) {
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

  // Fetch comments likes
  const commentsIds = comments.map((comment) => comment.id);
  const { data: commentsLikes } = useQuery({
    queryKey: ["commentLikes", +blogId],
    queryFn: () => getCommentsLikes(commentsIds),
    staleTime: 10000,
  });

  const topLevelComments = comments.filter(
    (comment) => !comment.parentCommentId
  );

  return (
    <div className="mt-5">
      {topLevelComments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          commentsLikes={commentsLikes}
          comments={comments}
          users={users}
          currentUser={currentUser}
          blogId={blogId}
        />
      ))}
    </div>
  );
}

export default CommentSection;
