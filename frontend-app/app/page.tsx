'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

// Define the User type
interface User {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function Home() {
  const [data, setData] = useState<User[]>([]); // Use the User type for state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const apiKey = '4fea22d9352fd176cc559f541526a5b30134dfe49c8708a400b6413279994b30b9ccc387df2493d60dfd08cace4e124595b7404c2b133ba67ebc61c1a37484efcd69ea7fcaec0cd1eafe654fe85e2a74b4d07b462b5e9690079fb363db6a3590cf073479969137f39dc5621391b58a29ea16192b07167e8deadbdbabae11e38a';
  const apiUrl = 'http://localhost:1337/api/users';

  const getData = async () => {
    try {
      console.log('Calling API...');
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`, // Bearer token
        },
      });
      setData(response.data);
      setLoading(false);
      console.log('Success');
    } catch (error) {
      setError('Failed to fetch data from the Server');
      setLoading(false);
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {loading && <div className="text-center text-xl">Loading...</div>}
      {error && <div className="text-center text-red-600">{error}</div>}

      {!loading && !error && data.length === 0 && (
        <div className="text-center text-xl text-gray-500">No user data available.</div>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((user) => (
            <div
              key={user.id}
              className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-800">{user.username}</h2>
              <p className="text-sm text-gray-500">Email: {user.email}</p>
              <p className="text-sm text-gray-500">Provider: {user.provider}</p>
              <p className="text-sm text-gray-500">Confirmed: {user.confirmed ? 'Yes' : 'No'}</p>
              <p className="text-sm text-gray-500">Blocked: {user.blocked ? 'Yes' : 'No'}</p>
              <p className="text-sm text-gray-500">
                Created At: {new Date(user.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Updated At: {new Date(user.updatedAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Published At: {new Date(user.publishedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
