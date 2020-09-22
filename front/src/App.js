import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import FindChat from './pages/FindChat';
import Chat from './pages/Chat';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <FindChat/>
        </Route>
        <Route path="/chat">
          <Chat />
        </Route>
        <Route path="/">
          
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
