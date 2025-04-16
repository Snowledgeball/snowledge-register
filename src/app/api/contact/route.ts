import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, how, why, language } = body;

    const transporter = nodemailer.createTransport({
      host: "ssl0.ovh.net",
      port: 465,
      secure: true,
      auth: {
        user: "contact@snowledge.eu",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "contact@snowledge.eu",
      to: "contact@snowledge.eu",
      subject: `Nouveau contact de ${firstName} ${lastName}`,
      text: `
        Nom: ${lastName}
        Prénom: ${firstName}
        Email: ${email}
        Comment nous a connu: ${how}
        Raison du contact: ${why}
        Langue préférée: ${language}
      `,
      html: `
        <h2>Nouveau contact</h2>
        <p><strong>Nom:</strong> ${lastName}</p>
        <p><strong>Prénom:</strong> ${firstName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Comment nous a connu:</strong> ${how}</p>
        <p><strong>Raison du contact:</strong> ${why}</p>
        <p><strong>Langue préférée:</strong> ${language}</p>
      `,
    };

    // Envoyer l'email
    await transporter.sendMail(mailOptions);

    // Envoyer un email de confirmation à l'utilisateur
    const confirmationMailOptions = {
      from: "contact@snowledge.eu",
      to: email,
      subject: "Confirmation de votre message - Snowledge",
      text: `
        Bonjour ${firstName},
        
        Nous avons bien reçu votre message et nous vous en remercions.
        Notre équipe vous répondra dans les plus brefs délais.
        
        Cordialement,
        L'équipe Snowledge
      `,
      html: `
        <h2>Confirmation de réception</h2>
        <p>Bonjour ${firstName},</p>
        <p>Nous avons bien reçu votre message et nous vous en remercions.</p>
        <p>Notre équipe vous répondra dans les plus brefs délais.</p>
        <br>
        <p>Cordialement,</p>
        <p>L'équipe Snowledge</p>
      `,
    };

    await transporter.sendMail(confirmationMailOptions);

    return NextResponse.json(
      { message: "Email envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return NextResponse.json(
      { message: "Erreur lors de l'envoi de l'email" },
      { status: 500 }
    );
  }
}
