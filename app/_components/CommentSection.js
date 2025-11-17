"use client";

import { useQuery } from "@tanstack/react-query";
import CommentItem from "./CommentItem";
import { getBlogComments, getCommentsLikes } from "../_lib/data-service";
import Button from "./Button";
import AddCommentForm from "./AddCommentForm";
import { FaArrowRight } from "react-icons/fa6";

function CommentSection({ blogId, currentUser, authorized }) {
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
    <>
      {authorized ? (
        <div className="flex flex-col mt-6 w-full">
          <span className="text-sm font-semibold mb-1.5">
            {comments.length} comments have been posted — what’s your take?
          </span>
          <AddCommentForm blogId={blogId} userId={currentUser.id} />
        </div>
      ) : (
        <div className="italic w-full bg-primary py-12 rounded px-16 text-background flex flex-col items-center mt-6 text-center gap-3 mb-10">
          <h3 className="text-3xl">Join our community</h3>
          <p className="text-lg max-w-lg">
            Read, comment, and connect with authors who care about clarity,
            depth, and good design.
          </p>
          <Button
            bgColor="background"
            textColor="darkGreen"
            additionalClasses="flex items-center gap-2 not-italic mt-4"
            href="/signup"
          >
            <span>Get Started</span>
            <FaArrowRight className="fill-darkGreen" />
          </Button>
        </div>
      )}
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
    </>
  );
}

export default CommentSection;
