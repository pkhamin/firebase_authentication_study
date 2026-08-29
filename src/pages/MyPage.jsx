import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const { currentUser, updateName, changePassword, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPw, setIsEditingPw] = useState(false);
  const [name, setName] = useState(currentUser.displayName);
  const [newPassword, setNewPassword] = useState("");

  const handleClick = async () => {
    if (isEditing) {
      await updateName(name); //Firebase에 저장
    }
    setIsEditing(!isEditing);
  };

  const handlePasswordClick = async () => {
    if (isEditingPw) {
      await changePassword(newPassword);
    }
    setIsEditingPw(!isEditingPw);
  };

  const handleLogoutClick = async () => {
    await logout();
    navigate("/login");
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
        <div className="flex gap-5">
          {isEditingPw ? (
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="새 비밀번호"
            />
          ) : (
            <span>비밀번호 : *******</span>
          )}
          <button
            className="bg-blue-500 text-white py-2 px-2  rounded-lg hover:bg-blue-600 active:scale-95 transition"
            onClick={handlePasswordClick}
          >
            {isEditingPw ? "저장" : "수정"}
          </button>
        </div>
        <button
          onClick={handleLogoutClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 active:scale-95 transition"
        >
          로그아웃 하기
        </button>
      </div>
    </>
  );
}
