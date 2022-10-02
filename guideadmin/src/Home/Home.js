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
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <NavLink to="/overview" className={styles.link}><ListItemText>首页</ListItemText></NavLink>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
            <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <NavLink 
              to="/articlesManagement" className={styles.link}>文章管理</NavLink>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
            <ListItemIcon>
                <TagIcon />
              </ListItemIcon>
              <NavLink to="/tagsManagement" className={styles.link}>标签管理</NavLink>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
            <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <NavLink to="/usersManagement" className={styles.link}>用户管理</NavLink>
            </ListItemButton>
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
