"use client";

import { useEffect, useState } from "react";

export default function TestAPIPage() {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    testAPI();
  }, []);

  const testAPI = async () => {
    const tests: any = {
      backend_reachable: false,
      products_endpoint: null,
      error: null,
      cors: null
    };

    try {
      // Test 1: Backend reachable
      const response1 = await fetch('http://localhost:8080/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      tests.backend_reachable = response1.ok;
      
      if (response1.ok) {
        const data = await response1.json();
        tests.products_endpoint = data;
      } else {
        tests.error = {
          status: response1.status,
          statusText: response1.statusText,
          body: await response1.text()
        };
      }
    } catch (err: any) {
      tests.error = err.message;
      tests.cors = err.message.includes('CORS') || err.message.includes('fetch');
    }

    setResults(tests);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Test Backend API</h1>
        
        {loading ? (
          <div>Testing...</div>
        ) : (
          <div className="space-y-4">
            <div>
              <h2 className="font-semibold text-lg mb-2">Results:</h2>
              <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
                {JSON.stringify(results, null, 2)}
              </pre>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Interpretation:</h3>
              <ul className="space-y-2 text-sm">
                <li className={results?.backend_reachable ? "text-green-600" : "text-red-600"}>
                  {results?.backend_reachable ? "✓" : "✗"} Backend is {results?.backend_reachable ? "reachable" : "not reachable"}
                </li>
                {results?.products_endpoint && (
                  <li className="text-green-600">
                    ✓ Products endpoint returned {Array.isArray(results.products_endpoint) ? results.products_endpoint.length : 0} products
                  </li>
                )}
                {results?.error && (
                  <li className="text-red-600">
                    ✗ Error: {typeof results.error === 'string' ? results.error : JSON.stringify(results.error)}
                  </li>
                )}
                {results?.cors && (
                  <li className="text-orange-600">
                    ⚠ Possible CORS issue detected
                  </li>
                )}
              </ul>
            </div>

            <button
              onClick={() => { setLoading(true); testAPI(); }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Re-test
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
