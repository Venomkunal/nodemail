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
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:30px 0;">
    <tr>
      <td align="center">

        <table width="480" cellpadding="0" cellspacing="0"
               style="background:#ffffff;border-radius:12px;
                      box-shadow:0 8px 20px rgba(0,0,0,0.08);
                      overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#0f172a;padding:22px;text-align:center;">
              <img src="https://www.shinewebtechcretions.online/logo.jpg"
                   alt="Shineweb Tech Creation"
                   style="max-width:150px;height:auto;display:block;margin:0 auto;" />
              <h1 style="color:#ffffff;font-size:20px;margin:12px 0 0;">
                Website Development Proposal
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:24px;color:#374151;font-size:14px;line-height:1.7;">
              <p>Dear <strong>${client_company}</strong> Team,</p>

              <p>I hope this message finds you well.</p>

              <p>
                At <strong>Shineweb Tech Creation</strong>, we specialize in crafting
                modern, high-performance websites tailored to your business needs.
                A professionally designed website can significantly enhance your
                online visibility and credibility.
              </p>

              <p>
                We noticed <strong>${client_company}</strong>'s growing presence and
                would love to discuss how we can help take your organization to the
                next level.
              </p>

              <p>
                We would be happy to offer a
                <strong>free consultation</strong> to discuss your goals.
              </p>

              <!-- CTA -->
              <table align="center" cellpadding="0" cellspacing="0" style="margin:26px auto;">
                <tr>
                  <td style="background:#2563eb;border-radius:6px;">
                    <a href="mailto:mandeeprabha@shinewebtechcretions.online"
                       style="display:inline-block;padding:14px 28px;
                              font-size:14px;font-weight:bold;
                              color:#ffffff;text-decoration:none;">
                      Schedule Free Consultation
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin-top:26px;">
                Best regards,<br />
                <strong>Mandeep Rabha</strong><br />
                Marketing Director<br />
                Shineweb Tech Creation
              </p>

              <p>
                📞 <a href="tel:+916001882011" style="color:#2563eb;text-decoration:none;">
                  +91 60018 82011
                </a><br />
                ✉️ <a href="mailto:mandeeprabha@shinewebtechcretions.online"
                      style="color:#2563eb;text-decoration:none;">
                  mandeeprabha@shinewebtechcretions.online
                </a>
              </p>
            </td>
          </tr>

          <!-- Social -->
          <tr>
            <td align="center" style="padding:18px;background:#f8fafc;">
            <a href="https://wa.me/7099093224">
              <img srchttps://www.shinewebtechcretions.online/social/whatapp.png" width="24"/>
              </a>
              <a href="https://www.facebook.com/">
                <img src="https://www.shinewebtechcretions.online/social/facebook.svg" width="24" />
              </a>
              <a href="https://www.instagram.com/">
                <img src="https://www.shinewebtechcretions.online/social/instagram.svg="24" />
              </a>
              <a href="https://www.linkedin.com/">
                <img src="https://www.shinewebtechcretions.online/social/linkedin.svg" width="24" />
              </a>
              <a href="https://www.shinewebtechcretions.online/">
                <img src="https://www.shinewebtechcretions.online/social/logo.png" width="24" />
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="text-align:center;font-size:12px;color:#64748b;padding:14px;">
              © 2025 Shineweb Tech Creation. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
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