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
import Edit from "../../Edit/Edit";
import { searchByTitleAndId, deleteArticle } from "../../Utils/api.js";


function Viewarticle() {

  const [rows, setRows] = useState([
    {
      article_id: 'a',
      country: "美国",
      is_publish: 1,
      summary: "123",
      tags: ["123"],
      title: "123",
      uid: 1,
      update_time: "Sat, 09 Jul 2022 02:59:14 GMT",
      views: 0,
    },
  ]);
  const [page, setPage] = useState(1);
  const [word, setWord] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [articleid, setArticleid] = useState('new');
  const [message, setMessage] = useState({
    open: false,
    msg: 'test'
  });
  const { msg, open } = message;


  //搜索按钮
  const search = () => {
    //search by id or title
    searchByTitleAndId(word, page).then((res) => {
      if (res.data) {
        if (res.data.data) {
          setRows(res.data.data);
        } else {
          setRows([]);
        }
      }
    });
  };
  //搜索框数据绑定
  const inputChange = () => {
    setWord(document.getElementById("search").value);
  };

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
    deleteArticle(article_id, title).then((res) => {
      if (res.data) {
        if (res.data.msg) {
          console.log(res.data.msg)

          //更新rows
          searchByTitleAndId(word, page).then((res) => {
            if (res.data) {
              if (res.data.data) {
                setRows(res.data.data);
              } else {
                setRows([]);
              }
            }
          });

          //操作反馈
          msgOpen(res.data.msg);

        }
      }
    });
  }

  //操作反馈气泡
  const msgOpen = (mesg) => {
    setMessage({ msg: mesg, open: true });
  };
  const msgClose = () => {
    setMessage({ ...message, open: false });
  };

  useEffect(() => {
    const timer = setTimeout(() => { setMessage(''); }, 2000);
    return () => clearTimeout(timer);
  }, []);

  //加载文章列表
  useEffect(() => {
    searchByTitleAndId(word, page).then((res) => {
      if (res.data) {
        if (res.data.data) {
          setRows(res.data.data);
        } else {
          setRows([]);
        }
      }

    });
  }, [word, page]);

  return (
    <div>
      {isEditing ? (
        <div>
          <Edit articleid={articleid} setArticleid={setArticleid}></Edit>
          <Button onClick={finishEdit}>退出编辑（不做保存）</Button>
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
              <Button onClick={() => search()}>搜索</Button>
            </div>

            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              autoHideDuration={5000}
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
                  <TableCell align="right">标题</TableCell>
                  <TableCell align="right">简介</TableCell>
                  <TableCell align="right">用户id</TableCell>
                  <TableCell align="right">浏览</TableCell>
                  <TableCell align="right">标签</TableCell>
                  <TableCell align="right">国家</TableCell>
                  <TableCell align="right">是否发布</TableCell>
                  <TableCell align="right"></TableCell>
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
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.summary}</TableCell>
                    <TableCell align="right">{row.uid}</TableCell>
                    <TableCell align="right">{row.views}</TableCell>
                    <TableCell align="right">
                      {row.tags/* {row.tags.map((element) => {
                        return <a> {row.tags}</a>;
                      })} */}
                    </TableCell>
                    <TableCell align="right">{row.country}</TableCell>
                    <TableCell align="right">
                      {parseInt(row.is_publish) === 1 ? "发布" : "未发布"}
                    </TableCell>
                    <TableCell align="right">

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
