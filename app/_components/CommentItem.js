"use client";

import { FaHeart, FaRegHeart, FaReply } from "react-icons/fa6";
import { formatDate } from "../_lib/helper";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";
import InputTextarea from "./InputTextarea";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { likeComment, unlikeComment } from "../_lib/data-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "../_lib/validators";
import { addComment } from "../_lib/actions";
import toast from "react-hot-toast";

function CommentItem({
  comment,
  commentsLikes,
  replies,
  comments,
  users,
  currentUser,
  blogId,
}) {
  const queryClient = useQueryClient();

  // Handle showing and hiding replies
  const [repliesExpanded, setRepliesExpanded] = useState(false);

  // Handle user information
  const user = users.find((user) => user.id === comment.userId);

  // Showing length of all replies even nested ones
  const totalReplyCount = replies.reduce((total, reply) => {
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

  const commentsIds = comments.map((comment) => comment.id);
  const isLiked = commentsLikes.some(
    (like) => like.commentId === comment.id && like.userId === currentUser.id
  );

  // Like & Unlike optimisticly
  const mutation = useMutation({
    mutationFn: async (action) => {
      const payload = { commentId: comment.id, userId: currentUser.id };
      if (action === "like") return await likeComment(payload);
      return await unlikeComment(payload);
    },
    onMutate: async (action) => {
      await queryClient.cancelQueries({
        queryKey: ["commentLikes", +blogId, commentsIds],
      });

      const previousLikes =
        queryClient.getQueryData(["commentLikes", +blogId, commentsIds]) || [];

      const payload = { commentId: comment.id, userId: currentUser.id };
      const updatedLikes =
        action === "like"
          ? [...previousLikes, payload]
          : previousLikes.filter(
              (like) =>
                !(
                  like.commentId === payload.commentId &&
                  like.userId === payload.userId
                )
            );

      queryClient.setQueryData(
        ["commentLikes", +blogId, commentsIds],
        updatedLikes
      );

      return { previousLikes };
    },
    onError: (_error, _action, context) => {
      if (context?.previousLikes) {
        queryClient.setQueryData(
          ["commentLikes", +blogId, commentsIds],
          context.previousLikes
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["commentLikes", +blogId, commentsIds],
      });
    },
  });

  const handleToggleLike = () => {
    mutation.mutate(isLiked ? "unlike" : "like");
  };

  // Handle Replying
  const [isReplyInputVisible, setIsReplyInputVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(commentSchema),
  });

  async function onSubmit(data) {
    const formData = new FormData();
    formData.append("blogId", data.blogId);
    formData.append("userId", data.userId);
    formData.append("content", data.content);
    formData.append("parentCommentId", data.parentCommentId);

    const result = await addComment(formData);

    if (result.success) {
      toast.success("Your comment is succesfully submitted!");
      setIsReplyInputVisible(false);
    }

    if (result.errorType === "server") {
      toast.error(result.error.message || "Something went wrong!");
    }
  }

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2.5">
        {user?.avatar ? (
          <Image
            className="w-8 h-8 aspect-square rounded-full object-center object-cover"
            src={user.avatar}
            alt={`${user.fullName} avatar`}
            width={32}
            height={32}
          />
        ) : (
          <FaUserCircle size={32} className="fill-primary" />
        )}
        <span className="text-sm font-semibold">{user.fullName}</span>
        <span className="text-xs text-primary">
          {formatDate(comment.createdAt)}
        </span>
      </div>

      <div className="ml-4 mt-1 pl-6 pb-3 border-l border-l-primary/50">
        <p className="text-sm">{comment.content}</p>

        <div className="flex items-center gap-2.5 mt-3">
          <button className="cursor-pointer">
            <FaReply
              className="fill-primary"
              onClick={() => setIsReplyInputVisible((visible) => !visible)}
            />
          </button>

          <button
            onClick={handleToggleLike}
            className="flex items-center gap-1 cursor-pointer"
          >
            {isLiked ? (
              <FaHeart className="fill-primary" />
            ) : (
              <FaRegHeart className="fill-primary" />
            )}
            <span className="text-sm text-primary">
              {commentsLikes.filter((l) => l.commentId === comment.id).length}
            </span>
          </button>

          {replies.length !== 0 && (
            <button
              className="text-xs font-medium flex items-center gap-0.5 cursor-pointer ml-1"
              onClick={() => setRepliesExpanded((r) => !r)}
            >
              {repliesExpanded ? "Hide" : "Show"} {totalReplyCount} replies
              {repliesExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
          )}
        </div>
        {isReplyInputVisible && (
          <form
            className="flex flex-col w-1/2 mt-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input type="hidden" {...register("blogId")} value={blogId} />
            <input
              type="hidden"
              {...register("userId")}
              value={currentUser.id}
            />
            <input
              type="hidden"
              {...register("parentCommentId")}
              value={comment.id}
            />
            <InputTextarea
              placeholder="Write your reply here..."
              row={4}
              autoFocus={true}
              {...register("content")}
              error={errors.content?.message}
            />
            <div className="ml-auto mt-4 space-x-2 flex">
              <Button
                bgColor="background"
                textColor="darkGreen"
                borderColor="mediumGreen"
                onClick={() => setIsReplyInputVisible(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </div>
          </form>
        )}

        <AnimatePresence>
          {repliesExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeIn" }}
            >
              {replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  commentsLikes={commentsLikes.filter(
                    (like) => like.commentId === reply.id
                  )}
                  replies={comments.filter(
                    (c) => c.parentCommentId === reply.id
                  )}
                  comments={comments}
                  users={users}
                  currentUser={currentUser}
                  blogId={blogId}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CommentItem;
