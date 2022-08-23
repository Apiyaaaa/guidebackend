def query2dict(row):
    d = []
    for i in row:
        for y in i
            d[column.name] = str(getattr(row, column.name))

    return d

def dataReturn(msg='成功',code='1',data=None):
    if data == None:
        return {'msg':msg, 'code':code}
    else:
        return {'msg':msg, 'code':code, 'data':data}
