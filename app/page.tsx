'use client';
import { useState } from 'react';

export default function HomePage() {
  const [inspirationUrl, setInspirationUrl] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult('');

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inspirationUrl, currentUrl }),
    });

    if (!res.ok) {
      setResult('Something went wrong.');
      setLoading(false);
      return;
    }

    const data = await res.json();
    setResult(data.result || 'No content returned.');
    setLoading(false);
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">AI Landing Page Generator</h1>
      <form onSubmit={handleGenerate} className="space-y-4">
        <input
          type="url"
          placeholder="Inspiration URL"
          value={inspirationUrl}
          onChange={(e) => setInspirationUrl(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="url"
          placeholder="Your Current Page URL"
          value={currentUrl}
          onChange={(e) => setCurrentUrl(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button type="submit" disabled={loading} className="bg-black text-white px-4 py-2 rounded">
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </form>
      {result && (
        <div className="mt-6 whitespace-pre-wrap p-4 bg-gray-100 rounded">
          {result}
        </div>
      )}
    </main>
  );
}
