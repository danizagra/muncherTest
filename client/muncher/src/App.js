import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './modules/Home/index'
import './App.css';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home/>}/>

        </Routes>
    </BrowserRouter>
  );
}

export default App;
