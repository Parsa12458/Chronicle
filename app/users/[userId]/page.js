import UserBadge from "@/app/_components/UserBadge";
import { FaHeart, FaRegCommentDots } from "react-icons/fa6";
import { TbCalendarSmile, TbPencilHeart } from "react-icons/tb";
import { BsChatSquareHeart } from "react-icons/bs";
import { AiOutlineComment } from "react-icons/ai";
import { TiDocumentText } from "react-icons/ti";
import BlogItem from "@/app/_components/BlogItem";
import UserEditButton from "@/app/_components/UserEditButton";
import {
  getCategories,
  getUsersById,
  getUserStats,
} from "@/app/_lib/data-service";
import { timeSince } from "@/app/_lib/helper";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { auth } from "@/app/_lib/auth";

export async function generateMetadata({ params }) {
  const { userId } = await params;

  try {
    const user = await getUsersById(userId);
    const { blogsPublished, commentsWritten } = await getUserStats(userId);

    if (!user) {
      return {
        title: "Chronicle — User Not Found",
        description: "This user profile does not exist.",
      };
    }

    const description =
      user.bio ||
      `${user.fullName} has published ${blogsPublished.length} blogs and written ${commentsWritten.length} comments on Chronicle.`;

    return {
      title: `Chronicle — ${user.fullName}`,
      description,
      keywords: [
        "Chronicle author",
        "blog writer",
        user.fullName,
        `${blogsPublished.length} blogs`,
      ],
      authors: [{ name: user.fullName }],
      openGraph: {
        title: `${user.fullName} on Chronicle`,
        description,
        images: user.avatar ? [user.avatar] : [],
      },
    };
  } catch {
    return {
      title: "Chronicle — Profile",
      description: "Explore author profiles on Chronicle.",
    };
  }
}

export default async function Page({ params }) {
  const { userId } = await params;

  // Get the active session
  const session = await auth();
  const currentUser = session?.user;

  const user = (await getUsersById(userId)) || {};
  const {
    blogsPublished,
    blogsLiked,
    commentsWritten,
    likesOnBlogs,
    likesOnComments,
    commentsOnBlogs,
  } = await getUserStats(userId);
  const categories = await getCategories();

  return (
    <main className="pt-6 pb-16 px-16 relative flex-1 w-full max-w-[1440px] mx-auto">
      <div className="flex flex-col items-center text-center">
        {user.avatar ? (
          <Image
            className="w-32 h-32 aspect-square rounded-full object-center object-cover border-3 border-primary"
            src={user.avatar}
            alt={`${user.fullName} avatar`}
            width={128}
            height={128}
          />
        ) : (
          <FaUserCircle size={128} className="fill-primary" />
        )}
        <h1 className="text-3xl font-semibold mt-5">{user.fullName}</h1>
        {user.bio && <p className="max-w-3xl mt-3">{user.bio}</p>}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold">Activities</h2>
        <div className="flex flex-wrap mt-5 gap-5">
          <UserBadge
            icon={
              <TbCalendarSmile
                size={40}
                className="stroke-primary"
                strokeWidth={1.5}
              />
            }
            title={`${timeSince(user?.createdAt)}`}
            body={`You've been a member of Chronicle`}
          />
          <UserBadge
            icon={<FaHeart size={36} className="fill-primary" />}
            title={`${blogsLiked.length} Blogs`}
            body={`You've liked`}
          />
          <UserBadge
            icon={<FaRegCommentDots size={35} className="fill-primary" />}
            title={`${commentsWritten.length} Comments`}
            body={`You've written`}
          />
          <UserBadge
            icon={<BsChatSquareHeart size={35} className="fill-primary" />}
            title={`${likesOnComments.length} Likes`}
            body={`You've received on your comments`}
          />
          <UserBadge
            icon={<TiDocumentText size={36} className="fill-primary" />}
            title={`${blogsPublished.length} Blogs`}
            body={`Published on Chronicle`}
          />
          <UserBadge
            icon={<TbPencilHeart size={38} className="stroke-primary" />}
            title={`${likesOnBlogs.length} Likes`}
            body={`Received on your blogs`}
          />
          <UserBadge
            icon={<AiOutlineComment size={38} className="fill-primary" />}
            title={`${commentsOnBlogs.length} Comments`}
            body={`Written by readers on your blogs`}
          />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold">Blogs</h2>
        <div className="flex gap-6 flex-wrap mt-5">
          {blogsPublished && blogsPublished.length !== 0 ? (
            blogsPublished.map((blog) => (
              <BlogItem
                blog={blog}
                author={user}
                category={categories.find(
                  (category) => category.id === blog.categoryId,
                )}
                key={blog.id}
              />
            ))
          ) : (
            <h1 className="w-full text-3xl leading-10 text-center font-semibold mt-4">
              This author hasn’t published a blog yet.
            </h1>
          )}
        </div>
      </div>

      {user.id === currentUser?.id && <UserEditButton userId={userId} />}
    </main>
  );
}
