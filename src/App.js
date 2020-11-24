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




import React from 'react';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

import { withAuthenticator } from 'aws-amplify-react';
import { Header } from 'semantic-ui-react';

Amplify.configure(aws_exports);

function App() {
  return (
    <Header as="h1">
      Hello World!
    </Header>
  );
}

export default withAuthenticator(App, {
  includeGreetings: true,
  signUpConfig: {
    hiddenDefaults: ['phone_number']
  }
});

