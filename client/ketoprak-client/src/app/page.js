import Chatbot from '@/components/Chatbot';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="container mx-auto p-4">
      <Chatbot />
    </div>
    </main>
  );
}
