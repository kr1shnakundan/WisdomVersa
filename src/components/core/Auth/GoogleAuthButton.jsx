import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { FaGoogle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { googleAuth } from '../../../services/operations/authAPI';

const GoogleAuthButton = ({ formType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const toastId = toast.loading(
          formType === 'signup' ? 'Creating account...' : 'Logging in...'
        );

        // Fetch user info from Google
        const userInfoResponse = await fetch(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: { Authorization: `Bearer ${codeResponse.access_token}` },
          }
        );

        const userData = await userInfoResponse.json();
        console.log('Google User Data:', userData);

        // Send to backend
        dispatch(googleAuth(userData, navigate));

        toast.dismiss(toastId);
      } catch (error) {
        toast.dismiss();
        toast.error('Authentication failed. Please try again.');
        console.error('Google Auth Error:', error);
      }
    },
    onError: (error) => {
      console.log('Login Failed:', error);
      toast.error('Google sign-in failed. Please try again.');
    },
  });

  return (
    <button
      onClick={() => login()}
      type="button"
      className="w-[95%] flex flex-row items-center justify-center gap-x-2 mr-8 mt-10 py-[12px] 
                 rounded-[8px] text-richblack-900 bg-yellow-50 border border-richblack-700
                 hover:bg-yellow-25 hover:scale-95 transition-all duration-200 cursor-pointer"
    >
      <FaGoogle />
      <div>{formType === 'signup' ? 'Sign up with Google' : 'Sign in with Google'}</div>
    </button>
  );
};

export default GoogleAuthButton;