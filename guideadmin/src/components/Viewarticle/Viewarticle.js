import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Snackbar
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from "react";
import EditArticle from "../EditArticle";
import { searchByTitleAndId, deleteArticle } from "../../Utils/api.js";


function Viewarticle() {

  const [rows, setRows] = useState([]);//每行数据
  const [page, setPage] = useState(1);//页数
  const [word, setWord] = useState("");//搜索词语
  const [isEditing, setIsEditing] = useState(false);//编辑状态
  const [articleid, setArticleid] = useState('new');//编辑的文章ID
  const [message, setMessage] = useState({
    open: false,
    msg: 'test'
  });//操作反馈
  const { msg, open } = message;


  //搜索框数据绑定,防抖
  const inputChange = (e) => {
    setTimeout(() => { setWord(e.target.value); }, 600)

  };

  //切换页面
  const nextPage = () => {
    setPage(page + 1);
    console.log("nextPage");
  };

  const lastPage = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
    console.log("lastPage");
  };

  //编辑按钮点击事件
  const editArticle = (article_id) => {
    // 跳转组件
    setArticleid(article_id);
    setIsEditing(true);
  };

  //退出编辑
  const finishEdit = () => {
    setIsEditing(false);
  };


  //删除文章
  const deleteArticleClick = (article_id, title) => {
    if (window.confirm("操作不可撤回，确定要删除吗？")) {
      deleteArticle(article_id, title).then((res) => {
        console.log(res.data.msg)
  
        //更新rows
        updateRows();
        //操作反馈
        msgOpen(res.data.msg);
  
      });

    } 

  }
  //操作反馈气泡
  const msgOpen = (mesg) => {
    setMessage({ msg: mesg, open: true });
  };
  const msgClose = () => {
    setMessage({ ...message, open: false });
  };

  //
  const updateRows = () =>{
    searchByTitleAndId(word, page).then((res) => {
      setRows(res.data.data);
    }, () => {
      setRows([]);
    });
  }

  //加载文章列表
  useEffect(() => {
    updateRows();
  }, [word, page]);


  return (
    <div className="right-content">
      {isEditing ? (
        <div>
          <EditArticle articleid={articleid} setArticleid={setArticleid} finishEdit = {finishEdit}></EditArticle>
        </div>
      ) : (
        <div>
          <div className="header">
            <div>
              <input
                id="search"
                placeholder="搜索标题或ID"
                onChange={inputChange}
              ></input>
            </div>

            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              autoHideDuration={3000}
              open={open}
              onClose={msgClose}
              message={msg}
            />

            <Button
              className="create"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => editArticle("new")}>新建文章</Button>
          </div>

          <TableContainer>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell style={{ width: 100 }}>标题</TableCell>
                  <TableCell style={{ width: 400 }}>简介</TableCell>
                  <TableCell>用户ID</TableCell>
                  <TableCell>浏览</TableCell>
                  <TableCell>标签</TableCell>
                  <TableCell>国家</TableCell>
                  <TableCell>是否发布</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.article_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.article_id}
                    </TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.summary}</TableCell>
                    <TableCell>{row.uid}</TableCell>
                    <TableCell>{row.views}</TableCell>
                    <TableCell>
                      {row.tags}
                    </TableCell>
                    <TableCell>{row.country}</TableCell>
                    <TableCell>
                      {parseInt(row.is_publish) === 1 ? "发布" : "未发布"}
                    </TableCell>
                    <TableCell>

                      <Button onClick={() => editArticle(row.article_id)}>
                        编辑
                      </Button>
                      <Button onClick={() => deleteArticleClick(row.article_id, row.title)}>
                        删除
                      </Button>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="footer">
            <Button onClick={lastPage}>
              <ArrowBackIosIcon></ArrowBackIosIcon>
            </Button>
            <Button onClick={nextPage}>
              <ArrowBackIosIcon
                style={{ transform: "rotate(180deg)" }}
              ></ArrowBackIosIcon>
            </Button>
          </div>




        </div>
      )}
    </div>
  );
}

export default Viewarticle;
