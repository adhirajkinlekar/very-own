import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const GlobalTestAccountPopup = () => {
  const [copied, setCopied] = useState(false);

  // Test credentials
  const email = 'adhirajkkinlekar@gmail.com';
  const password = '1234';

  return (
    <div className="fixed inset-y-0 right-0 flex items-start justify-end z-50 pointer-events-none hidden lg:flex">
      <div className="bg-white rounded-lg shadow-lg w-80 p-4 mt-6 mr-4 pointer-events-auto">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Test Account</h2>
        <p className="text-gray-700 mb-3 text-sm">
        Use the following credentials to access the platform:
                </p>
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-gray-100 rounded p-1 text-sm">
            <span className="text-gray-600">{email}</span>
            <CopyToClipboard text={email} onCopy={() => setCopied(true)}>
              <button className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 focus:outline-none">
                Copy
              </button>
            </CopyToClipboard>
          </div>
          <div className="flex items-center justify-between bg-gray-100 rounded p-1 text-sm">
            <span className="text-gray-600">{password}</span>
            <CopyToClipboard text={password} onCopy={() => setCopied(true)}>
              <button className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 focus:outline-none">
                Copy
              </button>
            </CopyToClipboard>
          </div>
        </div>
        {copied && <p className="text-green-500 text-xs mt-2">Copied to clipboard!</p>}
      </div>
    </div>
  );
};

export default GlobalTestAccountPopup;
