export const runtime = "nodejs";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { to_email, client_company, from_name, from_email } =
      await req.json();

    if (!to_email || !client_company || !from_name || !from_email) {
      throw new Error("Missing required fields");
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${from_name}" <${process.env.SMTP_USER}>`,
      to: to_email,
      replyTo: from_email,
      subject: `Achieve ${client_company}'s Growth with a Premium Website`,
      html: 
 <style>
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
      height: auto;
    }

    .header h1 {
      color: #ffffff;
      font-size: 20px;
      margin: 12px 0 0;
      font-weight: 600;
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
      font-size: 14px;
      margin-bottom: 16px;
      box-sizing: border-box;
    }

    input:focus {
      outline: none;
      border-color: #2563eb;
    }

    button {
      width: 100%;
      background: #2563eb;
      color: #ffffff;
      border: none;
      padding: 14px;
      font-size: 15px;
      font-weight: bold;
      border-radius: 6px;
      cursor: pointer;
    }

    button:hover {
      background: #1d4ed8;
    }

    .footer {
      text-align: center;
      font-size: 12px;
      color: #64748b;
      padding: 14px 20px 20px;
    }

    /* Mobile optimization */
    @media (max-width: 480px) {
      .content {
        padding: 20px;
      }
      .header h1 {
        font-size: 18px;
      }
    }
  </style>
        <div class="wrapper">
  <div class="card">

    <!-- Header -->
    <div class="header">
      <img src="https://www.shinewebtechcretions.online/logo.jpg" alt="Shineweb Tech Creation">
      <h1>Send Website Proposal</h1>
    </div>

    <!-- Form -->
    <div class="content">
      <form id="emailForm">

        <label>From Name</label>
        <input type="text" name="from_name" value="Shineweb Tech Creation" required>

        <label>From Email</label>
        <input type="email" name="from_email" value="info@shinewebtechcretions.online" required>

        <label>Client Company Name</label>
        <input type="text" name="Client_Company" placeholder="ABC Pvt Ltd" required>

        <label>To (Client Email)</label>
        <input type="email" name="to_email" placeholder="client@company.com" required>

        <button type="submit">Send Proposal Email</button>
      </form>
    </div>

    <!-- Footer -->
    <div class="footer">
      © 2025 Shineweb Tech Creation
    </div>

  </div>
</div>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("MAIL ERROR:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}