import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar';

import { getArticleContent,createArticle,editArticle } from '../Utils/api';
import MyEdit from "../components/MyEdit";

function Edit(props) {
  const [html, setHtml] = useState("");
  const [message, setMessage] = useState({
    open: false,
    msg: 'test'
  });
  const { msg, open } = message;

  const [data, setData] = useState({
    article_id: 999,
    title: "标题",
    summary: "正文概括",
    tags: "研究生",
    update_time: "2022-01-02",
    country: '美国',
    is_publish: '1',
    views: 1001
  })

  const { articleid } = props;

  const initData = () => {
    if (articleid === 'new') {
      //新建文章
      // const date = new Date();
      // const newID = nanoid();
      // setArticleid(newID);
      setData(
        {
          article_id: 999,
          title: "为你的文章取个标题吧",
          summary: "概括你的文章，帮助读者快速了解内容。",
          tags: '',
          update_time: '',
          country: '美国',
          is_publish: '1',
          views: 0
        }
      );
    }
    else {
      //修改现有文章

      getArticleContent(articleid).then((res) => {
        if (res.data) {
          const resData = res.data.data[0];
          console.log('获取现有文章数据', resData);

          setData(resData);
        }
      })

    }
  }

  const handle = (e) => {
    setHtml(e);
  };

  const getdata = () => {
    const submitData = { ...data }
    submitData['body'] = html;
    return submitData;
  };

  const submit = (e) => {
    const eData = getdata();

    if (window.confirm("是否编写完成，点击确定提交文章")) {

      //添加用户id（暂时）
      if (articleid === 'new') {
        const newData = { ...eData };
        newData['uid'] = 1;//待定

        createArticle(newData).then((res) => {
          if (res.data) {
            console.log('提交文章', res)
            if (res.data.msg) {
              msgOpen(res.data.msg);
              setTimeout(() => { window.location.reload(); }, 2000)
  
            } else {
              alert("没有填写完");
            }
          }
        });
        
      } else{
        editArticle(eData).then((res) => {
          if (res.data) {
            console.log('提交文章', res)
            if (res.data.msg) {
              
              msgOpen(res.data.msg);
              setTimeout(() => { window.location.reload(); }, 2000)
             
  
            } else {
              alert("没有填写完");
            }
          }
        });

      }
    } else return;
  };

  // useEffect(()=> {
  //   localStorage
  // },[])

  useEffect(() => {
    initData();

  }, [])

  //同步表单数据到data
  const changeData = (attr) => {
    return (event) => {
      const newData = { ...data };
      newData[attr] = event.target.value;
      setData(newData);
    }

  }

  //操作反馈气泡
  const msgOpen = (mesg) => {
    setMessage({ msg: mesg, open: true });
  };
  const msgClose = () => {
    setMessage({ ...message, open: false });
  };




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
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={3000}
            open={open}
            onClose={msgClose}
            message={msg}
          />
          <div className="img-upload"></div>
          <div className="fillup-form">
            <TextField fullWidth multiline label="输入标题" id="title" value={data.title} onChange={changeData('title')}></TextField>
            <br /><br />
            <TextField fullWidth multiline minRows={2} label="输入简介" id="summary" value={data.summary} onChange={changeData('summary')}></TextField>
            <br /><br />
            <TextField fullWidth label="输入标签并且以中文“，”隔开" id="tags" value={data.tags} onChange={changeData('tags')}></TextField>
            <br /><br />
          </div>
          <div className="selection-form">
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="country-label">发布地区</InputLabel>

              <Select sx={{ width: 300 }} id="country" labelID="country-label" value={data.country} onChange={changeData('country')}>
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <MenuItem value={"美国"}>美国</MenuItem>
                <MenuItem value={"英国"}>英国</MenuItem>
                <MenuItem value={"加拿大"}>加拿大</MenuItem>
                <MenuItem value={"澳大利亚"}>澳大利亚</MenuItem>
              </Select>
            </FormControl>


            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="publish-label">是否发布</InputLabel>
              <Select sx={{ width: 300 }} id="is_publish" labelID="publish-label" value={parseInt(data.is_publish)} onChange={changeData('is_publish')} >
                <InputLabel id="demo-simple-select-label">是否发布</InputLabel>
                <MenuItem selected value={1}>是</MenuItem>
                <MenuItem value={0}>否</MenuItem>
              </Select>
            </FormControl>

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
