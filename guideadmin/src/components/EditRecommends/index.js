import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";

function EditRecommends(props) {
  const { handleClose, data } = props;
  const initData = () => {
    // setData(recommmends);
  };
  const updateRows = () => {
    //row updated
    console.log("row updated");
  };
  const deleteRecommends = (id) => {
    //delete
    if (window.confirm("操作不可撤回，确定要删除吗？")) {
      //更新接口
      console.log("删除推荐");
    }
  };
  const addRecommends = (id) => {
    //add
    //To-to先通过接口拿到数据 对应标题二次确认
    const preAddRecommend = { id: id, title: "母猪上树" };
    if (
      window.confirm(`你想添加到推荐的文章标题是${preAddRecommend.title}吗`)
    ) {
      //更新接口
      console.log("添加成功");
    }
  };
  useEffect(() => {
    console.log(data);
    initData();
  }, [data]);
  return (
    <div>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>推荐文章ID</TableCell>
              <TableCell>推荐文章标题</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <Button onClick={() => deleteRecommends()}>删除</Button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={() => addRecommends()}>添加</Button>
      <span>推荐文章不能超过七条</span>
    </div>
  );
}

export default EditRecommends;
