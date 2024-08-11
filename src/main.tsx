import React from "react";
import { Amplify } from 'aws-amplify';
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
//import { Amplify } from "aws-amplify";
import outputs from '../amplify_outputs.json'; // Correct path if `main.tsx` is in `src`
import awsConfig from './aws-exports'; // Import AWS configuration
import awsExports from './aws-exports';  // Make sure this path is correct


Amplify.configure(awsExports);

//Amplify.configure(awsExports);
Amplify.configure(outputs);
Amplify.configure(awsConfig);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
