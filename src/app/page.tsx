import { ContactForm } from "./components/ContactForm";

export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-24 ">
      <div className="max-w-2xl mx-auto">
        <ContactForm />
      </div>
    </main>
  );
}
