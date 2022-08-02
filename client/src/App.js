import { Route } from "react-router-dom";
import Activities from "./components/Activities/Activities";
import DetailCountry from "./components/DetailCountry/DetailCountry";
import Home from './components/Home/Home';
import './app.css'
import Landing from './components/LandingPage/Landing';
import { BrowserRouter as Router} from "react-router-dom";
function App() {
  return (
    <Router>
      <Route exact path="/" component={Landing} />
      <Route exact path="/countries" component={Home} />
      <Route path='/countries/:id' component={DetailCountry} />
      <Route exact path='/activities' component={Activities} />
    </Router>
  );
}

export default App;
