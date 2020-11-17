import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, getAllCatgory } from '../../actions'
import Layout from '../../components/Layout';
import Input from '../../components/UI/input';
import Modal from '../../components/UI/Modal';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowDown,
  IoIosArrowForward
} from "react-icons/io";

/**
* @author
* @function Category
**/

const Category = (props) => {
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const category = useSelector(state => state.category)
  const dispatch = useDispatch();





  //modal open close function........................
  const handleClose = () => {
    const form = new FormData();

    form.append('name', categoryName)
    form.append('parentId', parentCategoryId)
    form.append('categoryImage', categoryImage)
    dispatch(addCategory(form));
    setCategoryName('')
    setParentCategoryId('')
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
        {
          label: category.name,
          value: category._id,
          children: category.children.length > 0 && renderCategories(category.children)
        }
      );
    }
    return myCategories;
  }

  //category list
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name })
      if (category.children.length > 0) {
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
              <button className="btn btn-success" onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/* <ul>
              {renderCategories(category.categories)}
            </ul> */}
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={checked => setChecked(checked)}
              onExpand={expanded => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline/>,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          </Col>
        </Row>
      </Container>
      {/* ....................modal start........................................ */}
      <Modal modalTitle={"Add New Category"} show={show} handleClose={handleClose} >
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
        <input type="file" name="categoryImage" className="form-control-file mt-3" onChange={handelCategoryImage} />
      </Modal>
      {/* ....................modal start........................................ */}
    </Layout>
  )
}


export default Category
