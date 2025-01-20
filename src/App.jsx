import { ThemeProvider, defaultTheme, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'; // Ensure you include Amplify's default styles
import './App.css';
import Dashboard from './component/Dashboard/Dashboard';
import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';

const myTheme = {
  name: 'custom-theme',
  tokens: {
    colors: {
      background: {
        primary: { value: '#6c757d' }, // Your preferred color #6c757d
      },
      font: {
        primary: { value: '#ffffff' },
      },
    },
    components: {
      button: {
        primary: {
          backgroundColor: { value: '#6c757d' },
          color: { value: '#ffffff' },
          _hover: {
            backgroundColor: { value: '#5b636a' },
          },
        },
      },
    },
  },
};

function App({ user, signOut }) {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const fetchAuthToken = async () => {
      try {
        const session = await Auth.currentSession();
        const token = session.getIdToken().getJwtToken();
        setAuthToken(token);
        console.log('Auth Token:', token);
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };

    if (user) {
      fetchAuthToken();
    }
  }, [user]);

  return (
    <ThemeProvider theme={{ ...defaultTheme, ...myTheme }}>
      <div className="App">
        <Dashboard user={user} signOut={signOut} authToken={authToken} />
      </div>
    </ThemeProvider>
  );
}

export default withAuthenticator(App);
