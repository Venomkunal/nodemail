import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { to_email, client_company, from_name, from_email } =
      await req.json();

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
      subject: "Achieve Growth with a Premium Website",
      html: `
        <div style="font-family:Arial; padding:30px; background:#f4f6f9">
          <div style="max-width:600px; margin:auto; background:#fff; padding:25px; border-radius:8px">
            <p>Dear <strong>${client_company}</strong> Team,</p>
            <p>
              We at <strong>Shineweb Tech Creation</strong> help businesses
              grow with modern, SEO-optimized websites.
            </p>
            <p>
              We'd love to offer you a <strong>free consultation</strong>.
            </p>
            <p>
              Regards,<br/>
              <strong>${from_name}</strong>
            </p>
          </div>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}