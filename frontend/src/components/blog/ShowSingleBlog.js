import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Button, Form } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {
  listProductDetails,
  createProductReview,
} from '../../actions/blogActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/blogConstants'
import DisqusThread from '../../components/DisqusThread'
import moment from 'moment'
import 'moment/locale/sr' // without this line it didn't work
import Rating from '../../components/blog/Rating'
moment.locale('sr')

const ShowSingleBlog = () => {
  const match = useRouteMatch()
  const [rating, setRating] = useState(0)

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { blog } = productDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
    }
    if (!blog.slug || blog.slug !== match.params.slug) {
      dispatch(listProductDetails(match.params.slug))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
  }, [dispatch, match, successProductReview, blog.slug])

  const blogBody = () => {
    return { __html: blog.body }
  }

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.slug, {
        rating,
      })
    )
  }

  const showComments = () => {
    return (
      <div className='shadow p-1'>
        <DisqusThread
          id={blog._id}
          title={blog.title}
          path={`/blogs/${blog.slug}`}
        />
      </div>
    )
  }

  /*const showBlogComments = blog =>
    blog.comments.map((comm, i) => (
      <p key={i} className='mt-3'>
        {comm.comment}
      </p>
    ))*/

  return (
    <>
      <div>
        <section>
          <div className='row'>
            <img
              src={`/api/blog/photo/${match.params.slug}`}
              alt={blog.title}
              className='img img-fluid featured-image'
            />
          </div>
        </section>
        <section>
          <div>
            <h3 className='pb-4 pt-5 text-center'>{blog.title}</h3>
            <hr />
          </div>
        </section>
        <div className='col-md-10 col-sm-12 mx-auto px-1'>
          <section>
            <div
              dangerouslySetInnerHTML={blogBody()}
              className='col-md-12 lead contentDiv'
            ></div>
          </section>
          <div className='py-5'>{showComments()}</div>
          {/*showBlogComments(blog)*/}
          <hr />
          <div className='my-3 text-right pr-2'>
            <Rating
              value={blog.rating}
              text={` br. ocena: ${blog.numReviews}`}
            />
          </div>
        </div>
        <Row>
          <Col md={4} className='shadow p-3'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h4>Ocenite priču</h4>
                {successProductReview && (
                  <Message variant='success'>Ocena uspešno dodata</Message>
                )}
                {loadingProductReview && <Loader />}
                {errorProductReview && (
                  <Message variant='danger'>{errorProductReview}</Message>
                )}
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId='rating'>
                      <Form.Label>Ocene</Form.Label>
                      <Form.Control
                        as='select'
                        value={rating}
                        onChange={e => setRating(e.target.value)}
                      >
                        <option value=''>Odaberite ocenu</option>
                        <option value='1'>1 - Veoma loša</option>
                        <option value='2'>2 - Loša</option>
                        <option value='3'>3 - Dobra</option>
                        <option value='4'>4 - Veoma dobra</option>
                        <option value='5'>5 - Fenomenalna</option>
                      </Form.Control>
                    </Form.Group>
                    <Button
                      disabled={loadingProductReview}
                      type='submit'
                      variant='primary'
                    >
                      prihvati
                    </Button>
                  </Form>
                ) : (
                  <Message>
                    Morate biti <Link to='/login'>PRIJAVLJENI</Link> da biste
                    ocenili priču{' '}
                  </Message>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default ShowSingleBlog
