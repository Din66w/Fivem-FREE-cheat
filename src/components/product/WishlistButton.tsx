'use client';

import { cn } from '@/lib/utils';
import { useWishlist } from '@/context/WishlistContext';
import { HeartIcon, HeartFilledIcon } from '@/components/ui/Icons';

interface WishlistButtonProps {
  handle: string;
  className?: string;
}

export function WishlistButton({ handle, className }: WishlistButtonProps) {
  const { has, toggle, hydrated } = useWishlist();
  const active = hydrated && has(handle);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        toggle(handle);
      }}
      aria-pressed={active}
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
      className={cn(
        'grid h-9 w-9 place-items-center rounded-full border border-bone/20 bg-ink/60 text-bone backdrop-blur transition-colors duration-300 hover:border-bone hover:bg-ink',
        className,
      )}
    >
      {active ? (
        <HeartFilledIcon className="h-4 w-4" />
      ) : (
        <HeartIcon className="h-4 w-4" />
      )}
    </button>
  );
}
