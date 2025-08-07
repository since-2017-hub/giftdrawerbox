export default function PrivacyPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <div className="max-w-2xl text-left">
        <p className="mb-2">This is a sample Privacy Policy page. Please update with your actual privacy policy.</p>
        <ul className="list-disc ml-6 mb-4">
          <li>We respect your privacy and protect your data.</li>
          <li>We do not share your information without consent.</li>
          <li>Contact us for any privacy concerns.</li>
        </ul>
        <p>For more details, reach out to our support team.</p>
      </div>
    </div>
  );
}
