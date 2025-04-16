# Snowledge Register - Formulaire de Contact

Une application Next.js moderne avec un formulaire de contact utilisant shadcn/ui et intégrant l'envoi d'emails via SMTP OVH.

## Fonctionnalités

- Formulaire de contact moderne et réactif
- Validation des champs en temps réel
- Support multilingue (FR/EN/ES)
- Envoi d'emails via SMTP OVH
- Email de confirmation automatique
- Interface utilisateur élégante avec shadcn/ui

## Technologies Utilisées

- [Next.js 14](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Nodemailer](https://nodemailer.com/)

## Prérequis

- Node.js 18.17 ou plus récent
- npm ou yarn
- Un compte SMTP OVH

## Installation

1. Clonez le dépôt :

```bash
git clone https://github.com/votre-username/snowledge-register.git
cd snowledge-register
```

2. Installez les dépendances :

```bash
npm install
```

3. Créez un fichier `.env.local` à la racine du projet :

```env
EMAIL_PASSWORD=votre_mot_de_passe_smtp_ovh
```

## Configuration

1. Configurez vos identifiants SMTP OVH dans `src/app/api/contact/route.ts` :

```typescript
const transporter = nodemailer.createTransport({
  host: "ssl0.ovh.net",
  port: 465,
  secure: true,
  auth: {
    user: "votre_email@domaine.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

## Développement

Pour lancer l'application en mode développement :

```bash
npm run dev
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Structure du Projet

```
snowledge-register/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts
│   │   ├── components/
│   │   │   └── ContactForm.tsx
│   │   └── page.tsx
│   └── components/
│       └── ui/
├── public/
├── .env.local
├── package.json
└── README.md
```

## Formulaire

Le formulaire comprend les champs suivants :

- Nom
- Prénom
- Adresse email
- Comment nous avez-vous connu ? (menu déroulant)
- Pourquoi nous contactez-vous ? (menu déroulant)
- Langue préférée (menu déroulant)

## Emails

L'application envoie deux types d'emails :

1. Une notification à l'administrateur avec les détails du formulaire
2. Un email de confirmation à l'utilisateur

## Déploiement

1. Construisez l'application :

```bash
npm run build
```

2. Démarrez en production :

```bash
npm start
```

## Variables d'Environnement

- `EMAIL_PASSWORD` : Mot de passe SMTP OVH

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

MIT

## Support

Pour toute question ou assistance, veuillez contacter contact@snowledge.eu
