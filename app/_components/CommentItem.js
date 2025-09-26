"use client";

import { FaHeart, FaRegHeart, FaReply } from "react-icons/fa6";
import { formatDate } from "../_lib/helper";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { startTransition, useOptimistic, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";
import InputTextarea from "./InputTextarea";

const users = [
  {
    id: "user_001",
    fullName: "Parsa Nikzad",
  },
  {
    id: "user_002",
    fullName: "Sara Jafari",
  },
  {
    id: "user_003",
    fullName: "Ali Rezaei",
  },
  {
    id: "user_004",
    fullName: "Niloofar Khosravi",
  },
  {
    id: "user_005",
    fullName: "Reza Mohammadi",
  },
];

function CommentItem({ comment, commentLikes, replies, comments }) {
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

  // Like & Unlike with useOptimistic
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    commentLikes,
    (state, newLike) => {
      if (newLike.action === "like") {
        return [...state, newLike.payload];
      } else {
        return state.filter(
          (like) =>
            !(
              like.commentId === newLike.payload.commentId &&
              like.userId === newLike.payload.userId
            )
        );
      }
    }
  );
  const isLiked = optimisticLikes.some(
    (like) => like.commentId === comment.id && like.userId === user.id
  );
  function handleToggleLike() {
    const payload = {
      commentId: comment.id,
      userId: user.id,
      createdAt: new Date().toISOString(),
    };

    startTransition(() => {
      if (isLiked) {
        setOptimisticLikes({ action: "unlike", payload });
        // Supabase request
      } else {
        setOptimisticLikes({ action: "like", payload });
        // Supabase request
      }
    });
  }

  // Handle Replying
  const [isReplyInputVisible, setIsReplyInputVisible] = useState(false);

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2.5">
        <div className="bg-primary w-8 aspect-square rounded-full"></div>
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
              {optimisticLikes.filter((l) => l.commentId === comment.id).length}
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
          <form className="flex flex-col w-1/2 mt-5">
            <InputTextarea
              placeholder="Write your reply here..."
              row={4}
              autoFocus={true}
            />
            <div className="ml-auto mt-4 space-x-2">
              <Button>Submit</Button>
              <Button
                bgColor="background"
                textColor="darkGreen"
                borderColor="mediumGreen"
                onClick={() => setIsReplyInputVisible(false)}
              >
                Cancel
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
                  commentLikes={commentLikes.filter(
                    (like) => like.commentId === reply.id
                  )}
                  replies={comments.filter(
                    (c) => c.parentCommentId === reply.id
                  )}
                  comments={comments}
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
