import React from "react";
import { Link, useLocation } from "react-router-dom";
import {Col, Row } from "reactstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const BreadCrumb = (props) => {
  const location = useLocation();
  const { pathname } = location;

  const pathArray = pathname.split("/").filter((path) => path.trim() !== ''); 

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const generateBreadcrumbItems = () => {
    const breadcrumbItems = [];
    let pathUrl = '';

    breadcrumbItems.push({
      name: "Home",
      url: "/",
    });

    for (let i = 0; i < pathArray.length; i++) {
      if (pathArray[i] !== "product" ) {
        pathUrl += '/' + pathArray[i];
        const item = {
          name: capitalizeFirstLetter(pathArray[i]),
          url: pathUrl,
        };
      breadcrumbItems.push(item);
      }

      // if(!pathArray[i].includes('view')){
      //   pathUrl += "/" + pathArray[i];
      //   const item = {
      //     name: capitalizeFirstLetter(pathArray[i]),
      //     url: pathUrl,
      //   };
      //   breadcrumbItems.push(item);
      // }

    }
    return breadcrumbItems;
  };

  const breadcrumbItems = generateBreadcrumbItems();

  return (
    <React.Fragment>
      <ToastContainer />
      <Row>
        <Col xs={12}>
          <div className="page-title-box d-sm-flex justify-content-between">
            <div className="page-title-right">
              <ol className="breadcrumb m-2">
                {breadcrumbItems.map((item, key) => {
                  return (
                    <li key={key} className="breadcrumb-item active">
                      <Link to={item.url} style={{textDecoration:"none"}}>{item.name}</Link>
                      <br></br>
                    </li>
                  );
                })}
              </ol>
            </div>
            {/* {props.link && (
              <div className="live-preview">
                <Link to={props.link} title="Back">
                  <Button color="primary" className="btn-icon">
                    <i className="ri-skip-back-fill" />
                  </Button>
                </Link>
              </div>
            )} */}
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BreadCrumb;


