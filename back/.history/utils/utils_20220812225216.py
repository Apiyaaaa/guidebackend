def row2dict(row):
    d = []
    for column in row.__table__.columns:
        d[column.name] = str(getattr(row, column.name))

    return d

def dataReturn(msg='成功',code='1',data=None):
    if data == None:
        return {'msg':msg, 'code':code}
    else:
        return {'msg':msg, 'code':code, 'data':data}
