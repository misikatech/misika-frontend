import React from 'react';
import { Helmet } from 'react-helmet-async';

const LoginPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Login - Misika</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
          <p className="text-center text-gray-600">Login form coming soon...</p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
