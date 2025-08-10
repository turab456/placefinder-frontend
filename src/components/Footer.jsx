import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-sky-50 to-peach-50 text-gray-700 py-12 overflow-hidden">
      {/* Vector Wave Background */}
      <div className="absolute inset-0 z-0">
        <svg
          className="w-full h-full opacity-20"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,160 C320,300 520,100 720,160 C920,220 1120,300 1440,160 L1440,320 L0,320 Z"
            fill="url(#waveGradient)"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#93c5fd', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#fb923c', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Description */}
          <div>
            <h3 className="text-2xl font-bold text-indigo-900 mb-4">AI Place Recommender</h3>
            <p className="text-sm text-gray-600 mb-4">
              Discover hidden gems, plan your day, and vibe with local spots curated just for you!
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {[
                { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311 1.266-.058 1.646-.07 4.85-.07z', href: '#' },
                { name: 'Twitter', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z', href: '#' },
                { name: 'Facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z', href: '#' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-sky-500 hover:text-indigo-800 transition duration-200"
                  aria-label={social.name}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold text-indigo-900 mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Popular Near You', href: '#popular' },
                { name: 'Mood Suggestions', href: '#mood' },
                { name: 'Weather Picks', href: '#weather' },
                { name: 'Local Buzz', href: '#buzz' },
                { name: 'Hidden Gems', href: '#gems' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-sky-500 transition duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-lg font-semibold text-indigo-900 mb-4">Stay in the Loop</h4>
            <p className="text-sm text-gray-600 mb-4">Get the latest local vibes and exclusive picks!</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-full border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-700"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="text-sky-500 text-white px-6 py-2 rounded-full hover:bg-sky-600 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright & Additional Links */}
        <div className="mt-8 pt-8 border-t border-sky-200 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} AI Place Recommender. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            {[
              { name: 'Privacy Policy', href: '#privacy' },
              { name: 'Terms of Service', href: '#terms' },
              { name: 'Contact Us', href: '#contact' },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-gray-600 hover:text-sky-500 transition duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;