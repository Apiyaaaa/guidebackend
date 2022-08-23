def query2dict(row):
    
    for i in row:
        d = {}
        for column in i.__table__.columns:
            print(column.name)
            d[column.name] = str(getattr(i, column.name))

    return d

def dataReturn(msg='成功',code='1',data=None):
    if data == None:
        return {'msg':msg, 'code':code}
    else:
        return {'msg':msg, 'code':code, 'data':data}
