import CommentItem from "./CommentItem";

// We need comments in blog page too
const comments = [
  {
    id: "comment_001",
    createdAt: "2025-09-25T13:00:00.000Z",
    blogId: "blog_123",
    userId: "user_001",
    content:
      "This post was incredibly helpful! The section on scalable UI architecture really resonated with me, especially the way you broke down component isolation and reuse.",
    parentCommentId: null,
  },
  {
    id: "comment_002",
    createdAt: "2025-09-25T13:05:00.000Z",
    blogId: "blog_123",
    userId: "user_002",
    content:
      "Agreed! I also appreciated the metadata strategy. It’s rare to see such clean and extensible category mapping in blog platforms.",
    parentCommentId: "comment_001",
  },
  {
    id: "comment_003",
    createdAt: "2025-09-25T13:07:00.000Z",
    blogId: "blog_123",
    userId: "user_003",
    content:
      "Exactly! I’ve been struggling with nested category logic myself. This gave me a new perspective on how to structure it.",
    parentCommentId: "comment_002",
  },
  {
    id: "comment_004",
    createdAt: "2025-09-25T13:09:00.000Z",
    blogId: "blog_123",
    userId: "user_004",
    content:
      "Same here. I’m thinking of refactoring my taxonomy system to follow this model. It’s much more maintainable.",
    parentCommentId: "comment_003",
  },
  {
    id: "comment_005",
    createdAt: "2025-09-25T13:10:00.000Z",
    blogId: "blog_123",
    userId: "user_005",
    content:
      "Can someone explain the Quill Delta rendering part? I’ve used Quill before but never understood how to convert Delta to semantic HTML properly.",
    parentCommentId: null,
  },
  {
    id: "comment_006",
    createdAt: "2025-09-25T13:12:00.000Z",
    blogId: "blog_123",
    userId: "user_001",
    content:
      "Sure! Quill stores content as a Delta object, which is a structured JSON format. You can parse it and map it to semantic tags like <p>, <strong>, <ul> using a custom renderer or libraries like quill-delta-to-html.",
    parentCommentId: "comment_005",
  },
  {
    id: "comment_007",
    createdAt: "2025-09-25T13:14:00.000Z",
    blogId: "blog_123",
    userId: "user_003",
    content:
      "Thanks for the tip! I’ll check out that library. I’ve been manually converting it and it’s a pain.",
    parentCommentId: "comment_006",
  },
  {
    id: "comment_008",
    createdAt: "2025-09-25T13:15:00.000Z",
    blogId: "blog_123",
    userId: "user_002",
    content:
      "I think the category mapping could be even more dynamic. Maybe using a tag-based system with parent-child relationships and filters.",
    parentCommentId: null,
  },
];

const commentLikes = [
  {
    createdAt: "2025-09-25T13:06:00.000Z",
    userId: "user_003",
    commentId: "comment_001",
  },
  {
    createdAt: "2025-09-25T13:07:00.000Z",
    userId: "user_001",
    commentId: "comment_002",
  },
  {
    createdAt: "2025-09-25T13:08:00.000Z",
    userId: "user_004",
    commentId: "comment_003",
  },
  {
    createdAt: "2025-09-25T13:09:00.000Z",
    userId: "user_005",
    commentId: "comment_004",
  },
  {
    createdAt: "2025-09-25T13:11:00.000Z",
    userId: "user_002",
    commentId: "comment_005",
  },
  {
    createdAt: "2025-09-25T13:13:00.000Z",
    userId: "user_003",
    commentId: "comment_006",
  },
  {
    createdAt: "2025-09-25T13:14:00.000Z",
    userId: "user_001",
    commentId: "comment_007",
  },
  {
    createdAt: "2025-09-25T13:16:00.000Z",
    userId: "user_004",
    commentId: "comment_008",
  },
  {
    createdAt: "2025-09-25T13:17:00.000Z",
    userId: "user_005",
    commentId: "comment_008",
  },
];

function CommentSection() {
  return (
    <div className="mt-5">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          commentLikes={commentLikes}
          replies={comments.filter((c) => c.parentCommentId === comment.id)}
          comments={comments}
        />
      ))}
    </div>
  );
}

export default CommentSection;
