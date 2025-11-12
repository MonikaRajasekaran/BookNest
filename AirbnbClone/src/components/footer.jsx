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
        <div className="border-t mt-6 pt-4 text-sm text-gray-600 flex justify-between">
          <p>
            © 2024 Booking, Inc. · <Link href="/privacy">Privacy</Link> ·{' '}
            <Link href="/terms">Terms</Link> · <Link href="/sitemap">Sitemap</Link> ·{' '}
            <Link href="/company-details">Company details</Link>
          </p>
          <div className="flex space-x-4">
            <span>English (IN)</span>
            <span>₹ INR</span>
            <Link href="https://www.facebook.com">
            <FaFacebook size={24} />
            </Link>
            <Link href="https://www.instagram.com">
            <FaInstagram size={24} />            
            </Link>
            <Link href="https://www.twitter.com">
            <FaTwitter size={24} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
