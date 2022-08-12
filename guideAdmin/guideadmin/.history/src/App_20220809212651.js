
function App() {
  
  return (
    <div>
      <BrowserRouter>
          <Header />
          <Route path='/' exact component={Home}></Route>
          <Route path='/login' exact component={Login}></Route>
          <Route path='/detail/:id' exact component={Detail}></Route>
      </BrowserRouter>

作者：Jay安静
链接：https://juejin.cn/post/6844904031857410062
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
    </div>
    
  );
}

export default App;
