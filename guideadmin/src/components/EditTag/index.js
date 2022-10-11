import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { createTag, editTag } from '../../Utils/api';


function EditTag(props) {



  //当前标签内容
  const [data, setData] = useState({
    tag_name: 'test',
    tag_alias: 'test',
    tag_discription: 'test'
  })
  //标签ID
  const { tag, handleClose, msgOpen } = props;

  //加载当前标签
  const initData = () => {
    if (tag.tag_id === 'new') {

      //新建标签
      setData(
        {
          tag_id: 'new',
          tag_name: "",
          tag_alias: "",
          tag_discription: '',
        }
      );
    }
    else {
      //修改现有文章
      setData(tag);
    }
  }


  //获取修改后的内容
  const getdata = () => {
    const submitData = { ...data }
    return submitData;
  };

  //提交新标签
  const submit = () => {
    const eData = getdata();
    if (window.confirm("是否编写完成，点击确定提交标签")) {

      if (tag.tag_id === 'new') {

        createTag(eData).then((res) => {
          console.log('提交标签', res)
          msgOpen(res.data.msg);
          // setTimeout(() => {  }, 1500)
          handleClose();

        }, (reason) => {
          alert(reason.data.msg);
        });


      }

      else {
        editTag(eData).then((res) => {
          
            console.log('修改标签', res)
            msgOpen(res.data.msg);
            // setTimeout(() => {  }, 1500)
            handleClose();
          }
      , (reason) => {
          alert(reason.data.msg);
        });

      }
    } else return;
  };

  //加载标签内容
  useEffect(() => {
    initData();
  }, [])

  //同步表单数据到data
  const changeData = (event) => {

    const newData = { ...data };
    newData[event.target.getAttribute('field')] = event.target.value;
    setData(newData);
  }

  return (

    <div className="fillup-form" onChange={(e) => { changeData(e) }}>
      <TextField fullWidth multiline required label="一个简短的标签名"
        value={data.tag_name} inputProps={{ field: 'tag_name' }}></TextField>
      <br /><br />

      <TextField fullWidth multiline minRows={2} label="输入标题描述(仅内部可见，选填)"
        value={data.tag_discription} inputProps={{ field: 'tag_discription' }}></TextField>
      <br /><br />

      <TextField fullWidth label="输入标签别称(选填)" style={{marginBottom:"20px",}}
        value={data.tag_alias} inputProps={{ field: 'tag_alias' }}></TextField>
      <br /><br />
      <Button
        onClick={(e) => {
          submit(e);
        }}
        variant = "contained"
        style={{marginBottom:"20px",}}
        sx={{ float: "right" }}
      >
        保存修改
      </Button>
      <Button
      onClick={(e) => {
        handleClose();
      }}
      sx={{ float: "right" }}
      >退出</Button>
    </div>



  );
}

export default EditTag;
