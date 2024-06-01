// src/components/withAuth.js

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Ensure this is the correct import

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('token'); // Adjust this logic based on your authentication method

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login'); // Redirect to login if not authenticated
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null; // Optionally, you could show a loading spinner here
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
