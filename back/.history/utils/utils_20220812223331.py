def row2dict(row):
    d = []
    for i in row:
        print(i)


    return d

def dataReturn(msg='成功',code='1',data=None):
    if data == None:
        return {'msg':msg, 'code':code, 'data':data}
    else:
        
