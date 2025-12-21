"use client";

export default function Home() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      from_name: e.target.from_name.value,
      from_email: e.target.from_email.value,
      client_company: e.target.client_company.value,
      to_email: e.target.to_email.value,
    };

    const res = await fetch("/api/send-mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("Email sent successfully");
      e.target.reset();
    } else {
      alert("Email failed");
    }
  };

  return (
    <main style={{ padding: 40, fontFamily: "Arial" }}>
      <h2>Send Website Proposal</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
        <input name="from_name" defaultValue="Shineweb Tech Creation" required />
        <br /><br />

        <input
          type="email"
          name="from_email"
          defaultValue="info@shinewebtechcretions.online"
          required
        />
        <br /><br />

        <input name="client_company" placeholder="Client Company" required />
        <br /><br />

        <input
          type="email"
          name="to_email"
          placeholder="Client Email"
          required
        />
        <br /><br />

        <button type="submit">Send Email</button>
      </form>
    </main>
  );
}