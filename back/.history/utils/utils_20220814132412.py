def query2dict(row):
    res = []
    for i in row:
        d = {}
        for column in i.__table__.columns:
            d[column.name] = str(getattr(i, column.name))
        res.append(d)
    return res


def first2dict(item):
    d = {}
       for column in i.__table__.columns:
            d[column.name] = str(getattr(i, column.name))
        res.append(d)
    return res


def dataReturn(msg='成功', code='1',data=None):
    if data == None:
        return {'msg': msg, 'code':code}
    else:
        return {'msg': msg, 'code':code, 'data':data}
