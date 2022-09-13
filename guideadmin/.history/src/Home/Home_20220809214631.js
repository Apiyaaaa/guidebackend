import "..Viewtags";
import List from "@mui/material/List";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useState, useEffect } from "react";
// import Edit from "./Edit/Edit"
import Viewarticle from "../Viewarticle/Viewarticle";
import Viewtags from "../Viewtags/Viewtags";
import Viewusers from "../Viewusers/Viewusers";
function Home() {
  const [content, setContent] = useState("home");
  const homeClick = () => {
    setContent("home");
  };
  const articleClick = () => {
    setContent("article");
  };
  const tagClick = () => {
    setContent("tag");
  };
  const userClick = () => {
    setContent("user");
  };
  return (
    <div className="App">
      <div className="left-nav">
        <div className="user-name">user name</div>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => homeClick()}>
              <ListItemText primary="首页" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => articleClick()}>
              <ListItemText primary="文章管理" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => tagClick()}>
              <ListItemText primary="标签管理" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => userClick()}>
              <ListItemText primary="用户管理" />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
      <div className="right-content">
        {content === "article" ? (
          <Viewarticle></Viewarticle>
        ) : content === "home" ? null : content === "tag" ? (
          <Viewtags></Viewtags>
        ) : content === "user"? <Viewusers></Viewusers>:
        <div>首页</div>}
      </div>
      
    </div>
  );
}

export default Home;
