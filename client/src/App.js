import { Route } from "react-router-dom";
// import Detail from "./components/Detail/Detail";
import Home from './components/Home/Home';
import Landing from './components/LandingPage/Landing';
function App() {
  return (
    <>
      <Route exact path="/" component={Landing} />
      <Route exact path="/countries" component={Home} />

    </>
  );
}

export default App;
