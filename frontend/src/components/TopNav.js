"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/service-detail", label: "Service List" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" }
];

export default function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState("Khách hàng");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("elysian_token");
    const storedUser = localStorage.getItem("elysian_user");
    setIsLoggedIn(Boolean(token));

    if (!storedUser) return;
    try {
      const parsed = JSON.parse(storedUser);
      setIsAdmin(Boolean(parsed?.is_admin));
      const preferred = parsed?.email || parsed?.phone || `User #${parsed?.userId || ""}`;
      if (preferred) {
        setDisplayName(preferred);
      }
    } catch {
      setDisplayName("Khách hàng");
    }
  }, [pathname]);

  const shortName = useMemo(() => {
    if (displayName.includes("@")) {
      return displayName.split("@")[0];
    }
    return displayName;
  }, [displayName]);

  const onLogout = () => {
    localStorage.removeItem("elysian_token");
    localStorage.removeItem("elysian_user");
    try { localStorage.removeItem('elysian_admin_token'); } catch(e) {}
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <header className="elite-header">
      <div className="elite-container elite-header-row">
        <div className="elite-logo-wrap">
          <div className="elite-logo-square">✦</div>
          <span className="elite-logo-text">
            Elysian <strong>Skin</strong>
          </span>
        </div>
        <nav className="elite-nav">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "elite-nav-active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="elite-header-actions">
          {isLoggedIn ? (
            <>
              {isAdmin && (
                <Link href="/admin" className="elite-link-button">
                  Admin
                </Link>
              )}
              <Link href="/profile" className="elite-profile-button">
                {shortName} {isAdmin && <span style={{marginLeft:8,background:'#fde68a',color:'#92400e',padding:'2px 8px',borderRadius:999,fontWeight:800,fontSize:12}}>ADMIN</span>}
              </Link>
              <button className="elite-outline-button small" type="button" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="elite-link-button">
                Sign In
              </Link>
              <Link href="/signup" className="elite-primary-button small">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
