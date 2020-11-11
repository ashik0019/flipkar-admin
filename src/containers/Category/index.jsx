import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, getAllCatgory } from '../../actions'
import Layout from '../../components/Layout'
import Input from '../../components/UI/input'

/**
* @author
* @function Category
**/

const Category = (props) => {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const category = useSelector(state => state.category)
  const dispatch = useDispatch();




  useEffect(() => {
    dispatch(getAllCatgory())
  }, [])

  //modal open close function........................
  const handleClose = () => {
    const form = new FormData();

    form.append('name', categoryName)
    form.append('parentId', parentCategoryId)
    form.append('categoryImage', categoryImage)
    dispatch(addCategory(form));
    // const cat  = {
    //   // categoryName,
    //   // parentCategoryId,
    //   // categoryImage
    // }
    //console.log(cat)

    setShow(false)
  };
  const handleShow = () => setShow(true);

  //data map or recursive................................
  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.name}
          {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
        </li>
      );
    }
    return myCategories;
  }

  //category list
  const createCategoryList = (categories, options = []) => {
    for(let category of categories){
      options.push({value: category._id, name: category.name})
      if(category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    }
    return options;
  }

//image handler 
  const handelCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);

  }



  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Category</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ul>
              {renderCategories(category.categories)}
            </ul>
          </Col>
        </Row>
      </Container>
      {/* ....................modal start........................................ */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            value={categoryName}
            placeholder={`Category Name`}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <select value={parentCategoryId} className="form-control" onChange={(e) => setParentCategoryId(e.target.value)}>
            <option value="">Select Category </option>
            {
              createCategoryList(category.categories).map(option => 
              <option key={option.value} value={option.value}>{option.name}</option>)
            }
          </select>
          <input type="file" name="categoryImage" className="form-control-file mt-3" onChange={handelCategoryImage}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Add 
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ....................modal start........................................ */}
    </Layout>
  )
}


export default Category