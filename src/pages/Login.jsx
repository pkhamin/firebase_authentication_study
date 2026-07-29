import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");

  const handleClick = async () => {
    try {
      await login(text, password);
      navigate("/");
    } catch (e) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen flex-col gap-2">
        <div className="flex justify-center items-center bg-white outline shadow flex-col  w-[80%] md:w-[60%] p-3 gap-3 h-auto">
          <h2 className="py-5 text-2xl font-bold">로그인</h2>
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="이메일을 입력하세요."
            className="w-[70%] border-black-100 border px-4 py-2 rounded-lg "
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요."
            className="w-[70%] border-black-100 border px-4 py-2 rounded-lg "
          />
          <button
            onClick={handleClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 active:scale-95 transition"
          >
            로그인
          </button>
        </div>
        <div className="w-[60%] text-right">
          <Link to="/register" className="text-blue-500 mt-auto">
            회원가입
          </Link>
          <span>하기</span>
        </div>
      </div>
    </>
  );
}
