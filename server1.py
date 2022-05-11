import flask
import sqlite3
import json
from flask import request
from flask import session
import string
import random
def id_generator(size=10, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))
app=flask.Flask(__name__)
@app.route('/')
def rec_data():
    return 'Hello World';
@app.route('/getpydata',methods=['POST'])
def send_data():
    dbs=sqlite3.connect('userdata.db')
    c=dbs.cursor()
    result=c.execute("SELECT * FROM userdata")
    a=[dict(zip([key[0] for key in c.description],row)) for row in result]
    c.close()
    dbs.commit()
    dbs.close()
    print(a)
    return json.dumps({'userdata':a})
@app.route('/getjsdata',methods=['POST','GET'])
def recv_login_data():
    password='none'
    pw='0'
    if flask.request.method=='POST':
        username = request.form['username']
        password=request.form['password']
        dbs=sqlite3.connect('userdata.db')
        c=dbs.cursor()
        strcmd="SELECT password FROM userdata WHERE username="+"'"+username+"';";
        result=c.execute(strcmd)
        print(strcmd)
        pw=result.fetchall()[0][0]
        print(pw)
        print(password)
        dbs.commit()
        dbs.close()
        if(pw==password):
            return 'true'
        else:
            return 'false'
@app.route('/theatreinfo',methods=['POST'])
def send_theatreinf():
    movieid=request.form['movieid']
    dbs=sqlite3.connect('userdata.db')
    c=dbs.cursor()
    strc="CREATE VIEW temp AS SELECT DISTINCT(theatreid) FROM nowplaying WHERE movieid='"+movieid+"';"
    c.execute("DROP VIEW temp")
    c.execute(strc)
    result=c.execute("SELECT t.name FROM temp j INNER JOIN theatre t ON j.theatreid=t.id;")
    lst=[]
    for i in result.fetchall():
        lst.append(i[0])
    print(lst)
    dbs.commit()
    dbs.close()
    a=dict()
    for i in range(len(lst)):
        a[str(i)]=lst[i]
    print(a)
    return json.dumps(a)
@app.route('/seatseldata',methods=['POST'])
def send_seatseldata():
    movieid=request.form['movie']
    timing=request.form['timing']
    theatre=request.form['theatre']
    date=request.form['date']
    print(theatre)
    print(timing)
    print(movieid)
    str2="SELECT id FROM theatre WHERE name='"+theatre+"'"
    strc="SELECT seat FROM bookings WHERE movieid='"+movieid+"' AND theatreid=("+str2+") AND timing='"+timing+"' AND date='"+date+"';"
    dbs=sqlite3.connect('userdata.db')
    c=dbs.cursor()
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
    return json.dumps(a)
@app.route('/getdates',methods=['POST'])
def get_dates():
    movieid=request.form['movie']
    theatre=request.form['theatre']
    str2="SELECT id FROM theatre WHERE name='"+theatre+"'"
    strc="SELECT distinct(date) FROM nowplaying WHERE movieid='"+movieid+"' AND theatreid=("+str2+");"
    dbs=sqlite3.connect('userdata.db')
    c=dbs.cursor()
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
    return json.dumps(a)
@app.route('/gettimings',methods=['POST'])
def get_time():
    movieid=request.form['movie']
    theatre=request.form['theatre']
    date=request.form['date']
    str2="SELECT distinct(id) FROM theatre WHERE name='"+theatre+"'"
    strc="SELECT distinct(time) FROM nowplaying WHERE movieid='"+movieid+"'AND date='"+date+"' AND theatreid=("+str2+");"
    dbs=sqlite3.connect('userdata.db')
    c=dbs.cursor()
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
    return json.dumps(a)
@app.route('/bookdata',methods=['POST'])
def bookmovie():
    movie=request.form['movie']
    theatre=request.form['theatre']
    timing=request.form['timing']
    date=request.form['date']
    user=request.form['username']
    seats=request.form['seats']
    seats=seats.split(',')
    print(seats)
    dbs=sqlite3.connect('userdata.db')
    c=dbs.cursor()
    result=c.execute('SELECT id FROM theatre WHERE name="'+theatre+'";')
    theatreid=result.fetchall()[0][0]
    bookid=id_generator(size=8)
    for i in seats:
        if i!='':
            strexe='INSERT INTO bookings VALUES("{}","{}","{}","{}",{},"{}","{}")'.format(movie,bookid,theatreid,user,i,timing,date)
            c.execute(strexe)
    dbs.commit()
    dbs.close()
    return bookid
@app.route('/getmoviename',methods=['POST'])
def givemovie():
    mid=request.form['movieid']
    dbs=sqlite3.connect('userdata.db')
    c=dbs.cursor()
    result=c.execute('SELECT name FROM moviedata WHERE id='+mid+';')
    moviename=result.fetchall()[0][0]
    dbs.commit()
    dbs.close()
    return moviename
@app.route('/getuserdetails',methods=['POST'])
def user_details():
    username=request.form['user']
    dbs=sqlite3.connect('userdata.db')
    c=dbs.cursor()
    result=c.execute("SELECT distinct(bookingid),date,timing FROM bookings WHERE userdata='"+username+"';")
    a=[dict(zip([key[0] for key in c.description],row)) for row in result]
    c.close()
    dbs.commit()
    dbs.close()
    print(a)
    return json.dumps({'userdata':a})
if __name__=='__main__':
    app.run()