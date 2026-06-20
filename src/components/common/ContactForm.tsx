'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { CheckIcon } from '@/components/ui/Icons';

const inputClass =
  'h-12 w-full border border-ink-600 bg-ink px-4 text-sm text-bone placeholder:text-ash focus:border-bone focus:outline-none transition-colors';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(form)),
      });
      if (!res.ok) throw new Error();
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="flex items-center gap-3 border border-ink-600 bg-ink-900 p-6">
        <CheckIcon className="h-5 w-5 text-bone" />
        <p className="text-sm text-bone">
          Message sent. We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Name" aria-label="Name" className={inputClass} />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          aria-label="Email"
          className={inputClass}
        />
      </div>
      <input name="subject" placeholder="Subject" aria-label="Subject" className={inputClass} />
      <textarea
        name="message"
        required
        rows={6}
        placeholder="Your message"
        aria-label="Message"
        className="w-full resize-none border border-ink-600 bg-ink px-4 py-3 text-sm text-bone placeholder:text-ash focus:border-bone focus:outline-none"
      />
      <Button type="submit" size="lg" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : 'Send message'}
      </Button>
      {status === 'error' && (
        <p className="text-xs text-bone-muted">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
