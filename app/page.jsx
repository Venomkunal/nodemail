"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // 🔐 Client-side guard (middleware is primary protection)
  useEffect(() => {
    if (!document.cookie.includes("auth=")) {
      router.replace("/login");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      from_name: e.target.from_name.value,
      from_email: e.target.from_email.value,
      client_company: e.target.Client_Company.value,
      to_email: e.target.to_email.value,
    };

    const res = await fetch("/api/send-mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("Email sent successfully!");
      e.target.reset();
    } else {
      alert("Failed to send email");
    }
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          background: #f4f6f9;
          font-family: Arial, Helvetica, sans-serif;
        }
        .wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .card {
          width: 100%;
          max-width: 480px;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          overflow: hidden;
        }
        .header {
          background: #0f172a;
          padding: 22px;
          text-align: center;
        }
        .header img {
          max-width: 160px;
        }
        .header h1 {
          color: #ffffff;
          font-size: 20px;
          margin-top: 12px;
        }
        .content {
          padding: 24px;
        }
        label {
          font-size: 13px;
          font-weight: bold;
          color: #374151;
          display: block;
          margin-bottom: 6px;
        }
        input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 6px;
          border: 1px solid #d1d5db;
          margin-bottom: 16px;
        }
        button {
          width: 100%;
          background: #2563eb;
          color: white;
          border: none;
          padding: 14px;
          font-weight: bold;
          border-radius: 6px;
          cursor: pointer;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #64748b;
          padding: 14px 20px 20px;
        }
        @media (max-width: 480px) {
          .content { padding: 20px; }
          .header h1 { font-size: 18px; }
        }
      `}</style>

      <div className="wrapper">
        <div className="card">
          <div className="header">
            <img
              src="https://www.shinewebtechcretions.online/favicon.ico"
              alt="Shineweb Tech Creation"
            />
            <h1>Send Website Proposal</h1>
          </div>

          <div className="content">
            <form onSubmit={handleSubmit}>
              <label>From Name</label>
              <input
                type="text"
                name="from_name"
                defaultValue="Shineweb Tech Creation"
                required
              />

              <label>From Email</label>
              <input
                type="email"
                name="from_email"
                defaultValue="marketing@shinewebtechcretions.online"
                required
              />

              <label>Client Company Name</label>
              <input
                type="text"
                name="Client_Company"
                placeholder="ABC Pvt Ltd"
                required
              />

              <label>To (Client Email)</label>
              <input
                type="email"
                name="to_email"
                placeholder="client@company.com"
                required
              />

              <button type="submit">Send Proposal Email</button>
            </form>
          </div>

          <div className="footer">
            © 2025 Shineweb Tech Creation
          </div>
        </div>
      </div>
    </>
  );
}
