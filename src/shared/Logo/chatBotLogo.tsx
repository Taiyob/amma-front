import Image from 'next/image';

export default function ChatBot() {
  return (
    <div className="relative w-12 h-12">
      <Image
        src="/icons/chatBot.svg"
        alt="Company Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
