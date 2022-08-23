def row2dict(rows):
    d = []
    for row in rows:

        d.append(row._asdict())
    for column in row.__table__.columns:
        d[column.name] = str(getattr(row, column.name))

    return d