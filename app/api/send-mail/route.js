export const runtime = "nodejs";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { to_email, client_company, from_name, from_email } =
      await req.json();

    if (!to_email || !client_company || !from_name || !from_email) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
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
      from: `"Shineweb Tech Creation" <${process.env.SMTP_USER}>`,
      to: to_email,
      replyTo: from_email,
      subject: `Achieve ${client_company}'s Growth with a Premium Website`,
      html: `
      <div style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">
        <div style="max-width:480px;margin:30px auto;background:#ffffff;
                    border-radius:12px;overflow:hidden;
                    box-shadow:0 8px 20px rgba(0,0,0,0.08);">

          <!-- Header -->
          <div style="background:#0f172a;padding:22px;text-align:center;">
            <img src="https://www.shinewebtechcretions.online/logo.jpg"
                 alt="Shineweb Tech Creation"
                 style="max-width:160px;height:auto;" />
            <h1 style="color:#ffffff;font-size:20px;margin:12px 0 0;">
              Website Development Proposal
            </h1>
          </div>

          <!-- Content -->
          <div style="padding:24px;color:#374151;font-size:14px;line-height:1.6;">
            <p>Dear <strong>${client_company}</strong> Team,</p>

            <p>
              We at <strong>Shineweb Tech Creation</strong> specialize in
              designing modern, responsive, and high-performance websites
              that help businesses grow online.
            </p>

            <p>
              Our solutions focus on:
            </p>

            <ul style="padding-left:18px;">
              <li>Professional UI/UX Design</li>
              <li>Mobile & SEO Optimization</li>
              <li>Fast Loading Performance</li>
              <li>Secure & Scalable Architecture</li>
            </ul>

            <p>
              We would be delighted to discuss how we can create a
              powerful online presence for <strong>${client_company}</strong>.
            </p>

            <p style="margin-top:24px;">
              Best regards,<br />
              <strong>${from_name}</strong><br />
              Shineweb Tech Creation<br />
              <a href="mailto:${from_email}" style="color:#2563eb;text-decoration:none;">
                ${from_email}
              </a>
            </p>
          </div>

          <!-- Footer -->
          <div style="text-align:center;font-size:12px;color:#64748b;
                      padding:14px 20px 20px;">
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