"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone, password })
      });
      const data = await response.json();

      if (!response.ok) {
        setIsError(true);
        setMessage(data.message || "Đăng nhập thất bại.");
        return;
      }

      // store user token and profile
      localStorage.setItem("elysian_token", data.token);
      localStorage.setItem("elysian_user", JSON.stringify(data.user));

      // if admin, store admin token and redirect to admin console
      if (data.user && data.user.is_admin) {
        localStorage.setItem('elysian_admin_token', data.token);
        try { localStorage.setItem('elysian_admin_user', JSON.stringify(data.user)); } catch (e) {}
        setMessage(data.message || "Đăng nhập admin thành công.");
        setTimeout(() => router.push('/admin'), 600);
      } else {
        setMessage(data.message || "Đăng nhập thành công.");
        setTimeout(() => router.push('/'), 600);
      }
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
        <h1>Welcome Back to Elysian</h1>
        <p className="signin-subtitle">Please enter your details to access your portal.</p>

        <form className="signin-form" onSubmit={onSubmit}>
          <label>Email or Phone Number</label>
          <input
            type="text"
            placeholder="name@example.com"
            value={emailOrPhone}
            onChange={(event) => setEmailOrPhone(event.target.value)}
          />

          <div className="signin-password-head">
            <label>Password</label>
            <a href="#">Forgot Password?</a>
          </div>

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {message ? (
            <p className={isError ? "signin-message error" : "signin-message success"}>{message}</p>
          ) : null}

          <button type="submit" className="signin-submit" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="signin-switch">
          Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
        </p>
      </section>
    </main>
  );
}
