import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>blog_platforma</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Vaš profil</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/user/blog'>
                    <NavDropdown.Item>Kreirajte novu priču</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/user/remove/blogs'>
                    <NavDropdown.Item>Obriši priče</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user mr-1'></i> Prijavite se
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin operacije' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Korisnici</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/category-tag'>
                    <NavDropdown.Item>kategorije i tagovi</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/blog'>
                    <NavDropdown.Item>Kreiraj novu priču</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              <LinkContainer to='/blogs'>
                <Nav.Link>
                  <i className='fas fa-newspaper mr-1'></i>Sve priče
                </Nav.Link>
              </LinkContainer>
              {userInfo && (
                <Nav.Link onClick={logoutHandler}>
                  <i className='fas fa-sign-out-alt mr-1'></i> Odjava
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
