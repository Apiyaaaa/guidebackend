import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home/Home.js";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Home" exact component={Home}></Route>
          {/* <Route path='/login' exact component={Login}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
