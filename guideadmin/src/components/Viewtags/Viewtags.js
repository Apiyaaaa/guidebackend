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
import EditTag from "../EditTag";
import { getTagByTitleAndId,deleteTag } from "../../Utils/api.js";



function Viewtags() {
  const [shows, setShows] = useState([]);  //分页展示
  const [page, setPage] = useState(1);//当前页
  const [word, setWord] = useState('');//搜索词
  const [rows, setRows] = useState([]); //全部标签
  const [open, setOpen] = useState(false);//弹窗
  const [selectedTag, setSelectedTag] = useState({ tag_id: "new" });//要被编辑的标签
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

  //Update Rows
  function updateRows() {
    getTagByTitleAndId(word).then(
      (res) => {
        setRows(res.data.data);
      }, () => {
        setRows([]);
      }
    )
  }


  //弹窗控制
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedTag({ tag_id: "new" });
    updateRows();

  };

  //编辑标签信息
  const editTag = (tag) => {
    setSelectedTag(tag);
    setOpen(true);
  };

  // 删除标签
const deleteTagTrig = (id,name)=>{
  if(window.confirm("操作不可撤回，确定要删除吗？")){
    deleteTag(id,name).then(
      (res)=>{
        msgOpen(res.data.msg);
        updateRows();
  
      },(reason)=>{
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
          startIcon={<AddIcon />}>新建标签
        </Button>
      </div>

      <Dialog open={open} maxWidth="md" fullWidth >

        <DialogTitle>创建/编辑标签</DialogTitle>
        <DialogContent>
          <EditTag
            tag={selectedTag}
            handleClose={handleClose}
            msgOpen={msgOpen}
          ></EditTag>

        </DialogContent>
      </Dialog>


      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>标签ID</TableCell>
              <TableCell align="right">标签名</TableCell>
              <TableCell align="right">别称（对内？）</TableCell>
              <TableCell align="right">标签描述（对内）</TableCell>
              <TableCell align="right"></TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {shows.map((row) => (
              <TableRow
                key={row.tag_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.tag_id}
                </TableCell>
                <TableCell align="right">{row.tag_name}</TableCell>
                <TableCell align="right">{row.tag_alias}</TableCell>
                <TableCell align="right">{row.tag_discription}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => editTag(row)}>编辑</Button>
                  <Button onClick={() => deleteTagTrig(row.tag_id,row.tag_name)}>删除</Button>
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

export default Viewtags;
