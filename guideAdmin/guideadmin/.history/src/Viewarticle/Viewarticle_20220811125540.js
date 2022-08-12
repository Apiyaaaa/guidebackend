import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TableFooter,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useState, useEffect } from "react";
import Edit from "../Edit/Edit";
import getArticleList from "../Utils./Api.js";

function Viewarticle() {
  const [data, setData] = useState(getArticleList("", 1));
  const [page, setPage] = useState(1);
  const [word, setWord] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  function createData(
    article_id,
    title,
    summary,
    uid,
    views,
    tags,
    country,
    is_publish
  ) {
    return {
      article_id,
      title,
      summary,
      uid,
      views,
      tags,
      country,
      is_publish,
    };
  }

  const rows = [
    createData(
      "1",
      "母猪上树",
      "母猪的产后护理",
      1,
      233,
      ["留学", "生活"],
      "美国",
      1
    ),
    createData(
      "1",
      "母猪上树",
      "母猪的产后护理",
      1,
      233,
      ["留学", "生活"],
      "美国",
      0
    ),
    createData(
      "1",
      "母猪上树",
      "母猪的产后护理",
      1,
      233,
      ["留学", "生活"],
      "美国",
      1
    ),
  ];

  // const rows = getArticleList(word, page)

  const search = () => {
    //search by id or title
    setData(getArticleList(id, 1));
  };
  const inputChange = () => {
    setWord(document.getElementById("search").value);
  };
  const nextPage = () => {
    setPage(page + 1);
    setData(getArticleList(id, page));
    console.log("nextPage");
  };
  const lastPage = () => {
    if (page !== 1) {
      setPage(page - 1);
      setData(getArticleList(id, page));
    }
    // setShows(rows.slice(0, 20));
    console.log("lastPage");
  };
  const editArticle = (article_id) => {
    // TODO 跳转组件
    setIsEditing(true);
  };
  const finishEdit = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    setShows(rows.slice(0, 20));
  }, []);

  return (
    <div>
      {isEditing ? (
        <div>
          <Edit ></Edit> <Button onClick={finishEdit}>Finish</Button>
        </div>
      ) : (
        <div>
          <input
            id="search"
            placeholder="搜索内容"
            onChange={inputChange}
          ></input>
          <Button onClick={() => search()}>搜索</Button>
          <Button onClick={() => editArticle()}>新建文章</Button>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {shows.map((row) => (
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
                      {row.tags.map((element) => {
                        return <a> {element}</a>;
                      })}
                    </TableCell>
                    <TableCell align="right">{row.country}</TableCell>
                    <TableCell align="right">
                      {row.is_publish ? "发布" : "未发布"}
                    </TableCell>
                    <TableCell align="right">
                      <Button onClick={() => editArticle(rows.name)}>
                        编辑
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter>
              <div>
                <Button onClick={lastPage}>
                  <ArrowBackIosIcon></ArrowBackIosIcon>
                </Button>
                <Button onClick={nextPage}>
                  <ArrowBackIosIcon
                    style={{ transform: "rotate(180deg)" }}
                  ></ArrowBackIosIcon>
                </Button>
              </div>
            </TableFooter>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default Viewarticle;
