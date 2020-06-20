import React from 'react';
import PromotionDetailPagination from './PromotionDetailPagination';

function PromotionDetail(props) {
  return (
    <PromotionDetailPagination
      itemsCountPerPage={20}
      pageRangeDisplayed={10}
      id={props.match.params.id}
    />
  )
}

export default PromotionDetail

// import React, { useState, useMemo, useEffect } from "react";
// import { Button } from "semantic-ui-react";
// import PromotionDetailForm from "./PromotionDetailForm";
// import {
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Badge,
//   Card,
//   CardBody,
//   CardHeader,
//   Pagination,
//   PaginationItem,
//   PaginationLink,
//   Row,
//   Col,
//   Form,
//   FormGroup,
//   Input,
//   Label,
//   Table,
// } from "reactstrap";
// import PromotionForm from "./PromotionForm";
// import Axios from "axios";
// import { getToken } from "../../Utils/Commons";
// const PromotionDetail = (props) => {
//   const [modalAdd, setModalAdd] = useState(false);
//   const [modalUpdate, setModalUpdate] = useState(false);

//   const [listDetails, setListDetails] = useState([]);
//   const [bookID, setBookID] = useState(null);
//   const [bookName, setBookName] = useState(null);
//   const [discount, setDiscount] = useState(0);

//   const toggleAdd = () => {
//     setModalAdd(!modalAdd);
//   }
//   const toggleUpdate = (data) => {
//     setModalUpdate(!modalUpdate);
//     if (modalUpdate === false) {
//       if (data) {
//         setBookName(data.book.name)
//         setBookID(data.bookId);
//         setDiscount(parseFloat(data.discount))
//       }
//     }
//   }

//   useEffect(() => {
//     Axios({
//       headers: {
//         Authorization: "Bearer " + getToken()
//       },
//       url: "http://localhost:5000/api/Admin/GetPromotion",
//       params: {
//         id: parseInt(props.match.params.id)
//       }
//     }).then(res => {
//       if (res.data.status) {
//         console.log(res.data.obj)
//         setListDetails(res.data.obj.promotionDetail);
//       }
//     })
//   }, []);

//   const showListDetail = useMemo(() => {
//     var listPromos = [];
//     if (listDetails) {
//       listPromos = listDetails.map((data) => {
//         return (
//           <tr>
//             <td>{data.bookId}</td>
//             <td>{data.book.name}</td>
//             <td>{parseFloat(data.discount)}</td>
//             <td>
//               <Button.Group size="mini">
//                 <Button onClick={() => toggleUpdate(data)}>Update</Button>
//                 <Button.Or text="or" />
//                 <Button negative onClick={(id) => handleDelete(data.bookId)}>Delete</Button>
//               </Button.Group>
//             </td>
//           </tr>
//         )
//       })
//     }
//     return listPromos;
//   }, [listDetails])

//   const handleDiscount = (e) => {
//     let value = e.target.value;
//     if (value) {
//       setDiscount(parseFloat(e.target.value))
//     }
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     Axios({
//       headers: {
//         Authorization: "Bearer " + getToken(),
//       },
//       url: "http://localhost:5000/api/Admin/UpdatePromotionDetail",
//       method: "put",
//       params: {
//         promotionID: parseInt(props.match.params.id),
//         bookID: bookID,
//         discount: parseFloat(discount)
//       }
//     }).then((res) => {
//       if (res.data.status) {
//         let detail = listDetails.find(x => x.bookId === bookID);
//         detail.discount = parseFloat(discount);

//         let index = listDetails.findIndex(x => x.bookId === bookID);
//         let newListDetail = listDetails;
//         newListDetail[index] = detail;

//         setListDetails((prev) => [...newListDetail]);
//       }
//     }).catch((err) => {
//       console.log(err)
//     })
//   }

//   const handleDelete = (bookId) => {
//     Axios({
//       headers: {
//         Authorization: "Bearer " + getToken(),
//       },
//       url: "http://localhost:5000/api/Admin/DeletePromotionDetail",
//       method: "delete",
//       params: {
//         promotionID: parseInt(props.match.params.id),
//         bookID: bookId,
//       }
//     }).then((res) => {
//       if (res.data.status) {
//         let newListDetail = listDetails;
//         newListDetail = newListDetail.filter((x) => x.bookId !== bookId);

//         setListDetails((prev) => [...newListDetail]);
//       }
//     }).catch((err) => {
//       console.log(err)
//     });
// }

// return (
//   <div>
//     <Modal isOpen={modalAdd} toggle={toggleAdd}>
//       <ModalHeader toggle={toggleAdd}>Add Promotion Detail</ModalHeader>
//       <ModalBody>
//         <PromotionDetailForm id={parseInt(props.match.params.id)}></PromotionDetailForm>
//       </ModalBody>
//     </Modal>

//     <Modal isOpen={modalUpdate} toggle={toggleUpdate}>
//       <ModalHeader toggle={toggleUpdate}>Update Promotion Detail</ModalHeader>
//       <ModalBody>
//         <Form className="form-horizontal" onSubmit={(e) => handleUpdate(e)}>
//           <FormGroup row>
//             <Col md="3">
//               <Label htmlFor="id-input">Book ID</Label>
//             </Col>
//             <Col md="6">
//               <Input
//                 required
//                 type="text"
//                 id="id-input"
//                 name="id-input"
//                 placeholder="Book ID"
//                 disabled
//                 value={bookID ? bookID : null}
//               />
//             </Col>
//             <Col md="3">
//               <Input
//                 required
//                 type="number"
//                 min="0"
//                 max="1"
//                 step="0.01"
//                 id="number-input"
//                 name="number-input"
//                 placeholder="discount"
//                 value={discount ? discount : 0}
//                 onChange={(e) => handleDiscount(e)}
//               />
//             </Col>
//           </FormGroup>
//           <FormGroup row>
//             <Col md="3">
//               <Label htmlFor="id-input">Book Title</Label>
//             </Col>
//             <Col xs="12" md="9">
//               <Input
//                 required
//                 type="text"
//                 id="id-input"
//                 name="id-input"
//                 placeholder="Book Title"
//                 disabled
//                 value={bookName ? bookName : null}
//               />
//             </Col>
//           </FormGroup>
//           <Button className="mr-1" type="submit" size="sm" color="primary">
//             <i className="fa fa-dot-circle-o"></i> Update
//             </Button>
//         </Form>
//       </ModalBody>
//     </Modal>

//     <Card>
//       <CardHeader className="d-flex justify-content-lg-between">
//         <span>
//           {" "}
//           <i className="fa fa-align-justify"></i> Promotion id : {props.match.params.id}
//         </span>

//         <Button.Group size="mini">
//           <Button positive onClick={toggleAdd}>
//             Add
//             </Button>
//         </Button.Group>
//       </CardHeader>
//       <CardBody>
//         <Table responsive>
//           <thead>
//             <tr>
//               <th>Book ID</th>
//               <th>Book name</th>
//               <th>Discount</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {showListDetail}
//           </tbody>
//         </Table>
//         <Pagination>
//           <PaginationItem>
//             <PaginationLink previous tag="button"></PaginationLink>
//           </PaginationItem>
//           <PaginationItem active>
//             <PaginationLink tag="button">1</PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationLink tag="button">2</PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationLink tag="button">3</PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationLink tag="button">4</PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationLink next tag="button"></PaginationLink>
//           </PaginationItem>
//         </Pagination>
//       </CardBody>
//     </Card>
//   </div>
// );
// };
// export default PromotionDetail;
