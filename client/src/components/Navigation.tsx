'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500';
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8 items-center">
            <Link 
              href="/" 
              className={`${isActive('/')} px-3 py-2 text-sm font-medium transition-colors duration-200`}
            >
              About Me
            </Link>
            <Link 
              href="/projects" 
              className={`${isActive('/projects')} px-3 py-2 text-sm font-medium transition-colors duration-200`}
            >
              Projects
            </Link>
            <Link 
              href="/contact" 
              className={`${isActive('/contact')} px-3 py-2 text-sm font-medium transition-colors duration-200`}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 