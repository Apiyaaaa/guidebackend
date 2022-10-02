# This Python file uses the following encoding: utf-8
from model import User
from config import db
from utils.utils import query2dict, dataReturn

INVITATION = '爱你孤身走暗巷'

def createUser(user_name, user_password, status='normal'):
    print(user_name)
    results = User.query.filter_by(user_name=user_name).first()
    print(results is None)
    if results is None:
        user = User(user_name=user_name,
                    user_password=user_password, status=status)
        db.session.add(user)
        db.session.commit()
        msg = f"用户 【{user_name}】创建成功"
        code = 1
    else:
        msg = f"用户名已注册"
        code = 0
    return dataReturn(msg=msg, code=code)


def getUsers(uid=None, user_name=None):
    if not uid and not user_name:
        results = User.query.all()
    elif uid != None and user_name is None:
        results = [User.query.filter_by(uid=uid).first()]
    elif user_name != None and uid is None:
        results = [User.query.filter_by(user_name=user_name).first()]
    elif uid and user_name:
        results = User.query.filter(
            User.user_name.like("%" + str(user_name) + "%") |
            User.uid.like("%" + str(uid) + "%")).all()
    if ((results[0] is None) or (len(results) == 0)):
        msg = f"用户 【{user_name}/{uid}】 不存在"
        return dataReturn(msg=msg, code=0)
    else:
        queryCount = len(results)
        data = query2dict(results)
        return dataReturn(f'成功搜索到{queryCount}个用户，搜索条件{uid}/{user_name}', data=data)


def deleteUser(user_name, uid):
    results = User.query.filter_by(uid=uid).first()
    if not results:
        msg = f"用户ID 【{uid}】 不存在"
        code = 0
    elif results.user_name != user_name:
        msg = f"用户名与ID不匹配"
        code = 0
    else:
        db.session.delete(results)
        db.session.commit()
        msg = f"成功删除用户 【{user_name}】"
        code = 1
    return dataReturn(msg=msg, code=code)



def editUser(uid, user_name, user_password, status='normal'):

    results = User.query.filter_by(uid=uid).first()

    if results is not None:
        results.user_name = user_name
        results.user_password = user_password
        results.status = status

        db.session.commit()
        msg = f"用户 【{user_name}】修改成功"
        code = 1
    else:
        msg = f"用户不存在"
        code = 0
    return dataReturn(msg=msg, code=code)


# ------------- 登陆页面 ------------------



def loginUser(user_name=None, user_password=None):

    results = User.query.filter_by(user_name=user_name,user_password = user_password).first()

    if (results is None):
        msg = f"登陆失败，检查用户名与密码"
        return dataReturn(msg=msg, code=0)
    else:
        return dataReturn(f'登陆成功')

def registerUser(user_name, user_password, invitationCode):

    if (INVITATION == invitationCode):
        result = createUser(user_name, user_password, status='normal')
        msg = result['msg']
        code = result['code']
    else:
        msg = f"邀请码错误"
        code= 0
    return dataReturn(msg=msg, code=code)


# def editUserStatus(user_name, status):
#     results = User.query.filter_by(user_name=user_name).first()
#     if results:
#         results.status = 'status'
#         db.session.commit()
#         return (f"成功更改用户 {user_name} 权限为 {status} ")
#     else:
#         return (f"用户 {user_name} 不存在")

# def editUserPassword(user_name, password, new_password):
#     results = User.query.filter_by(user_name=user_name).first()
#     if password == results.password:
#         results.password = new_password
#         db.session.commit()
#         return ("密码修改成功")
