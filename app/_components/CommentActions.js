"use client";

import { FaHeart, FaRegHeart, FaReply } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import CommentForm from "./CommentForm";
import { useState } from "react";
import CommentReplies from "./CommentReplies";
import { useCommentLikes } from "../_hooks/useCommentLikes";
import { useReplyCount } from "../_hooks/useReplyCount";
import { AnimatePresence } from "framer-motion";
import { useDeleteComment } from "../_hooks/useDeleteComment";
import toast from "react-hot-toast";

function CommentActions({
  comments,
  comment,
  commentsLikes,
  blogId,
  users,
  currentUser,
}) {
  // Handle Replying & Editing
  const [isReplyInputVisible, setIsReplyInputVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Handle showing and hiding replies
  const [repliesExpanded, setRepliesExpanded] = useState(false);

  // Calculating length of all replies
  const replies = comments.filter((c) => c.parentCommentId === comment.id);
  const totalReplyCount = useReplyCount({ replies, comments });

  // Handle Like & Unlike
  const isLiked = commentsLikes?.some(
    (like) => like.commentId === comment.id && like.userId === currentUser?.id,
  );
  const likeMutation = useCommentLikes({
    commentId: comment.id,
    userId: currentUser?.id,
    blogId,
  });
  const handleToggleLike = () => {
    if (!currentUser) {
      return toast.error("Please sign in to like this comment!");
    }
    likeMutation.mutate(isLiked ? "unlike" : "like");
  };

  // Handle deleting comments optimisticly
  const deleteMutation = useDeleteComment(blogId);
  function handleDelete() {
    deleteMutation.mutate(comment.id);
  }

  // Handle opening and closing comment form for replying
  function handleReplyClick() {
    if (!currentUser) {
      return toast.error("Please sign in to write comments!");
    }
    setIsEditing(false);
    setIsReplyInputVisible((visible) => !visible);
  }

  // Handle opening and closing comment form for editing
  function handleEditClick() {
    setIsEditing(true);
    setIsReplyInputVisible((visible) => !visible);
  }

  return (
    <>
      <div className="flex items-center gap-2.5 mt-3">
        <button className="cursor-pointer" onClick={handleReplyClick}>
          <FaReply className="fill-primary" />
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
            {commentsLikes?.filter((l) => l.commentId === comment.id).length}
          </span>
        </button>

        {currentUser?.id === comment.userId && (
          <div className="flex items-center gap-1">
            <button className="cursor-pointer" onClick={handleEditClick}>
              <MdEdit className="fill-primary" size={18} />
            </button>
            <button className="cursor-pointer" onClick={handleDelete}>
              <MdDelete className="fill-primary" size={18} />
            </button>
          </div>
        )}

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
      <AnimatePresence>
        {isReplyInputVisible && (
          <CommentForm
            comment={comment}
            prefillContent={isEditing ? comment.content : ""}
            setIsReplyInputVisible={setIsReplyInputVisible}
            isEditing={isEditing}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {repliesExpanded && (
          <CommentReplies
            comments={comments}
            commentsLikes={commentsLikes}
            currentUser={currentUser}
            replies={replies}
            users={users}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default CommentActions;
