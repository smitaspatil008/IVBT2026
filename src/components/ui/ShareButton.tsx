import { Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface ShareButtonProps {
  url: string;
  title: string;
}

export default function ShareButton({ url, title }: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // User cancelled or share failed silently
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 rounded-lg bg-[#293452]/30 px-3 py-2 text-sm font-medium text-[#aab4cc]/70 transition hover:bg-[#293452]/30 border border-[#293452]/20"
    >
      <Share2 className="h-4 w-4" />
      Share
    </button>
  );
}
