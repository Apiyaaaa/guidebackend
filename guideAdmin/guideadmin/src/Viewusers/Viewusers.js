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
  import { Navigate } from "react-router-dom";
  
  function Viewarticle() {
    const [shows, setShows] = useState([]);
    const [page, setPage] = useState(1);
    const [isEditing, setIsEditing] = useState(false);
    const handleChangePage = (newPage) => {
      setPage(newPage);
    };
  
    function createData(name, calories, fat, carbs, protein) {
      return { name, calories, fat, carbs, protein };
    }
  
    const rows = [
      createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
      createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
      createData("Eclair", 262, 16.0, 24, 6.0),
      createData("Cupcake", 305, 3.7, 67, 4.3),
      createData("Gingerbread", 356, 16.0, 49, 3.9),
      createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
      createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    ];
    const nextPage = () => {
      // setShows(rows.slice(0, 20));
      console.log("nextPage");
    };
    const lastPage = () => {
      // setShows(rows.slice(0, 20));
      console.log("lastPage");
    };
    const toPage = () => {
      const page = document.getElementById("topage").value;
      console.log(page);
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
          <div >
            <Edit style={{width:'960px'}}></Edit> <Button onClick={finishEdit}>Finish</Button>
          </div>
        ) : (<div>
        <Button>创建用户</Button>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">user</TableCell>
                <TableCell align="right">country</TableCell>
                <TableCell align="right">ispublish</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                  <TableCell align="right">
                    <Button onClick={() => editArticle(rows.name)}>编辑</Button>
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
          </TableFooter>
        </TableContainer></div>)}
      </div>
    );
  }
  
  export default Viewarticle;
  