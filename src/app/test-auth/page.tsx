"use client";

import { useEffect, useState } from "react";
import { authService } from "@/services/authService";

export default function TestAuthPage() {
  const [authData, setAuthData] = useState<any>(null);

  useEffect(() => {
    const token = authService.getToken();
    const user = authService.getUser();
    const isAuth = authService.isAuthenticated();

    setAuthData({
      token: token ? `${token.substring(0, 20)}...` : null,
      user: user,
      isAuthenticated: isAuth,
      localStorage: {
        token: localStorage.getItem('authToken') ? 'exists' : 'null',
        user: localStorage.getItem('user')
      }
    });
  }, []);

  const handleClearStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Test Auth Data</h1>
        
        <div className="space-y-4">
          <div>
            <h2 className="font-semibold text-lg">Authentication Status:</h2>
            <pre className="bg-gray-100 p-4 rounded mt-2 overflow-auto">
              {JSON.stringify(authData, null, 2)}
            </pre>
          </div>

          <button
            onClick={handleClearStorage}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Clear LocalStorage & Reload
          </button>
        </div>
      </div>
    </div>
  );
}
