import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="relative w-40 h-20">
      <Image
        src="/image/commonLayout/header/Logo.png"
        alt="Company Logo"
        fill
        placeholder="blur"
        blurDataURL="/image/commonLayout/header/Logo-blur.jpg"
        className="object-contain"
      />
    </Link>
  );
}
