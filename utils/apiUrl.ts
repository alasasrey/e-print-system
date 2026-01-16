import Constants from 'expo-constants';

let apiUrl: string;

// Dynamically determine the API URL in development
if (__DEV__) {
    // Use the debuggerHost to get the local IP address
    const hostUri = Constants.expoConfig?.hostUri;
    const debuggerHost = hostUri ? hostUri.split(':')[0] : 'localhost';

    // Replace with your backend port, e.g., 3000, 8000, etc.
    const backendPort = '3000';

    apiUrl = `http://${debuggerHost}:${backendPort}`;
} else {
    // Use your production API URL here
    apiUrl = 'https://localhost:3000';
}

export { apiUrl };

