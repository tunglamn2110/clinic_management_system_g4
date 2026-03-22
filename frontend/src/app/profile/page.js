"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import TopNav from "../../components/TopNav";

export default function ProfilePage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("elysian_token");
    const rawUser = localStorage.getItem("elysian_user");

    if (!token || !rawUser) {
      router.push("/login");
      return;
    }

    try {
      setUser(JSON.parse(rawUser));
      setIsReady(true);
    } catch {
      localStorage.removeItem("elysian_token");
      localStorage.removeItem("elysian_user");
      router.push("/login");
    }
  }, [router]);

  const displayName = useMemo(() => {
    if (!user) return "";
    return user.email || user.phone || `User #${user.userId}`;
  }, [user]);

  // Mock data - move to component scope
  const packages = [
    { id: 1, name: "Combo Nha khoa Cơ bản", date: "15/10/2024", status: "active", icon: "N" },
    { id: 2, name: "Combo Da liễu Toàn diện", date: "20/11/2024", status: "active", icon: "D" },
    { id: 3, name: "Combo Nội soi Tiêu hóa", date: "05/12/2024", status: "completed", icon: "I" },
  ];

  const appointments = [
    // will be replaced by backend data
  ];

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // fetch user's bookings from backend
    async function loadBookings() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bookings`);
        if (!res.ok) return;
        const body = await res.json();
        setBookings(body.bookings || []);
      } catch (e) {
        console.warn('bookings fetch failed', e.message);
      }
    }
    loadBookings();
  }, []);

  const [activeTab, setActiveTab] = useState("personal");

  if (!isReady || !user) {
    return (
      <main className="profile-page">
        <TopNav />
        <div className="elite-container profile-wrap">Đang tải hồ sơ...</div>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <TopNav />
      <section className="elite-container profile-wrap">
        {/* Hero Section */}
        <div className="profile-hero">
          <div className="profile-hero-avatar">{displayName.slice(0, 1).toUpperCase()}</div>
          <div className="profile-hero-content">
            <h1>Xin chào, {displayName}</h1>
            <p>Quản lý hồ sơ sức khỏe và lịch sử dịch vụ của bạn</p>
          </div>
        </div>

        {/* Stats */}
        <div className="profile-stats">
          <div className="profile-stat-card">
            <span className="profile-stat-number">3</span>
            <span className="profile-stat-label">Gói dịch vụ</span>
          </div>
          <div className="profile-stat-card">
            <span className="profile-stat-number">12</span>
            <span className="profile-stat-label">Lượt khám</span>
          </div>
          <div className="profile-stat-card">
            <span className="profile-stat-number">2</span>
            <span className="profile-stat-label">Lịch sắp tới</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button 
            className={`profile-tab ${activeTab === "personal" ? "active" : ""}`}
            onClick={() => setActiveTab("personal")}
          >
            Thông tin cá nhân
          </button>
          <button 
            className={`profile-tab ${activeTab === "packages" ? "active" : ""}`}
            onClick={() => setActiveTab("packages")}
          >
            Gói dịch vụ đã đăng ký
          </button>
          <button 
            className={`profile-tab ${activeTab === "appointments" ? "active" : ""}`}
            onClick={() => setActiveTab("appointments")}
          >
            Lịch sử đặt lịch
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "personal" && (
          <div className="profile-section">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2>Thông tin cá nhân</h2>
              <button className="edit-button">Chỉnh sửa</button>
            </div>
            <div className="profile-grid">
              <div>
                <span>Định danh</span>
                <strong>{displayName}</strong>
              </div>
              <div>
                <span>User ID</span>
                <strong>{user.userId || "N/A"}</strong>
              </div>
              <div>
                <span>Email</span>
                <strong>{user.email || "Chưa cập nhật"}</strong>
              </div>
              <div>
                <span>Số điện thoại</span>
                <strong>{user.phone || "Chưa cập nhật"}</strong>
              </div>
            </div>
          </div>
        )}

        {activeTab === "packages" && (
          <div className="profile-section">
            <h2>Gói dịch vụ đã đăng ký ({packages.length})</h2>
            <div className="package-grid">
              {packages.map((pkg) => (
                <div key={pkg.id} className="package-card">
                  <div className="package-icon">{pkg.icon}</div>
                  <div className="package-info">
                    <h3>{pkg.name}</h3>
                    <div className="package-meta">Đăng ký: {pkg.date}</div>
                  </div>
                  <div className={`package-status status-${pkg.status}`}>
                    {pkg.status === "active" ? "Đang hoạt động" : "Hoàn thành"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "appointments" && (
          <div className="profile-section">
            <h2>Lịch sử đặt lịch ({bookings.length})</h2>
            <div className="appointment-grid">
              {bookings.map((b) => (
                <div key={b.booking_id} className="appointment-card">
                  <div>
                    <div className="appointment-date">{new Date(b.scheduled_at).toLocaleDateString()}</div>
                    <div className="appointment-time">{new Date(b.scheduled_at).toLocaleTimeString()}</div>
                  </div>
                  <div>
                    <h3>{b.service_name}</h3>
                    <div style={{ color: '#64748b' }}>{b.specialist}</div>
                  </div>
                  <div className={`package-status status-active`}>
                    Confirmed
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
