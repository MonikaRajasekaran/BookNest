import Link from 'next/link';
import { FaFacebook,FaInstagram,FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-8 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Support Section */}
          <div>
            <h3 className="font-semibold mb-2">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help">Help Centre</Link>
              </li>
              <li>
                <Link href="/aircover">AirCover</Link>
              </li>
              <li>
                <Link href="/aircover">Booking</Link>
              </li>
             
            </ul>
          </div>

          {/* Hosting Section */}
          <div>
            <h3 className="font-semibold mb-2">Hosting</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/Booking-your-home">Booking your home</Link>
              </li>
              <li>
                <Link href="/hosting-resources">Hosting resources</Link>
              </li>
              <li>
                <Link href="/community-forum">Community forum</Link>
              </li>
            
            </ul>
          </div>

          {/* Booking Section */}
          <div>
            <h3 className="font-semibold mb-2">Booking</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/newsroom">Newsroom</Link>
              </li>
              <li>
                <Link href="/new-features">New features</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
              
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
       <div className="border-t mt-6 pt-4 text-sm text-gray-600 flex flex-col md:flex-row justify-between gap-4 md:gap-0">

  {/* LEFT SECTION */}
  <p className="text-center md:text-left leading-relaxed">
    © 2024 Booking, Inc. · 
    <Link href="/privacy" className="hover:underline ml-1">Privacy</Link> ·
    <Link href="/terms" className="hover:underline ml-1">Terms</Link> ·
    <Link href="/sitemap" className="hover:underline ml-1">Sitemap</Link> ·
    <Link href="/company-details" className="hover:underline ml-1">Company details</Link>
  </p>

  {/* RIGHT ICONS & SETTINGS */}
  <div className="flex flex-wrap items-center justify-center md:justify-end gap-4">
    <span>English (IN)</span>
    <span>₹ INR</span>

    <Link href="https://www.facebook.com" className="hover:text-gray-800 transition">
      <FaFacebook size={22} />
    </Link>
    <Link href="https://www.instagram.com" className="hover:text-gray-800 transition">
      <FaInstagram size={22} />            
    </Link>
    <Link href="https://www.twitter.com" className="hover:text-gray-800 transition">
      <FaTwitter size={22} />
    </Link>
  </div>
</div>

      </div>
    </footer>
  );
};

export default Footer;
