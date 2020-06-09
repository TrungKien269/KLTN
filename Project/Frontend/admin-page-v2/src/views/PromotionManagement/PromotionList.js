import React, { useState, useEffect, useMemo } from "react";
import Axios from "axios";
import { getToken } from "../../Utils/Commons";
import { Button, Loader } from "semantic-ui-react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";

const PromotionLList = () => {
  const [listPromo, setListPromo] = useState();

  useEffect(() => {
    Axios({
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      method: "get",
      url: "http://localhost:5000/api/Admin/ListPromotion",
    }).then((res) => {
      if (res.status) {
        setListPromo(res.data.obj);
      }
    });
  }, []);

  const showListPromo = useMemo(() => {
    var x = "";
    var results = "";
    if (listPromo) {
      x = listPromo.map((data) => {
        var linktodetail = `/promotionmanagement/${data.id}`;
        var d = data.promotionDetail;
        results = d.map((da) => {
          return <div key={da.book.id}>{da.book.name}</div>;
        });

        return (
          <tr key={data.id}>
            <td>{data.id}</td>
            <td>{data.description}</td>
            <td>{data.endedDate.replace("T", " ")}</td>
            <td>
              {data.isExpired ? (
                <Badge color="success">Active</Badge>
              ) : (
                <Badge color="secondary">Disabled</Badge>
              )}
            </td>
            <td>
              <Button.Group size="mini">
                <Button positive>Update</Button>
                <Button.Or text="or" />
                <Link to={linktodetail}>
                  <Button>Detail</Button>
                </Link>
              </Button.Group>
            </td>
          </tr>
        );
      });
    }
    return x;
  }, [listPromo]);

  // console.log(showListPromo);

  if (listPromo) {
    return (
      <div>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i> List Promotion
          </CardHeader>
          <CardBody>
            <Table responsive>
              <thead>
                <tr>
                  <th>Promotion ID</th>
                  <th>Description</th>
                  <th>Ended day</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{showListPromo}</tbody>
            </Table>
            <Pagination>
              <PaginationItem>
                <PaginationLink previous tag="button"></PaginationLink>
              </PaginationItem>
              <PaginationItem active>
                <PaginationLink tag="button">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag="button">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag="button">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag="button">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next tag="button"></PaginationLink>
              </PaginationItem>
            </Pagination>
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="d-flex align-items-center h-100">
        <Loader active inline="centered" />
      </div>
    );
  }
};
export default PromotionLList;
