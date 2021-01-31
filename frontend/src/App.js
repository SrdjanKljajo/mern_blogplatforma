import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import CategoryTag from './screens/CategoryTag'
import NewBlog from './screens/NewBlog'
import RemoveAndUpdateBlogs from './screens/RemoveAndUpdateBlogs'
import Blogs from './screens/Blogs'
import SingleBlog from './screens/SingleBlog'
import CategoryPage from './screens/CategoryPage'
import UserRemove from './screens/UserRemove'
import UserBlogs from './screens/UserBlogs'
import ScrollToTop from './helpers/Scrolltotop'
import TagPage from './screens/TagPage'
import NotFound from './screens/NotFound'

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <main>
        <Switch>
          <Route exact path='/' component={HomeScreen} />
          <Route exact path='/blogs' component={Blogs} />
          <Route path='/admin/category-tag' component={CategoryTag} />
          <Route exact path='/admin/blog' component={NewBlog} />
          <Route exact path='/user/blog' component={NewBlog} />
          <Route exact path='/admin/blogs' component={RemoveAndUpdateBlogs} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route exact path='/user/remove/blogs' component={UserRemove} />
          <Route exact path='/search/:keyword' component={Blogs} />
          <Route exact path='/page/:pageNumber' component={Blogs} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route
            exact
            path='/search/:keyword/page/:pageNumber'
            component={Blogs}
          />
          <Route exact path='/categories/:slug' component={CategoryPage} />
          <Route exact path='/tags/:slug' component={TagPage} />
          <Route exact path='/user/blogs/:name' component={UserBlogs} />
          <Route exact path='/blogs/:slug' component={SingleBlog} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </Router>
  )
}

export default App
