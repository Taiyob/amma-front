import Link from 'next/link';
import Logo from '@/shared/Logo/Logo';
import {FacebookIcon, InstagramIcon, LinkedinIcon, Youtube} from 'lucide-react';

const quickLinks = [
  {name: 'Urgent Care', href: '/urgent-care'},
  {name: 'Routine Care', href: '/rouitine-care'},
  {name: 'Al Health Insights', href: '/aiinsight'},
  {name: 'Electronic Health Record', href: '/electronic-health-record'},
  // { name: 'Telemedicine', href: '/talemadicine' },
  // { name: 'Mobile Clinic', href: '/mobile-clinic' },
];

const forTeachers = [
  {name: 'About Us', href: '/about-us'},
  {name: 'Careers', href: '/career'},
  {name: 'Privacy Policy', href: '/privacy-policy'},
  {name: 'Terms of Service', href: '/terms-of-service'},
];

const supportLinks = [
  {name: '+233 53 702 3090', href: 'https://wa.me/+233 53 702 3090'},
  {name: 'info@mojacares.com', href: 'info@mojacares.com'},
  {name: 'Contact', href: '/contact'},
];

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <section className="container mx-auto px-4 pt-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16 mb-12 text-center md:text-left">
          {/* Logo + Description */}
          <div className="flex items-center  flex-col md:justify-start md:items-start">
            <Logo />

            <p className="text-sm text-ring leading-relaxed w-full md:w-3/4">
              Professional care coordination, available 24/7. Your health is our
              priority.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-medium mb-4">Services</h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map(({name, href}, i) => (
                <li key={i}>
                  <Link
                    href={href}
                    className="text-sm text-ring hover:text-ring transition-colors">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* for teacher */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-medium mb-4">Company</h3>
            <ul className="flex flex-col gap-3">
              {forTeachers.map(({name, href}, i) => (
                <li key={i}>
                  <Link
                    href={href}
                    className="text-sm text-ring hover:text-ring transition-colors">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          {/* <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-medium mb-4">Contact</h3>

            <ul className="flex flex-col gap-3">
              {supportLinks.map(({name, href}, i) => (
                <li key={i}>
                  <Link
                    href={href}
                    className="text-sm text-ring hover:text-ring transition-colors">
                    {name}
                  </Link>
                </li>
              ))}

              <div className="flex space-x-3">
                <a
                  href="https://facebook.com"
                  aria-label="Facebook"
                  className="text-foreground hover:text-blue-600 transition-colors">
                  <FacebookIcon className="w-4 h-4" />
                </a>

                <a
                  href="https://instagram.com"
                  aria-label="Instagram"
                  className="text-foreground hover:text-pink-500 transition-colors">
                  <InstagramIcon className="w-4 h-4" />
                </a>

                <a
                  href="https://linkedin.com"
                  aria-label="LinkedIn"
                  className="text-foreground hover:text-blue-700 transition-colors">
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </ul>
          </div> */}

          {/* Support Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-medium mb-4">Contact</h3>

            <ul className="flex flex-col gap-3">
              {/* Main Contact Number */}
              {/* <li>
                <div className="flex items-center justify-between py-3 rounded-md transition-colors">
                  <div className="flex space-x-2">
                    <a
                      href="https://wa.me/8801234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-ring transition-colors hover:text-secondary"
                      title="Message on WhatsApp">
                      +8801234567890
                    </a>
                  </div>
                </div>
              </li> */}

              {/* Other Support Links */}
              {supportLinks.map(({name, href}, i) => (
                <li key={i}>
                  <Link
                    href={href}
                    className="text-sm text-ring hover:text-ring transition-colors">
                    {name}
                  </Link>
                </li>
              ))}

              {/* Social Icons */}
              <div className="flex space-x-3 mt-2 items-center justify-center md:justify-start">
                <a
                  href="https://facebook.com"
                  aria-label="Facebook"
                  className="text-foreground hover:text-blue-600 transition-colors">
                  <FacebookIcon className="w-4 h-4" />
                </a>

                <a
                  href="https://instagram.com"
                  aria-label="Instagram"
                  className="text-foreground hover:text-pink-500 transition-colors">
                  <InstagramIcon className="w-4 h-4" />
                </a>

                <a
                  href="https://linkedin.com"
                  aria-label="LinkedIn"
                  className="text-foreground hover:text-blue-700 transition-colors">
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  aria-label="YouTube"
                  className="text-foreground hover:text-red-500 transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </ul>
          </div>
        </div>
      </section>

      {/* Bottom Info */}
      <div className="bg-background2 border-t">
        <div className="container mx-auto flex flex-col justify-center items-center gap-3 sm:gap-6 py-4 px-4 text-center sm:text-left text-foreground">
          {/* Left: Copyright */}
          <p className="text-xs sm:text-sm">
            © {new Date().getFullYear()} Mojacares. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
