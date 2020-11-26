
import React, { useState, useEffect } from 'react';


import Amplify, { Auth, auth0SignInButton } from 'aws-amplify';
import aws_exports from './aws-exports';

import { withAuthenticator } from 'aws-amplify-react';
import { Header } from 'semantic-ui-react';

import API, { graphqlOperation } from '@aws-amplify/api';
API.configure();

Amplify.configure({
  Auth:{
        identityPoolId: 'us-east-1:f3222424-fb0a-4d19-a1b1-6f373280a109',
        region: "us-east-1",
        userPoolId: 'us-east-1_reFAEfASB', 
        userPoolWebClientId: '1l13jc7m3cce134vl66tvcm38r',
  },
  API: {
    endpoints:[
      {
        name: "TestFastAPI",
        endpoint: "https://api.inmypictures.com"
        //endpoint: "http://localhost"
        //endpoint: "http://127.0.0.1:8000"
      }
    ]
  }
}
)

function api_hello_word(){
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

function api_classify_rand(){
  const myInit = { // OPTIONAL
      headers: {}, // OPTIONAL
      response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {  // OPTIONAL
          //name: 'param',
      },
  };

  return API
    .get('TestFastAPI', '/classify_rand', myInit)
    .then(response => {return response})
    .catch(error => {
      console.log(error.response);
    });
}


async function api_caller_name(){
  var t = await Auth.currentSession()
  //console.log(t)

  //var access_token = 'eyJraWQiOiJLYnRQQzcyeEJ5dXhmNkFwa2FvdkJwM2tHeU5TNnlxRFNoSDRyRnVxVVEwPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmMzYzOGI4ZC1hOTQ3LTRmM2EtYWVmYS1lYWUzNjA1MzUyN2QiLCJldmVudF9pZCI6IjhkMzg0Mzc5LTU1NWItNGM2Ny1hYzlhLTUxYzFlMmIyODA5MiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MDYwNzAyMDEsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX09iRENOb1d3cCIsImV4cCI6MTYwNjA3MzgwMSwiaWF0IjoxNjA2MDcwMjAxLCJqdGkiOiJhNmVmMWY4Ni0wNjBjLTRmNDQtOTZmYy0yZDFkZGY3ZTU2ZGUiLCJjbGllbnRfaWQiOiI1b3J1MmJtbnM1ZTJodTdlYXYyY2Rtdmc5ciIsInVzZXJuYW1lIjoibXpoYW5nIn0.Xc7sIFrMdpvUxtwMPBhurKDUIgRaidE5XLz77gfF7nLF_HUuOqd335TVrDDgIkK8sefnz3Zqu-N2B1o1BUafuq9aEtfLooqlFBcZ2VKbR6YXE8m2Wh68aoRoxlVCNpu2v71lOsQsLYDtKBAMVbNrF98epGb7HMaL99YK5cbV5WNOvjU6P4v3zCj8wbD8IGHm-VY82yFZmdozlX1Fqhf1Ju30n7n7VQyFWklunIoH5axvALueHspi3PcB-pXrJlMG-9dhz0P4h_8Nk5T2_XSaUD6wdjZc1GzdpPUIRVe2R9mRsAD7NeQAo7NF8aSjBm0Wk_B6m4u0e2GdcsR51KrifQ'
  var bearer_token = 'Bearer ' + t.getAccessToken().jwtToken

  const myInit = { // OPTIONAL
      headers: {"Authorization": bearer_token}, // OPTIONAL
      response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {  // OPTIONAL
          //name: 'param',
      },
  };

  return API
    .get('TestFastAPI', '/user/test', myInit)
    .then(response => {return response})
    .catch(error => {
      console.log(error.response);
    });
}


function App() {
  const [apiHelloWorldResult, setApiHelloWorldResult] = useState('');
  const [apiClassifyRandResult, setApiClassifyRandResult] = useState('');
  

  useEffect(() => {
    getApiHellowWorldResult();
  }, []);

  async function getApiHellowWorldResult(){
    const ret = await api_hello_word();
    setApiHelloWorldResult(ret.data)
  }

  async function getApiClassifyRandResult(){
    const ret = await api_classify_rand();
    const callername = await api_caller_name();
  
    // console.log(callername)

    // let s = this.state.apiClassifyRandResult;
    // s['name_1'] = ret.data['name_1']
    // s['name_2'] = ret.data['name_2']
    // s['probability_1'] = ret.data['probability_1']
    // s['probability_2'] = ret.data['probability_2']

    // setApiClassifyRandResult({ret: s})
    setApiClassifyRandResult('called by ' + callername.data['username'] + ' with prediction result = ' + ret.data['name_1'] + ':' + ret.data['probability_1'])
  }

  return (
    <div className = "App">
      <div>
        <button className="helloWorld-button" onClick={getApiHellowWorldResult}>
          Call Hello World 
        </button>
      </div>

      <div>
        {apiHelloWorldResult}
      </div>


      <div>
        <button className="classify-button" onClick={getApiClassifyRandResult}>
          Call Random Classification
        </button>
      </div>
      <div>
        {apiClassifyRandResult}
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

