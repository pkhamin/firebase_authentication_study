import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
export default function Home() {
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();

  const handleClick = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen gap-5">
        <span className="text-2xl text-bold">"환영합니다!"</span>
        <span>로그인한 계정 : {currentUser?.email}</span>
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 active:scale-95 transition"
        >
          로그아웃 하기
        </button>
      </div>
    </>
  );
}
