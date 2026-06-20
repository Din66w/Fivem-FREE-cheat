'use client';

import { useState, type FormEvent } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRightIcon, CheckIcon } from '@/components/ui/Icons';

interface NewsletterFormProps {
  compact?: boolean;
  onSubscribed?: () => void;
}

/**
 * Newsletter capture. Posts to /api/newsletter (stubbed) — swap the
 * handler for Shopify Customer / Klaviyo / Mailchimp when ready.
 */
export function NewsletterForm({ compact, onSubscribed }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus('done');
      onSubscribed?.();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <p className="flex items-center gap-2 text-sm text-bone">
        <CheckIcon className="h-4 w-4" /> You&apos;re on the list. Welcome to NOX.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={cn(
          'flex items-center border-b border-bone/30 focus-within:border-bone',
          compact ? 'gap-2' : 'gap-3',
        )}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          aria-label="Email address"
          className="h-11 w-full bg-transparent text-sm text-bone placeholder:text-ash focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          aria-label="Subscribe"
          className="shrink-0 text-bone transition-transform duration-300 hover:translate-x-1 disabled:opacity-50"
        >
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
      {status === 'error' && (
        <p className="mt-2 text-xs text-bone-muted">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
