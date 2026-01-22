export const runtime = "nodejs";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();

    // ✅ Normalize & sanitize
    const to_email = body.to_email?.trim();
    const client_company = body.client_company?.trim();
    const from_name = body.from_name?.trim();
    const from_email = body.from_email?.trim();

    if (!to_email || !client_company || !from_name || !from_email) {
      return Response.json(
        { success: false, error: "Missing or invalid fields" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER, // licensed user
        pass: process.env.SMTP_PASS,
      },
    });
    const encodedCompany = encodeURIComponent(client_company);

    await transporter.sendMail({
      from: `"Shineweb Tech Creation" <marketing@shinewebtechcretions.online>`,
      sender: process.env.SMTP_USER,
      to: to_email, // ✅ REQUIRED
headers: {
  "X-Mailer": "Shineweb Tech Creation Mailer",
},
messageId: `<${Date.now()}.${Math.random().toString(36)}@shinewebtechcretions.online>`,
      replyTo: "marketing@shinewebtechcretions.online",
      subject: `Achieve ${client_company}'s Growth with a Premium Website`,
      html: `
<div style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
    <tr>
      <td align="center">

        <table width="480" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:12px;
                 box-shadow:0 8px 20px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#0f172a;padding:22px;text-align:center;">
              <img src="https://www.shinewebtechcretions.online/favicon.ico"
                   width="150" style="display:block;margin:0 auto;" />
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
                At <strong>Shineweb Tech Creation</strong>, we specialize in crafting modern, high-performance websites tailored to your business needs. We believe a professionally designed website can significantly enhance your online visibility.
              </p>

              <p>
                We noticed <strong>${client_company}</strong>'s growing presence and would love to discuss how we can assist you in taking your organization to the next level.
              </p>

              <p>
                We would be delighted to offer a
                <strong>free consultation</strong> to discuss your goals and demonstrate how we can support your growth.
              </p>

              <!-- CTA -->
<table align="center" cellpadding="0" cellspacing="0" style="margin:26px auto;">
  <tr>
    <td align="center">

      <!-- WhatsApp Button -->
      <table cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
        <tr>
          <td style="background:#22c55e;border-radius:6px;">
            <a href="https://wa.me/917099875217?text=Hello%20Shineweb%20Tech%20Creation,%0A%0AI%20am%20from%20${encodedCompany}%20and%20would%20like%20a%20free%20website%20consultation.%0A%0ARegards"
   target="_blank"
   style="display:inline-block;padding:14px 28px;
   font-size:14px;font-weight:bold;
   color:#ffffff;text-decoration:none;">
  Chat on WhatsApp
</a>
          </td>
        </tr>
      </table>

      <!-- Email Button -->
      <table cellpadding="0" cellspacing="0">
        <tr>
          <td style="background:#2563eb;border-radius:6px;">
            <a href="mailto:marketing@shinewebtechcretions.online?subject=Free Website Consultation"
               style="display:inline-block;padding:12px 26px;
               font-size:13px;font-weight:bold;
               color:#ffffff;text-decoration:none;">
              Contact via Email
            </a>
          </td>
        </tr>
      </table>

    </td>
  </tr>
</table>

              <p style="margin-top:26px;">
                Best regards,<br />
                <strong>Bibhash Sarma</strong><br />
                Marketing Director<br />
                Shineweb Tech Creation
              </p>

              <p>
                Phone:
                <a href="tel:+917099875217" style="color:#2563eb;text-decoration:none;">
                  +91 7099875217
                </a><br />
                Email:
                <a href="mailto:bibhashsarma@shinewebtechcretions.online"
                   style="color:#2563eb;text-decoration:none;">
                   bibhashsarma@shinewebtechcretions.online
                </a>
              </p>
            </td>
          </tr>

          <!-- Social -->
          <tr>
            <td align="center" style="padding:18px;background:#f8fafc;">
              <a href="https://local.google.com/place?placeid=ChIJmxUdO0RZWjcREL5bwR7n-No">
                <img src="https://www.shinewebtechcretions.online/social/google.png" width="22" />
              </a>
              <a href="https://wa.me/7099093224">
                <img src="https://www.shinewebtechcretions.online/social/whatsapp.png" width="22" />
              </a>
              <a href="https://www.facebook.com/">
                <img src="https://www.shinewebtechcretions.online/social/facebook.png" width="22" />
              </a>
              <a href="https://www.instagram.com/">
                <img src="https://www.shinewebtechcretions.online/social/instagram.png" width="22" />
              </a>
              <a href="https://www.linkedin.com/">
                <img src="https://www.shinewebtechcretions.online/social/linkedin.png" width="22" />
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
