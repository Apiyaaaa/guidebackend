import "../App.css";
import { NavLink,Outlet,useNavigate } from 'react-router-dom'

import List from "@mui/material/List";
import { ListItem, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import TagIcon from '@mui/icons-material/Tag';
import PersonIcon from '@mui/icons-material/Person';
// import Edit from "./Edit/Edit"
import styles from './Home.module.css'




function Home() {

  return (
    <div className="App">

      <div className="left-nav">
        <div className={styles.title}>留导航后台</div>
        <List>
          <ListItem disablePadding>
          <NavLink to="/overview" className={styles.link}>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>首页</ListItemText>
            </ListItemButton>
            </NavLink>
          </ListItem>

          <ListItem disablePadding>
          <NavLink 
              to="/articlesManagement" className={styles.link}>
            <ListItemButton>
            <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              文章管理
            </ListItemButton>
            </NavLink>
          </ListItem>

          <ListItem disablePadding>
          <NavLink to="/tagsManagement" className={styles.link}>
            <ListItemButton>
            <ListItemIcon>
                <TagIcon />
              </ListItemIcon>
             标签管理
            </ListItemButton>
            </NavLink>
          </ListItem>

          <ListItem disablePadding>
          <NavLink to="/usersManagement" className={styles.link}>
            <ListItemButton>
            <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
             用户管理
            </ListItemButton>
            </NavLink>
          </ListItem>
        </List>
      </div>



      <div className="right-content">
        <Outlet />
      </div>

    </div>
  );
}

export default Home;
