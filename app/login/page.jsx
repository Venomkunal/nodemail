"use client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      // Set cookie (middleware reads this)
      document.cookie = "auth=true; path=/";
      router.push("/dashboard");
    } else {
      alert("Invalid login");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0f172a"
    }}>
      <form onSubmit={handleLogin} style={{
        background: "#fff",
        padding: 30,
        borderRadius: 10,
        width: 320
      }}>
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          style={{ width: "100%", padding: 12, marginBottom: 14 }}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          style={{ width: "100%", padding: 12, marginBottom: 18 }}
        />

        <button style={{
          width: "100%",
          padding: 12,
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: 6
        }}>
          Login
        </button>
      </form>
    </div>
  );
}