import './App.css';
import QueueRemaining from './component/QueueRemaining';
import Main from "./component/Main";
import {BrowserRouter as Router ,Switch,Route} from 'react-router-dom';
import Login from './component/Login';
import CreateAccount from './component/CreateAccount';
import CreateNewOrder from './component/CreateOrder';
import CheckOrder from './component/CheckOrder';
import Admin from './component/Admin';
import EditCostStatus from './component/EditCostStatus';

function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/" component={Main}/>
      <Route path="/queue" component={QueueRemaining}/>
      <Route path="/login" component={Login}/>
      <Route path="/createaccount" component={CreateAccount}/>
      <Route path="/createorder" component={CreateNewOrder}/>
      <Route path="/checkorder" component={CheckOrder}/>
      <Route path="/admin" component={Admin}/>
      <Route path="/edit/coststatus/:statusid" component={EditCostStatus}/>
      </Switch>
    </Router>
  )
  
}

export default App;
