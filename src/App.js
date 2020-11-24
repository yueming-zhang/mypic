// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;




import React, { useState, useEffect } from 'react';


import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

import { withAuthenticator } from 'aws-amplify-react';
import { Header } from 'semantic-ui-react';

import API, { graphqlOperation } from '@aws-amplify/api';
API.configure();

Amplify.configure({
  Auth:{
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: 'us-east-1:f3222424-fb0a-4d19-a1b1-6f373280a109',
        // REQUIRED - Amazon Cognito Region
        region: "us-east-1",
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-1_reFAEfASB', 
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '1l13jc7m3cce134vl66tvcm38r',
  },
  API: {
    endpoints:[
      {
        name: "TestFastAPI",
        //endpoint: "http://cloudcmd.inmypictures.com"
        endpoint: "http://localhost:8000"
      }
    ]
  }
}
)

function getData(){
  const myInit = { // OPTIONAL
      headers: {}, // OPTIONAL
      response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {  // OPTIONAL
          //name: 'param',
      },
  };

  return API
    .get('TestFastAPI', '/', myInit)
    .then(response => {return response})
    .catch(error => {
      console.log(error.response);
    });
}

function App() {
  const [apiResult, setApiResult] = useState([]);

  useEffect(() => {
    getApiResult();
  }, []);

  async function getApiResult(){
    const ret = await getData();
    setApiResult(ret.data)
  }

  return (
    <div className = "App">
      <div>
        <button className="fetch-button" onClick={getApiResult}>
          Fetch Data
        </button>
      </div>

      <div>
        {apiResult}
      </div>
    </div>
  );
}



export default withAuthenticator(App, {
  includeGreetings: true,
  signUpConfig: {
    hiddenDefaults: ['phone_number']
  }
});

