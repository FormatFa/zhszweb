后端api是使用flask,前端使用vue,为了方便，将vue编译好的`dist`目录作为flask的静态文件夹,通过访问flask的静态文件来打开前端

flask后端设置,这里直接将static_folder目录设置为dist
```python
 app = Flask(
        __name__,
        static_folder=os.path.join(here,'dist'),
        static_url_path='/'
    )
```

这样通过 http://localhost:5000/index.html就能访问到前端,如果想打开http://localhost:5000就显示，需要在flask里设置重定向

访问/时重定向到`index.html`
```python
   @app.route('/')
    def index():
        return redirect("index.html")
```