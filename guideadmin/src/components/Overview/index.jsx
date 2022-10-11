import React from "react";
import { useEffect, useState } from "react";
import EditRecommends from "../EditRecommends";
import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import EditMainNav from "../EditMainNav";

export default function Overview() {
  const [open, setOpen] = useState(false); //弹窗
  const [recommends, setRecommends] = useState([
    { id: "1", title: "母猪上树" },
    { id: "2", title: "母猪上树" },
    { id: "3", title: "母猪上树" },
  ]);
  const handleClickOpen = () => {
    setOpen(true);
    console.log(recommends);
  }; //开启弹窗
  const handleClose = () => {
    setOpen(false);
    // updateRows();
  }; //关闭弹窗

  useEffect(() => {
    if (!sessionStorage.getItem("loggedin")) {
      window.location = "/admin/login";
    }
  }, []); //检测token是否合法
  return (
    <div
      className="right-content"
      style={{ display: "flex", felxDirection: "row", justifyContent:"space-around" }}
    >
      <div style={{ width: "400px" }}>
        <div className="header">主页导航文章</div>
        <EditMainNav></EditMainNav>
      </div>
      <div>
      <div className="header">推荐文章</div>
        <EditRecommends data={recommends}></EditRecommends>
      </div>
    </div>
  );
}
