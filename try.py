import sqlite3
'''
username='"john123"'
dbs=sqlite3.connect('userdata.db')
c=dbs.cursor()
strcmd="SELECT password FROM userdata WHERE username="+username;
result=c.execute(strcmd)
'''
movieid='"101"'
dbs=sqlite3.connect('userdata.db')
c=dbs.cursor()
#strc="SELECT t.name FROM nowplaying n JOIN theatre t ON n.theatreid=t.id  where n.movieid="+movieid+";"
#result=c.execute(strc)
strc="SELECT seat FROM bookings WHERE movieid='102' AND theatreid='1002' AND timing='2:45pm'; "
result=c.execute(strc)
lst=[]
for i in result.fetchall():
    print(i)
    lst.append(i[0])
print(lst)
a=dict()
for i in range(len(lst)):
    a[str(i)]=lst[i]
print(a)
dbs.commit()
dbs.close()