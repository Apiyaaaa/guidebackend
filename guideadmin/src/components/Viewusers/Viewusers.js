import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Snackbar
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from "react";
import EditUser from "../EditUser";
import { getUserByNameAndId,deleteUser } from "../../Utils/api.js";



function Viewusers() {
  const [shows, setShows] = useState([]);  //分页展示
  const [page, setPage] = useState(1);//当前页
  const [word, setWord] = useState('');//搜索词
  const [rows, setRows] = useState([]); //全部标签
  const [open, setOpen] = useState(false);//弹窗
  const [selectedUser, setSelectedUser] = useState({ uid: "new" });//要被编辑的标签
  //反馈气泡
  const [message, setMessage] = useState({
    openBubble: false,
    msg: 'test'
  });
  const { msg, openBubble } = message;

  //操作反馈气泡
  const msgOpen = (mesg) => {
    setMessage({ msg: mesg, openBubble: true });
  };
  const msgClose = () => {
    setMessage({ ...message, openBubble: false });
  };

  //切换页面
  const nextPage = () => {
    setPage(page + 1);
  };
  const lastPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const toPage = () => {
    const newPage = document.getElementById("topage").value;
    setPage(Math.abs(newPage))
  };

  //搜索框
  function inputChange(e) {
    setTimeout(() => { setWord(e.target.value) }, 600);
  };

  //根据内容和页数更新展示信息
  useEffect(() => {
    setShows(rows.slice((page - 1) * 20, page * 20));
  }, [rows, page]);

  //根据搜索词语更新数据
  useEffect(() => {
    updateRows();

  }, [word])

  //弹窗控制
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedUser({ uid: "new" });
    updateRows();

  };


  //-------用户管理FUNCTIONS--------
  //更新用户列表
  function updateRows() {
    getUserByNameAndId(word).then(
      (res) => {
        setRows(res.data.data);
      }, () => {
        setRows([]);
      }
    )
  }

  //编辑标签信息
  const editUser = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  // 删除标签
const deleteUserTrig = (uid,user_name)=>{
  if(window.confirm("操作不可撤回，确定要删除吗？")){
    deleteUser(uid,user_name).then(
      (res)=>{
        msgOpen(res.data.msg);
        updateRows();
  
      },(reason)=>{
        //失败提示
        alert(reason.data.msg);
      }
    );
  } else return;
  
}


  return (
    <div className="right-content">
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        open={openBubble}
        onClose={msgClose}
        message={msg}
      />


      <div className="header">
        <input id="search" placeholder="搜索内容" onChange={inputChange} ></input>
        <Button
          className="create"
          variant="contained"
          onClick={handleClickOpen}
          startIcon={<AddIcon />}>新建用户
        </Button>
      </div>

      <Dialog open={open} maxWidth="md" fullWidth >

        <DialogTitle>创建/编辑用户</DialogTitle>
        <DialogContent>
          <EditUser
            user={selectedUser}
            handleClose={handleClose}
            msgOpen={msgOpen}
          ></EditUser>

        </DialogContent>

      </Dialog>


      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>用户ID</TableCell>
              <TableCell align="right">用户名</TableCell>
              <TableCell align="right">用户密码</TableCell>
              <TableCell align="right">用户权限</TableCell>
              <TableCell align="right"></TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {shows.map((row) => (
              <TableRow
                key={row.uid}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.uid}
                </TableCell>
                <TableCell align="right">{row.user_name}</TableCell>
                <TableCell align="right">{row.user_password}</TableCell>

                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => editUser(row)}>编辑</Button>
                  <Button onClick={() => deleteUserTrig(row.uid,row.user_name)}>删除</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="footer">

          <Button onClick={lastPage}>
            <ArrowBackIosIcon></ArrowBackIosIcon>
          </Button>
          <input
            id={"topage"}
            style={{ width: "30px" }}
            placeholder=""
          ></input>
          <Button onClick={toPage}>跳转</Button>
          <Button onClick={nextPage}>
            <ArrowBackIosIcon
              style={{ transform: "rotate(180deg)" }}
            ></ArrowBackIosIcon>
          </Button>

        </div>
      </TableContainer>
    </div>
  );
}

export default Viewusers;
