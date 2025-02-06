import { useState } from "react";
import { Register, Login } from "@components/layouts";

export function Authentication({
  setToken,
}: {
  setToken: (token: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isRegister, setIsRegister] = useState<boolean>(false);

  // Handles user login
  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const res = await response.json();
      if (!response.ok) {
        setError(res.error || "User not found");
        return;
      }
      if (!res.user || !res.user.id) {
        setError("Invalid response from the server. Please try again.");
        return;
      }
      const userId = res.user.id;
      setToken(userId);
    } catch (error) {
      setError("An error occurred during login. Please try again.");
    }
  };

  const handleRegister = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      if (password != confirmPassword) {
        setError("The password and confirmation password don't match");
        return;
      }
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const res = await response.json();
      if (!response.ok) {
        setError(res.error || "User not found");
        return;
      }
      const userId = res.id;
      setToken(userId);
    } catch (error) {
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <>
      {isRegister ? (
        <Register
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleRegister={handleRegister}
          setIsRegister={setIsRegister}
          error={error}
        />
      ) : (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          setIsRegister={setIsRegister}
          error={error}
        />
      )}
    </>
  );
}
