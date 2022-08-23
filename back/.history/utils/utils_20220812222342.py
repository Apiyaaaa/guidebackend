def row2dict(row):
    d = {}
    for row in query:
        print(row._asdict())
    for column in row.__table__.columns:
        d[column.name] = str(getattr(row, column.name))

    return d