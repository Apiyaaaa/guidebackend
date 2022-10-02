import { useRoutes } from "react-router-dom";
import routes from "./routes";
import {Fragment} from 'react'

function App() {
  const element = useRoutes(routes);
  return (
    <Fragment>
      {/* 路由表切换组件 */}
       {element}
    </Fragment>
  );
}

export default App;
