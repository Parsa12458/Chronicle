function UserBadge({ icon, title, body }) {
  return (
    <div className="bg-lightGreen flex flex-col items-center w-[170px] h-40 py-5 px-4 text-center rounded">
      <span>{icon}</span>
      <span className="text-lg font-bold mt-2">{title}</span>
      <span className="text-sm mt-1">{body}</span>
    </div>
  );
}

export default UserBadge;
