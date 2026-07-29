import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
// 함수만 가져다 쓰면 된다
import { auth } from "../firebase/config";

const AuthContext = createContext();
// 전역 저장소를 하나 만드는 것

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  // 새계정 만들기

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  // 로그인하기

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout }}>
      {!loading && children}{" "}
      {/* AuthProvider로 감싼 모든 컴포넌트가 여기 들어옴 */}
    </AuthContext.Provider>
  );
}
// value={{}} 안에 넣어 어느 파일에서든 쓸 수 있게 하는 것

export function useAuth() {
  return useContext(AuthContext);
}
// 하위 컴포넌트에서 useAuth()를 호출하면 value 안의 값들을 가져옴
