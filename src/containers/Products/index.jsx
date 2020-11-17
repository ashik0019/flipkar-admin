import React, { useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions';
import Layout from '../../components/Layout'
import Input from '../../components/UI/input';
import Modal from '../../components/UI/Modal';
import { generatePublicUrl } from '../../urlConfig';
import './style.css'

/**
* @author
* @function Products
**/

const Products = (props) => {
  const [productDetailsModal, setproductDetailsModal] = useState(false);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productPictures, setProductPictures] = useState([]);
  const [show, setShow] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  const category = useSelector(state => state.category);
  const product = useSelector(state => state.product);
  const dispatch = useDispatch();

  //add form data
  const handleClose = () => {
    const form = new FormData();
    form.append('name', name);
    form.append('quantity', quantity);
    form.append('price', price);
    form.append('description', description);
    form.append('category', categoryId);

    for (let pic of productPictures) {
      form.append('productPicture', pic);
    }

    dispatch(addProduct(form));
    setShow(false);
  }

  const handleShow = () => setShow(true);

  //get category list
  const createCategoryList = (categories, options = []) => {

    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    }

    return options;
  }

  //product picture handler function........................
  const handleProductPictures = (e) => {
    setProductPictures([
      ...productPictures,
      e.target.files[0]
    ]);
  }

  //table data return from here....................................
  const renderProducts = () => {
    return (

      <Table responsive="sm" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>

          </tr>
        </thead>
        <tbody>
          {
            product.products.length > 0 ?
              product.products.map((product, index) =>
                <tr key={product._id} onClick={() => showProductDetailsModal(product)}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>
                </tr>
              ) : null
          }


        </tbody>
      </Table>
    )
  }

  // add product modal render here............
  const renderAddProductModal = () => {
    return (
      <Modal show={show} handleClose={handleClose} modalTitle={`Add New Product`}>
        <Input
          label="Name"
          value={name}
          placeholder={`Product Name`}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Quantity"
          value={quantity}
          placeholder={`Quantity`}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="Price"
          value={price}
          placeholder={`Price`}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          placeholder={`Description`}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-control mb-3"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}>
          <option>select category</option>
          {
            createCategoryList(category.categories).map(option =>
              <option key={option.value} value={option.value}>{option.name}</option>)
          }
        </select>
        {
          productPictures.length > 0 ?
            productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
        }
        <label>Add Multiple Images</label> <br />
        <input type="file" name="productPicture" onChange={handleProductPictures} />
      </Modal>
    )
  }

  //product details modal 
  const showProductDetailsModal = (product) => {
    setproductDetailsModal(true)
    setProductDetails(product)
  }
  const handleCloseProductDetailsModal = () => {
    setproductDetailsModal(false)
  }
  const renderProductsDetailModal = () => {
    if (!productDetails) {
      return null;
    }
    return (
      <Modal
        show={productDetailsModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={`Product Details`}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className={`key`}>Name: </label>
            <p className={`value`}>{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className={`key`}>Price: </label>
            <p className={`value`}>{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className={`key`}>Quantity: </label>
            <p className={`value`}>{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className={`key`}>Category: </label>
            <p className={`value`}>{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className={`key`}>Description: </label>
            <p className={`value`}>{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12" >
            <label className={`key`}>Products Images: </label>
            <div style={{ display: 'flex' }}>
              {
                productDetails.productPictures.map(picture =>
                  <div className="productImgContainer">
                    <img src={generatePublicUrl(picture.img)} alt="" />
                  </div>
                )
              }
            </div>
          </Col>
        </Row>
      </Modal>
    )
  }


  return (
    <Layout sidebar>
      <Container>
        <Row className="mb-3">
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Products</h3>
              <button className="btn btn-success" onClick={handleShow}>Add Product</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {renderProducts()}
          </Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductsDetailModal()}

    </Layout>
  )
}


export default Products
