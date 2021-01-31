import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className='container shadow my-5'>
      <Container>
        <Row>
          <Col className='text-center pt-5 pb-3'>
            blog_platforma &copy; srđan kljajević
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
