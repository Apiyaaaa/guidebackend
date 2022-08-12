import MyEdit from "../components/MyEdit";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

function Edit(props) {
  const [html, setHtml] = useState("");
  const [data, setData] = useState()
  const {articleid} = props
  const initData = () => {
    if (props==='new') {
      //data获取对应articleid 数据
      
      setData(getdata())
    } else {
      //setData(getArticle(article_id))
    }
  }
  const handle = (e) => {
    setHtml(e);
  };
  const getdata = () => {
    const data = {
      article_id: articleid,
      title: document.getElementById("title").value,
      summary: document.getElementById("summary").value,
      tags: document.getElementById("tags").value,
      country: document.getElementById("country").value,
      is_publish: document.getElementById("is_publish").value,
      body: html,
    };
    return data;
  };

  const submit = (e) => {
    const data = getdata();

    if (window.confirm("是否编写完成，点击确定提交")) {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      console.log(formData);
      axios({
        method: "POST",
        url: "api/api/upload_article",
        data: formData,
      }).then((res) => {
        if (res.data) {
          if (res.data === "saved") {
            window.location.reload();
          } else {
            alert("没有填写完");
          }
        }
      });
    } else return;
  };
  // useEffect(()=> {
  //   localStorage
  // },[])
  return (
    <div
      style={{
        overflow: "auto",
        paddingTop: "20px",
      }}
    >
      <div className="panel">
        <div className="nav-bar"></div>
        <div className="display-window">
          <div className="img-upload"></div>
          <div className="fillup-form">
            <TextField multiline label="输入标题" id="title" value={data.title}></TextField>
            <br />
            <TextField multiline label="输入简介" id="summary" value={data.summary}></TextField>
            <TextField label="输入标签并且以“,”隔开" id="tags" value={data.tags}></TextField>
          </div>
          <div className="selection-form">
            Country:
            <Select id="country" label="Country">
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <MenuItem value={"美国"}>美国</MenuItem>
              <MenuItem value={"英国"}>英国</MenuItem>
              <MenuItem value={"加拿大"}>加拿大</MenuItem>
              <MenuItem value={"澳大利亚"}>澳大利亚</MenuItem>
            </Select>
            IsPublish:
            <Select id="is_publish" label="Ispublish">
              <InputLabel id="demo-simple-select-label">Ispublish</InputLabel>
              <MenuItem selected value={1}>是</MenuItem>
              <MenuItem value={0}>否</MenuItem>
            </Select>
          </div>
          <div>
            <MyEdit getMsg={handle}></MyEdit>
            <Button
              onClick={(e) => {
                submit(e);
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
