import { ContactForm } from "./components/ContactForm";

export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Contactez-nous</h1>
        <ContactForm />
      </div>
    </main>
  );
}
