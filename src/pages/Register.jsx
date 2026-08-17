import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleClick = async () => {
    try {
      await register(text, password);
      navigate("/");
    } catch (e) {
      setError("이미 사용중인 이메일입니다.");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen flex-col gap-2">
        <div className="flex justify-center items-center bg-white outline shadow flex-col w-[80%] md:w-[60%] p-3 gap-3 h-auto">
          <h2 className="py-5 text-2xl font-bold">회원가입</h2>
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
            회원가입
          </button>
        </div>
        <div className="w-[80%] md:w-[60%] text-right">
          <Link to="/login" className="text-blue-500 mt-auto">
            로그인
          </Link>
          <span>하기</span>
        </div>
      </div>
    </>
  );
}
