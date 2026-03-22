"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone, password, confirmPassword })
      });
      const data = await response.json();

      if (!response.ok) {
        setIsError(true);
        setMessage(data.message || "Đăng ký thất bại.");
        return;
      }

      localStorage.setItem("elysian_token", data.token);
      localStorage.setItem("elysian_user", JSON.stringify(data.user));
      setMessage(data.message || "Đăng ký thành công.");
      setTimeout(() => router.push("/"), 800);
    } catch {
      setIsError(true);
      setMessage("Không thể kết nối máy chủ.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="signin-page">
      <section className="signin-cover">
        <div className="signin-cover-overlay" />
        <div className="signin-cover-content">
          <h2>Elevated Skincare Science</h2>
          <p>Personalized treatments designed for your unique skin journey.</p>
        </div>
      </section>

      <section className="signin-panel">
        <div className="signin-brand">
          <div className="signin-mark">✦</div>
          <span>ELYSIAN</span>
        </div>
        <h1>Create Your Elysian Account</h1>
        <p className="signin-subtitle">Begin your personalized skincare journey today.</p>

        <form className="signin-form" onSubmit={onSubmit}>
          <label>Email or Phone Number</label>
          <input
            type="text"
            placeholder="name@example.com"
            value={emailOrPhone}
            onChange={(event) => setEmailOrPhone(event.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />

          {message ? (
            <p className={isError ? "signin-message error" : "signin-message success"}>{message}</p>
          ) : null}

          <button type="submit" className="signin-submit" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="signin-switch">
          Already have an account? <Link href="/login">Sign In</Link>
        </p>
      </section>
    </main>
  );
}
