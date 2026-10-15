import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen gap-5">
        <span className="text-2xl text-bold">
          {currentUser?.displayName}님, 환영합니다!
        </span>
        <span>로그인한 계정 : {currentUser?.email}</span>
        <Link to="/mypage">마이페이지</Link>
      </div>
    </>
  );
}
