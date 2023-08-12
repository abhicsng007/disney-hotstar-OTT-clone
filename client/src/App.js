import './App.css';
import Home from './components/home';
import Login from './components/login';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Search from './components/search';


function App() {
  return (
    <div className="app" >
      <Router>
        
          <Routes>
            <Route exact path="/" element={ <Home/>}/>
            <Route exact path="/login" element={ <Login/>}/>
            <Route exact path="/search" element={ <Search/>}/>
          </Routes>
     
        
        
      </Router>
     
      
     
      
    </div>
  );
}

export default App;
