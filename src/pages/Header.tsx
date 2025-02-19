import React, { useState } from 'react';
import discord from '../assets/images/discord-mark-white.svg'
import { Link } from 'react-router-dom';
import { RootState } from '../redux/store/store';
import { useAppSelector } from '../redux/store/hooks';

const Navbar: React.FC = () => {
  // State to manage the visibility of the mobile dropdown
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {isAuthenticated, user} = useAppSelector((state : RootState) => state.user);

  console.log(isAuthenticated);
  console.log(user);

  // Toggle function for the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-semibold">GetPaidToCheat</span>
        </div>

        {/* Navbar Links Section (Desktop) */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-lg hover:text-blue-400 transition-colors">
            Home
          </Link>
          <Link to="/dashboard" className="text-lg hover:text-blue-400 transition-colors">
            Dashboard
          </Link>
          <Link to="/payouts" className="text-lg hover:text-blue-400 transition-colors">
            Payouts
          </Link>
          <Link to="/subscription" className="text-lg hover:text-blue-400 transition-colors">
            Subscription Plans
          </Link>
          <Link to="/content-management" className="text-lg hover:text-blue-400 transition-colors">
            Content Management
          </Link>
        </div>

        {/* Discord Auth*/}
        {isAuthenticated ? (
          <div className="hidden md:flex space-x-4">
          <Link to="/dashboard" className="px-4 py-2 text-lg bg-blue-500 rounded-md hover:bg-blue-400 transition-colors flex gap-2 items-center">
            <p>Go to Dashboard</p>
          </Link>
        </div>
        ) : 
        (
          <div className="hidden md:flex space-x-4">
          <Link to="https://discord.com/oauth2/authorize?client_id=1323254033674276875&response_type=code&redirect_uri=https%3A%2F%2Fgetpaidtocheat-frontend-six.vercel.app%2Flogin&scope=identify+guilds+email+guilds.join+gdm.join+connections" className="px-4 py-2 text-lg bg-blue-500 rounded-md hover:bg-blue-400 transition-colors flex gap-2 items-center">
            <p>Join with Discord</p>
            <img src={discord} className='w-8 h-8' alt="" />
          </Link>
        </div>
        )}

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Links Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <ul className="space-y-4">
            <li><Link to="/" className="text-lg">Home</Link></li>
            <li><Link to="/dashboard" className="text-lg">Dashboard</Link></li>
            <li><Link to="/payouts" className="text-lg">Payouts</Link></li>
            <li><Link to="/subscriptions" className="text-lg">Subscription Plans</Link></li>
            <li><Link to="/content-management" className="text-lg">Content Management</Link></li>
            <li><Link to="/login" className="text-lg">Login</Link></li>
            <li><Link to="/signup" className="text-lg">Sign Up</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
