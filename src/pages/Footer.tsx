import React from 'react';

const Footer: React.FC = () => {
  return (
    <>
        <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and About Us Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-semibold">GetPaidToCheat</h3>
            <p className="mt-2 text-sm">Empowering creators to get paid for their hard work.</p>
          </div>

          {/* Quick Links Section */}
          <div className="mt-4 md:mt-0 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8">
            <a href="mailto:utkarshpatil.it@gmail.com" className="text-sm hover:text-blue-400 transition-colors">
              Email: utkarshpatil.it@gmail.com
            </a>
            <a href="/privacy-policy" className="text-sm hover:text-blue-400 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-and-conditions" className="text-sm hover:text-blue-400 transition-colors">
              Terms and Conditions
            </a>
            <a href="/about-us" className="text-sm hover:text-blue-400 transition-colors">
              About Us
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-6 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm text-gray-400">
            © 2025 GetPaidToCheat. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
