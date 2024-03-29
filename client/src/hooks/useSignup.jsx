import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Initialize isLoading with false
  const { dispatch } = useAuthContext();

  const signup = async (email, password, phoneNumber) => { // Include phoneNumber parameter
    setIsLoading(true); // Set isLoading to true when signup is initiated
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/user/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password, phoneNumber }) // Use camelCase for consistency
});


      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error); // Throw error if response is not ok
      }

      // Save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));

      // Update the auth context
      dispatch({ type: 'LOGIN', payload: json });

      // Update loading state
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message); // Set error message based on the error caught
    }
  };

  return { signup, isLoading, error };
};
