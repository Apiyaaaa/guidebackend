import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  
  return (
    <div>
      <BrowserRouter>
          <Header />
          <Route path='/' exact component={Home}></Route>
          <Route path='/login' exact component={Login}></Route>
          <Route path='/detail/:id' exact component={Detail}></Route>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
