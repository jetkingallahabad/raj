import { MessageCircle } from 'lucide-react';

export default function LiveChat() {
  const whatsappNumber = '918787229617';
  const message = encodeURIComponent('Hi JaspuraHub! I would like to know more about your services.');

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="live-chat"
      aria-label="Chat on WhatsApp"
      style={{ textDecoration: 'none' }}
    >
      <MessageCircle size={22} />
    </a>
  );
}
