import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Supermemory MCP</h1>
        <p className="text-gray-600">Server is running successfully!</p>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">Next Steps</h2>
          <ul className="list-disc pl-5 text-blue-700 space-y-1">
            <li>Connect to the API at <code className="bg-gray-100 px-1.5 py-0.5 rounded">/api</code> endpoint</li>
            <li>Check the browser's developer console for any messages</li>
            <li>Start building your application components</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
