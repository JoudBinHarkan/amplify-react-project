import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignInPage() {
  let navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/main');  // Redirect to MainPage after sign in
  };

  return (
    <div style={{
      fontFamily: 'Cambria, Cochin, Georgia, Times, "Times New Roman", serif', // Changed to Cambria
      textAlign: 'center',
      padding: '50px',
      backgroundColor: '#17153B',
      color: '#C8ACD6',
      minHeight: '100vh',
      minWidth: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      boxSizing: 'border-box'
    }}>
      <img src="https://lh3.googleusercontent.com/pw/AP1GczOrSEJuaCW5PbxnNvAxKacy8gv0vbvnYMqX6BzF-UiX87dLLY6ygJ-99925zlc5-lIxgUvvvyKM7nMHcPqg-p8dN-mnybBy_EvpL5x8lovp7Lt5AG0CP2V8FymRxBIQ-OVKBxJnDo2Jn_skojDDaRE=w400-h400-s-no-gm"
       alt="Eventopia Logo" style={{ marginBottom: '10px', width: '300px' }} />
      <h1 style={{ fontSize: '2.5em', marginBottom: '20px' }}>Welcome to Eventopia</h1>
      <button onClick={handleSignIn} style={{
        padding: '15px 30px',
        fontSize: '20px',
        backgroundColor: '#2E236C',
        color: '#C8ACD6',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '20px'
      }}>
        Sign In
      </button>
    </div>
  );
}

export default SignInPage;
