def row2dict(rows):
    d = []
    for row in rows:
        print(row._asdict())
        d[row.name]
    for column in row.__table__.columns:
        d[column.name] = str(getattr(row, column.name))

    return d