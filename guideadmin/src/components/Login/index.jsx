import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { loginUser, registerUser, registerCheckUsername } from '../../Utils/api';
import {useNavigate} from 'react-router-dom';


function Login(props) {

    //当前用户内容
    const [data, setData] = useState({
        user_name: '',
        user_password: '',
        invitationCode: ''
    })
    //用户ID
    const { user, handleClose, msgOpen } = props;

    //加载当前用户
    const initData = () => {

    }
    const navigate = useNavigate();


    //获取修改后的内容
    const getdata = () => {
        const submitData = { ...data }
        return submitData;
    };

    //提交用户修改
    const submit = () => {
        if (!isLogin && isDuplicate) {
            alert('用户名已存在，请再编一个：）')
            return;
        }
        if (!isLogin && !isValid) {
            alert('密码格式错误🙅')
            return;
        }

        if (isLogin) {

            loginUser(data.user_name,data.user_password).then((res) => {
                console.log('登陆用户', res)
                // 一个独一无二的用户名	Aasd@adsdn1	
                sessionStorage.setItem("loggedin", `${data.user_name}`);
                navigate('/overview')

            }, (reason) => {
                console.log(reason)
                alert(reason.data.msg);
            });

        }
        else {
            registerUser(getdata()).then((res) => {

                console.log('注册用户', res)
                sessionStorage.setItem("loggedin", `${data.user_name}`);
                navigate('/overview')
            }
                , (reason) => {
                    console.log(reason);
                    alert(reason.data.msg);
                });

        }
    };

    //加载标签内容
    useEffect(() => {
        initData();
    }, [])

    //同步表单数据到data
    const changeData = (event, isStatus) => {

        const newData = { ...data };
        const value = event.target.value;
        if (isStatus) {
            newData['status'] = value
        } else {

            const fieldName = event.target.getAttribute('field')

            //验证用户名
            if (!isLogin && fieldName === 'user_name') {
                registerCheckUsername(value).then(
                    () => {
                        //搜索到用户名，用户已存在
                        setDuplicate(true);
                    },
                    () => {
                        setDuplicate(false);
                    }
                );
            } else if (!isLogin&& fieldName === 'user_password') {
                //验证密码格式
                handleValidation(value);

            }

            newData[fieldName] = value;
        }
        setData(newData);
    }

    const [isDuplicate, setDuplicate] = useState(false);
    const [isValid, setValid] = useState(false)

    const handleValidation = (input) => {
        const reg = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
        setValid(reg.test(input));
    }

    const [isLogin, setIsLogin] = useState(true);

    return (

        <div className="login" onChange={(e) => { changeData(e, false) }}>
            <h2>{isLogin ? '登陆' : '注册'}留导航后台</h2>
            <TextField
                fullWidth
                autoFocus
                required
                error={!isLogin && isDuplicate}
                helperText={!isLogin && isDuplicate ? "名称已存在" : ''}
                label={!isLogin ? "取一个独一无二的名称" : "用户名"}
                value={data.user_name}
                inputProps={{ field: 'user_name' }}></TextField>
            <br /><br />

            <TextField
                fullWidth
                required
                label={!isLogin ? "再来一个安全好记的密码" : "密码"}
                value={data.user_password}
                error={!isLogin && !isValid}
                helperText={!isLogin && !isValid ? "密码格式（至少包含）：·数字 ·大写字母 ·小写字母 ·!@#$%^&* ·总长度8-16位" : ''}
                inputProps={{ field: 'user_password' }}></TextField>
            <br /><br />

            {!isLogin ? (
                <TextField
                    fullWidth
                    required
                    label="尊贵的邀请🐎"
                    value={data.invitationCode}
                    inputProps={{ field: 'invitationCode' }}></TextField>
            ) : (<></>)}


            <br /><br />

            <Button
                onClick={() => {
                    submit();
                }}
                variant="contained"
                sx={{ float: "right" }}
            >
                {!isLogin ? "注册并登陆" : "登陆"}
            </Button>
            <Button
                onClick={() => {
                    setIsLogin(!isLogin);
                }}

                sx={{ float: "right", marginRight: '10px' }}
            >
                {!isLogin ? "去登陆" : "去注册"}
            </Button>
        </div>



    );
}

export default Login;
