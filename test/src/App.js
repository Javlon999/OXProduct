
import './App.css';
import { Route, Switch,Router,Redirect } from "react-router";
import {Dashboard} from './Containers/Dashboard';
import Login from './Containers/Login'
import {history} from './Containers/history';
import {PrivateRoute} from './Containers/PrivateRoute'
function App() {
  return (
    
    <div className="App">
       <Router history={history}>
      <Switch>
     <PrivateRoute path="/dashboard" component={Dashboard} />
     <Route  path="/login" component={Login}/>
     <Redirect from="*" to="/login" />
     </Switch>
  </Router>
    
    </div>
  );
}

export default App;
