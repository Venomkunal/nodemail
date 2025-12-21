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
      html: `
        <div style="font-family:Arial;padding:30px;background:#f4f6f9">
          <div style="max-width:600px;margin:auto;background:#ffffff;padding:25px;border-radius:8px">
            
            <p>Dear <strong>${client_company}</strong> Team,</p>

            <p>
              I hope this message finds you well. At
              <strong>Shineweb Tech Creation</strong>, we specialize in crafting
              modern, high-performance websites tailored to your business needs.
              We believe a professionally designed website can significantly
              enhance your online visibility.
            </p>

            <p>
              We noticed <strong>${client_company}</strong>'s growing presence
              and would love to discuss how we can assist you in taking your
              organization to the next level.
            </p>

            <p>
              Please feel free to reply to this email to set up a free consultation.
            </p>

            <p>
              Best regards,<br/>
              <strong>Mandeep Rabha</strong><br/>
              (Marketing Director)<br/>
              Shineweb Tech Creation<br/>
              Contact no: <strong>6001882011</strong>
            </p>

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