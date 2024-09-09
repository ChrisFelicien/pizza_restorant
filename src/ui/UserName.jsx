import { useSelector } from "react-redux";

const UserName = () => {
  const { username } = useSelector(state => state.user);

  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold capitalize md:block">
      <p>
        {username}
      </p>
    </div>
  );
};

export default UserName;
