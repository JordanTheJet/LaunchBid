import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Launchbid</h3>
            <p className="text-gray-400 text-sm">Connecting startups with early supporters through innovative funding mechanisms.</p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="material-icons">facebook</i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="material-icons">public</i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="material-icons">insert_link</i>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-4">Explore</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/auctions" className="hover:text-white">Auctions</Link></li>
              <li><Link to="/equity" className="hover:text-white">Equity Offerings</Link></li>
              <li><Link to="/loans" className="hover:text-white">Microloans</Link></li>
              <li><a href="#" className="hover:text-white">How It Works</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white">Compliance</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Launchbid. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
