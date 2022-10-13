import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './component/LandingPage';
import Home from './component/Home';

function App() {
  return (
  <BrowserRouter>
    <div className="App">
      
      <Switch>
        <Route exact path='/' component={LandingPage}/>   
         <Route path='/home' component={Home}/>
      </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;
