import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignInPage() {
  let navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/main');  // Redirect to MainPage after sign in
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#17153B',
      color: '#C8ACD6',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <img src="src/logo.png" alt="Logo" style={{ marginBottom: '20px', width: '120px' }} />
      <h1>Welcome to Your Events Guide</h1>
      <button onClick={handleSignIn} style={{
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#2E236C',
        color: '#C8ACD6',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px'
      }}>
        Sign In
      </button>
    </div>
  );
}

export default SignInPage;
