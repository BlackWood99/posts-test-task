import './scss/app.scss';
import { Route, Switch } from "react-router-dom"
import Header from './components/Header';
import AllPosts from './pages/AllPosts/AllPosts';
import OnePost from './pages/OnePost/OnePost';
import CreatePost from './pages/CreatePost/CreatePost';
import Registration from './pages/Registration/Registration';
import Login from './pages/Login/Login';
import { getPosts, getTokenAC } from './redux/actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])
  
  useEffect(() => {
    const token = localStorage.getItem("token")
    dispatch(getTokenAC(token))
  }, [dispatch])

  return (
    <div className="App">
      <Header />
      <main className="main">
        <div className="container">
          <div className="main-content">
            <Switch>
              <Route path="/" component={AllPosts} exact />
              <Route path="/posts/:id" component={OnePost} exact />
              <Route path="/createPost" component={CreatePost} exact />
              <Route path="/register" component={Registration} exact />
              <Route path="/login" component={Login} exact />
            </Switch>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
