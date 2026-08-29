import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function MyPage() {
  const [isEditing, setIsEditing] = useState(false);
  const { currentUser, updateName } = useAuth();
  const [name, setName] = useState(currentUser.displayName);

  const handleClick = async () => {
    if (isEditing) {
      await updateName(name); //Firebase에 저장
    }
    setIsEditing(!isEditing);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen gap-5">
        <div className="flex gap-5">
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <span className="text-2xl text-bold">
              {currentUser.displayName}님
            </span>
          )}
          <button
            className="bg-blue-500 text-white py-2 px-2  rounded-lg hover:bg-blue-600 active:scale-95 transition"
            onClick={handleClick}
          >
            {isEditing ? "저장" : "수정"}
          </button>
        </div>
        <span>계정 : {currentUser.email}</span>
      </div>
    </>
  );
}
