import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

let LOGO_DATA_URL = "";

try {
  const logoPath = path.join(
    process.cwd(),
    "public",
    "images",
    "snowledge-logo.png"
  );
  console.log("Chemin du logo:", logoPath);

  if (fs.existsSync(logoPath)) {
    const logoBase64 = fs.readFileSync(logoPath, { encoding: "base64" });
    LOGO_DATA_URL = `data:image/png;base64,${logoBase64}`;
    console.log("Logo chargé avec succès");
  } else {
    console.error("Le fichier logo n'existe pas à l'emplacement:", logoPath);
    LOGO_DATA_URL = ""; // Logo vide si non trouvé
  }
} catch (error) {
  console.error("Erreur lors du chargement du logo:", error);
  LOGO_DATA_URL = ""; // Logo vide en cas d'erreur
}

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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="cid:snowledge-logo" alt="Snowledge Logo" style="max-width: 200px; height: auto;" />
          </div>
          <h2>Nouveau contact</h2>
          <p><strong>Nom:</strong> ${lastName}</p>
          <p><strong>Prénom:</strong> ${firstName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Comment nous a connu:</strong> ${how}</p>
          <p><strong>Raison du contact:</strong> ${why}</p>
          <p><strong>Langue préférée:</strong> ${language}</p>
        </div>
      `,
      attachments: [
        {
          filename: "snowledge-logo.png",
          content: Buffer.from(LOGO_DATA_URL.split(",")[1], "base64"),
          cid: "snowledge-logo",
        },
      ],
    };

    // Envoyer l'email
    await transporter.sendMail(mailOptions);

    // Envoyer un email de confirmation à l'utilisateur
    const confirmationMailOptions = {
      from: "contact@snowledge.eu",
      to: email,
      subject: "Merci de participer à l'aventure Snowledge !",
      text: `
        Bonjour ${firstName},
        
        Un grand merci d'avoir pris le temps de tester Snowledge dans sa phase de développement ! Votre participation est précieuse et nous aide à façonner la meilleure expérience possible.
        En tant que testeur privilégié, vous faites partie des premiers à découvrir notre plateforme, et votre retour d'expérience sera essentiel pour son évolution.
        Ce que nous préparons pour vous :
        🚀 Une plateforme innovante en constante amélioration
        💡 Des fonctionnalités exclusives à venir
        🤝 Une communauté de premiers utilisateurs passionnés
        
        Notre équipe de développement travaille activement sur la plateforme, et nous vous tiendrons informé des nouvelles fonctionnalités à tester.
        
        Encore merci de contribuer à cette phase cruciale !
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="cid:snowledge-logo" alt="Snowledge Logo" style="max-width: 200px; height: auto;" />
          </div>
          <h2>Merci de participer à l'aventure Snowledge !</h2>
          <p>Bonjour ${firstName},</p>
          <p>Un grand merci d'avoir pris le temps de tester Snowledge dans sa phase de développement ! Votre participation est précieuse et nous aide à façonner la meilleure expérience possible.</p>
          <p>En tant que testeur privilégié, vous faites partie des premiers à découvrir notre plateforme, et votre retour d'expérience sera essentiel pour son évolution.</p>
          <p>Ce que nous préparons pour vous :</p>
          <ul style="list-style-type: none; padding-left: 0;">
            <li style="margin-bottom: 10px;">🚀 Une plateforme innovante en constante amélioration</li>
            <li style="margin-bottom: 10px;">💡 Des fonctionnalités exclusives à venir</li>
            <li style="margin-bottom: 10px;">🤝 Une communauté de premiers utilisateurs passionnés</li>
          </ul>
          <p>Notre équipe de développement travaille activement sur la plateforme, et nous vous tiendrons informé des nouvelles fonctionnalités à tester.</p>
          <br>
          <p>Encore merci de contribuer à cette phase cruciale !</p>
          <p style="color: #1E2F97; font-weight: bold;">L'équipe Snowledge</p>
          <div style="margin-top: 20px; font-size: 12px; color: #666;">
            <p>Une suggestion ? Une question ? Contactez-nous directement à contact@snowledge.eu</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: "snowledge-logo.png",
          content: Buffer.from(LOGO_DATA_URL.split(",")[1], "base64"),
          cid: "snowledge-logo",
        },
      ],
    };

    await transporter.sendMail(confirmationMailOptions);

    // Sauvegarde dans la base de données
    const newContact = await prisma.snowledgeRegister.upsert({
      where: { email: email },
      update: {
        firstName: firstName,
        lastName: lastName,
        how: how,
        why: why,
        language: language,
      },
      create: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        how: how,
        why: why,
        language: language,
      },
    });

    return NextResponse.json(
      { message: "Email envoyé avec succès", id: newContact.id },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de l'email et de l'enregistrement du contact:",
      error
    );
    return NextResponse.json(
      {
        message:
          "Erreur lors de l'envoi de l'email et de l'enregistrement du contact",
      },
      { status: 500 }
    );
  }
}
