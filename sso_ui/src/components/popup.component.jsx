import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const GlobalTestAccountPopup = () => {
  const [copied, setCopied] = useState(false);

  // Test credentials
  const email = 'adhirajkinlekar@gmail.com';
  const password = '1234';

  return (
    <div className="fixed inset-y-0 right-0 flex items-start justify-end z-50 pointer-events-none hidden lg:flex">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 mt-10 mr-6 pointer-events-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Test Account</h2>
        <p className="text-gray-700 mb-2">
          Use the following credentials to access the site:
        </p>
        <div className="mb-4">
          <label className="font-semibold text-gray-800">Email:</label>
          <div className="flex items-center bg-gray-100 rounded p-2 mt-1">
            <span className="text-gray-600">{email}</span>
            <CopyToClipboard text={email} onCopy={() => setCopied(true)}>
              <button className="ml-auto px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 focus:outline-none">
                Copy
              </button>
            </CopyToClipboard>
          </div>
        </div>
        <div className="mb-4">
          <label className="font-semibold text-gray-800">Password:</label>
          <div className="flex items-center bg-gray-100 rounded p-2 mt-1">
            <span className="text-gray-600">{password}</span>
            <CopyToClipboard text={password} onCopy={() => setCopied(true)}>
              <button className="ml-auto px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 focus:outline-none">
                Copy
              </button>
            </CopyToClipboard>
          </div>
        </div>
        {copied && <p className="text-green-500 text-sm">Copied to clipboard!</p>}
      </div>
    </div>
  );
};

export default GlobalTestAccountPopup;
