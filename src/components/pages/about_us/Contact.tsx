import Link from 'next/link';
import React from 'react';

const Contact = () => {
  return (
    <div className="py-20 bg-gray-50 flex items-center justify-center  px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Care from afar with confidence
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Join Mojacares today and give your loved ones the reliable care they deserve.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link href={"/login"}>
            <button className="px-6 py-3 bg-secondary hover:bg-secondary text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              Get Started
            </button>
          </Link>

          <Link href={"/contact"}>
            <button className="px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              Contact Support
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;