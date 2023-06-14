//Standard Import
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//CSS
import './App.css';
//Components Import
import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';
import Detail from './Components/Detail/Detail';
import Form from './Components/Form/Form';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001/';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/home/:id' component={Detail} />
          <Route exact path='/form' component={Form} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
