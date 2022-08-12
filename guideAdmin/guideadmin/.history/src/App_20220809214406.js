import { BrowserRouter, Route } from 'react-router-dom';
import Home from "./Home/Home.js"

function App() {
  
  return (
    <div>
      <BrowserRouter>
          <Header />
          <Route path='/Home' exact component={Home}></Route>
          <Route path='/login' exact component={Login}></Route>
          <Route path='/detail/:id' exact component={Detail}></Route>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
