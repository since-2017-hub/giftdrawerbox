export default function TermsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-8">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
      <div className="max-w-2xl text-left">
        <p className="mb-2">This is a sample Terms & Conditions page. Please update with your actual terms.</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Use the service responsibly.</li>
          <li>Respect privacy and data protection.</li>
          <li>Do not misuse the platform.</li>
        </ul>
        <p>Contact us for more information.</p>
      </div>
    </div>
  );
}
