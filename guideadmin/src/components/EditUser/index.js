import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  InputLabel,
  Select,
  MenuItem,
} from  "@mui/material";
import { createUser, editUser,checkUsername } from '../../Utils/api';


function EditUser(props) {

  //当前用户内容
  const [data, setData] = useState({
    user_name: '',
    user_password: '',
    status: 'normal'
  })
  //用户ID
  const { user, handleClose, msgOpen } = props;

  //加载当前用户
  const initData = () => {
    if (user.uid === 'new') {

      //新建用户
      setData(
        {
          uid: 'new',
          user_name: "",
          user_password: "",
          status: 'normal',
        }
      );
    }
    else {
      //修改现有用户
      setData(user);
    }
  }


  //获取修改后的内容
  const getdata = () => {
    const submitData = { ...data }
    return submitData;
  };

  //提交新用户
  const submit = () => {
    if(isDuplicate){
      alert('用户名已存在，请再编一个：）')
      return;
    }
    if(!isValid){
      alert('密码格式错误🙅')
      return;
    }
    const eData = getdata();
    if (window.confirm("是否编写完成，点击确定新建用户")) {

      if (user.uid === 'new') {

        createUser(eData).then((res) => {
          console.log('提交用户', res)
          msgOpen(res.data.msg);
          handleClose();

        }, (reason) => {
          alert(reason.data.msg);
        });


      }

      else {
        editUser(eData).then((res) => {

          console.log('修改用户', res)
          msgOpen(res.data.msg);
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
  const changeData = (event,isStatus) => {

    const newData = { ...data };
    const value = event.target.value;
    if(isStatus){
      newData['status'] = value
    }else{

      const fieldName = event.target.getAttribute('field')

      //验证用户名
      if(fieldName === 'user_name'){
        checkUsername(value).then(
          ()=>{
            //搜索到用户名，用户已存在
            setDuplicate(true);
          },
          ()=>{
            setDuplicate(false);
          }
        );
      }else{
        //验证密码格式
        handleValidation(value);

      }

      newData[fieldName] = value;
    }
    setData(newData);
  }

  const [isDuplicate,setDuplicate] = useState(false);
  const [isValid, setValid] = useState(true)

  const handleValidation = (input)=>{
    const reg = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    setValid(reg.test(input));
  }

  return (

    <div className="fillup-form" onChange={(e) => { changeData(e,false) }}>
      <TextField 
      fullWidth 
      multiline 
      autoFocus 
      required 
      error ={isDuplicate}
      helperText = {isDuplicate?"名称已存在":''} 
      label="取一个独一无二的名称"
      value={data.user_name} 
      inputProps={{ field: 'user_name' }}></TextField>
      <br /><br />

      <TextField 
      fullWidth 
      multiline 
      required 
      label="一个安全好记的密码"
      value={data.user_password} 
      error ={!isValid}
      onClick = {(e)=>{ handleValidation(e.target.value);}}
      helperText = {isValid?"":'密码格式（至少包含）：·数字 ·大写字母 ·小写字母 ·!@#$%^&* ·总长度8-16位'} 
      inputProps={{ field: 'user_password' }}></TextField>
      <br /><br />

      <InputLabel id="status-label">用户权限</InputLabel>
      <Select
      value = {data.status}
      sx={{ width: 300 }} 
      labelId="status-label" 
      inputProps={{ field: 'status' }}
      onChange={(e) => { changeData(e,true) }}>
        <MenuItem selected value={"normal"}>normal</MenuItem>
        <MenuItem value={"admin"}>admin</MenuItem>
        <MenuItem  value={"super"}>super</MenuItem>
      </Select>
      <br /><br />

      <Button
        onClick={(e) => {
          submit(e);
        }}
        variant = "contained"
        sx={{ float: "right" }}
        style={{marginBottom:"20px",}}
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

export default EditUser;
