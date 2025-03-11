// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { Form, Button, Row, Col } from 'react-bootstrap';

// export default function UpdateIssue() {
//   const [assetCriticality, setAssetCriticality] = useState("");
//   const [networkZone, setNetworkZone] = useState("");
//   const [Type, setType] = useState("");
//   const [dataClassification, setDataClassification] = useState("");
//   const [severity, setSeverity] = useState("");
//   const [epssPercentile, setEpsaa] = useState("");

//   const [exploitability, setExploitability] = useState("");
//   const [validationError, setValidationError] = useState({});
  
//   const { id } = useParams();
//   const [issueData, setIssueData] = useState([]);
//   const navigate = useNavigate();



//   useEffect(() => {
//     if (id) {
//         axios.get(`http://localhost:8000/api/details/${id}`).then(({ data }) => {
//             // console.log("new_data", data);
//             setIssueData(data.issue);

//             setAssetCriticality(data.asset_criticality);
//             setNetworkZone(data.network_zone);
//             setType(data.type);
//             setDataClassification(data.data_classification);
//             setSeverity(data.severity);
//             setEpsaa(data.epss_percentile);

//             const initialExploitability = calculateExploitability(data);
//             setExploitability(initialExploitability);


//         })
//         .catch((error) => {
//           console.error('Error fetching data:', error);
//         });
//     }
// }, [id]);




// const updateIssue = async (e) => {
//   e.preventDefault();
//   const formData = new FormData();
    
//     console.log("assetCriticality",assetCriticality);
//     formData.append('asset_criticality', assetCriticality);
//     formData.append('network_zone', networkZone);
//     formData.append('type', Type);
//     formData.append('data_classification', dataClassification);
//     formData.append('id', id);
//     formData.append('severity', severity);
//     formData.append('epss_percentile',epssPercentile);

//     await axios.post(`http://localhost:8000/api/edit`, formData).then(({ data }) => {
      
//       Swal.fire({
//         icon: "success",
//         text: data.message
//       });
//       navigate('/',{replace: true});
//     }).catch(({ response }) => {
//       if (response.status === 422) {
//         setValidationError(response.data.errors);
//       } 
//       // else {
//       //   Swal.fire({
//       //     text: response.data.message,
//       //     icon: "error"
//       //   });
//       // }
//     });

//     await axios.post(`http://localhost:8000/api/edit`, formData).then(({ data }) => {
//       console.log("data",data)
//     }).catch(({ response }) => {
//       console.log(response)
//     });
//   };


//   const calculateExploitability = (data) => {
//     const average = (
//       vulnAsset(data.asset_criticality) +
//       vulnNet(data.network_zone) +
//       vulnEnv(data.type) +
//       vulnData(data.data_classification)
//     ) / 4;


//     const severityScore = vulnSeverityScore(data.severity);
//     const exploitabilityValue = average * severityScore;
//     return exploitabilityValue;
//   };

//   const vulnSeverityScore = (severity) => {
//     switch (severity) {
//       case "1":
//       case "2":
//         return 50; // High
//       case "3":
//         return 30; // Medium
//       case "4":
//         return 20; // Low
//       default:
//         return 1; // Default value
//     }
//   };

//   const vulnAsset = (asset_criticality) => {
//     switch (asset_criticality) {
//       case "1":
//         return 5;
//       case "2":
//         return 3;
//       case "3":
//         return 2;
//       default:
//         return 0;
//     }
//   };

//   const vulnNet = (network_zone) => {
//     switch (network_zone) {
//       case "1":
//         return 5;
//       case "2":
//         return 10;
//       default:
//         return 0;
//     }
//   };

//   const vulnEnv = (type) => {
//     switch (type) {
//       case "1":
//         return 7;
//       case "2":
//         return 2;
//       case "3":
//         return 1;
//       default:
//         return 0;
//     }
//   };

//   const vulnData = (data_classification) => {
//     switch (data_classification) {
//       case "1":
//         return 6;
//       case "2":
//         return 4;
//       case "3":
//         return 0;
//       default:
//         return 0;
//     }
//   };


  

//   return (
//     <div className="container">
//       <div className="row justify-content-center">
//         <div className="col-12 col-sm-12 col-md-6">
//           <div className="card">
//             <div className="card-body">
//               <div className="form-wrapper">
//                 <Form onSubmit={updateIssue}>
//                   <><Row>
//                       <h4 className="card-title">Update Issue Exploitability: </h4>
//                       <h6>{}</h6>
//                       <hr />  
//                         <Col>
//                           <Form.Group controlId="AssetCriticality">
//                             <Form.Label>Asset Criticality</Form.Label>
//                             <Form.Control as="select" defaultValue={assetCriticality} onChange={(event) => setAssetCriticality(event.target.value)}>
//                               <option value="1">High</option>
//                               <option value="2">Medium</option>
//                               <option value="3">Low</option>
//                             </Form.Control>
//                           </Form.Group>
//                         </Col>
//                       </Row><Row className="my-3">
//                         <Col>
//                           <Form.Group controlId="NetworkZone">
//                             <Form.Label>Network Zone</Form.Label>
//                             <Form.Control as="select" value={networkZone} onChange={(event) => setNetworkZone(event.target.value)}>
//                               <option value="1">Internal</option>
//                               <option value="2">External</option>
//                             </Form.Control>
//                           </Form.Group>
//                         </Col>
//                       </Row><Row className="my-3">
//                         <Col>
//                           <Form.Group controlId="Type">
//                             <Form.Label>Environment Type</Form.Label>
//                             <Form.Control as="select" value={Type} onChange={(event) => setType(event.target.value)}>
//                               {/* <option value="" default selected>{getLabel(type)}</option> */}
//                               <option value="1">Production</option>
//                               <option value="2">UAT</option>
//                               <option value="3">Dev</option>
//                             </Form.Control>
//                           </Form.Group>
//                         </Col>
//                       </Row><Row className="my-3">
//                         <Col>
//                           <Form.Group controlId="DataClassification">
//                             <Form.Label>Data Classification</Form.Label>
//                             <Form.Control as="select" value={dataClassification} onChange={(event) => setDataClassification(event.target.value)}>
//                               {/* <option value="" default selected>{getDataLabel()}</option> */}
//                               <option value="1">Private</option>
//                               <option value="2">Restricted</option>
//                               <option value="3">Public</option>
//                             </Form.Control>
//                           </Form.Group>
//                         </Col>
//                       </Row>
//                       <Row className="my-3">
//                         <Col>
//                           <Form.Group controlId="Severity">
//                             <Form.Label>Severity</Form.Label>
//                             <Form.Control as="select" value={severity} onChange={(event) => setSeverity(event.target.value)}>
//                               {/* <option value="" default selected>{getSLabel(severity)}</option> */}
//                               <option value="1">High</option>
//                               <option value="3">Medium</option>
//                               <option value="4">Low</option>
//                             </Form.Control>
//                           </Form.Group>
//                         </Col>
//                       </Row><Row className="my-3">
//                         <Col>
//                           <Form.Group controlId="epssPercentile">
//                             <Form.Label>Epss Percentile</Form.Label>
//                             <Form.Control as="select" value={epssPercentile} onChange={(event) => setEpsaa(event.target.value)}>
//                               {/* <option value="" default selected>{epss_percentile}</option> */}
//                               <option value="1">Private</option>
//                               <option value="2">Restricted</option>
//                               <option value="3">Public</option>
//                             </Form.Control>
//                           </Form.Group>
//                         </Col>
//                       </Row>
//                     </>
                        
                  
//                   <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
//                     Update
//                   </Button>
//                 </Form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function UpdateIssue() {
  const [formData, setFormData] = useState({
    id : '',
    asset_criticality: '',
    network_zone: '',
    type: '',
    data_classification: '',
    severity: '',
    epss_percentile: '',
    exploitability: '0'
  });
  
  
  const { id } = useParams();
  
  

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/details/${id}`)
        .then(({ data }) => {
          setFormData({
            id: data.issue[0].id,
            asset_criticality: data.issue[0].asset_criticality,
            network_zone: data.issue[0].network_zone,
            type: data.issue[0].type,
            data_classification: data.issue[0].data_classification,
            severity: data.issue[0].severity,
            epss_percentile: data.issue[0].epss_percentile,
            exploitability: data.issue[0].overall_risk_score
          })
          
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [id]);
  const calculateExploitability = (
    asset_criticality,
    network_zone,
    type,
    data_classification,
    severity
  ) => {
    const average =
      (vulnAsset(asset_criticality) +
        vulnNet(network_zone) +
        vulnEnv(type) +
        vulnData(data_classification)) /
      4;
    const exploitabilityValue = average * vulnSeverityScore(severity);
    
    // setFormData.exploitability=exploitabilityValue;

    setFormData((prevFormData) => ({
      ...prevFormData,
      exploitability: exploitabilityValue,
    }));

    console.log("ASSET",vulnAsset(asset_criticality));
    console.log("net",vulnNet(network_zone));
    console.log("type",vulnEnv(type));
    console.log("data_class",vulnData(data_classification));
    console.log("SEVERITY",(severity));
    console.log("sev_Value",vulnSeverityScore(severity));

  };

  const vulnSeverityScore = (severity) => {
    
    let  score =0;
    switch (severity) {
      case 1:
        score = 50;
        break
      case 2:
        score = 50;
        break
      case 3:
        score = 30;
        break
      case 4:
        score = 20;
        break
      default:
        score = 0;
    }
    return score;
    // if (severity===1){
    //   return 50;
    // }else if (severity===3){
    //   return 30; // Medium
    // }else if (severity===4){
    //   return 20; // Low
    // }
  };

  const vulnAsset = (asset_criticality) => {
    switch (asset_criticality) {
      case '1':
        return 5;
      case '2':
        return 3;
      case '3':
        return 2;
      default:
        return 0;
    }
  };

  const vulnNet = (network_zone) => {
    switch (network_zone) {
      case '1':
        return 5;
      case '2':
        return 10;
      default:
        return 0;
    }
  };

  const vulnEnv = (type) => {
    switch (type) {
      case '1':
        return 7;
      case '2':
        return 2;
      case '3':
        return 1;
      default:
        return 0;
    }
  };

  const vulnData = (data_classification) => {
    switch (data_classification) {
      case '1':
        return 6;
      case '2':
        return 4;
      case '3':
        return 0;
      default:
        return 0;
    }
  };

  const handleOptionChange = (event) => {
    const { name, value } = event.target;
    
    console.log("event_name",name);
    console.log("event_value",value);
 
    if((name==='asset_criticality')){
      formData.asset_criticality = value;
    }else if((name==='network_zone')){
      formData.network_zone = value;
    }else if((name==='type')){
      formData.type = value;
    }else if((name==='data_classification')){
      formData.data_classification = value;
    }else if((name==='severity')){
      formData.severity=  Number(value);
    }else if((name==='epss_percentile')){
      formData.epss_percentile = value;
    }

    // console.log("update",updatedFormData);

    // setFormData({
    //     asset_criticality: updatedFormData.asset_criticality,
    //     network_zone: updatedFormData.network_zone,
    //     type: updatedFormData.type,
    //     data_classification: updatedFormData.data_classification,
    //     severity: updatedFormData.severity,
    //     epss_percentile: updatedFormData.epss_percentile
    // });
    // setFormData(updatedFormData);

    console.log("FromData gg",formData);

    calculateExploitability(
      formData.asset_criticality,
      formData.network_zone,
      formData.type,
      formData.data_classification,
      formData.severity
      );
    };
  const updateIssue = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:8000/api/edit`, formData).then(({ data }) => {
        Swal.fire({
          text: data.message,
          icon: 'success',
          data: 'average'
          
        });
        window.location.reload(true);
        // console.log("update_gggggggggg",data)
        // navigate('/', { replace: true });
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          return(response.data.errors);
        }
      });
  };

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-5 col-md-12">
          <div className="card border-2 shadow-sm">
            <div className="card-body">
              <div className="form-wrapper">
                <Form onSubmit={updateIssue} style={{marginBottom:'5px'}}>
              
                  <div className='text-center col-xs-4'>
                <h2 className="">Update Issue </h2>
                    <h3 className='card-subtitle text-center'>Overall Risk Score : {formData.exploitability} </h3>
                  </div>
                  <Row className='mb-3'>
                    <Col>
                      <Form.Label>Asset Criticality</Form.Label>
                        <Form.Control as="select" name="asset_criticality" value={formData.asset_criticality} onChange={handleOptionChange}>
                          <option value="" >Select</option>
                          <option value="1">High</option>
                          <option value="2">Medium</option>
                          <option value="3">Low</option>
                      </Form.Control>
                      
                    </Col>
                    <Col>
                      <Form.Group controlId="network_zone">
                        <Form.Label>Network Zone</Form.Label>
                        <Form.Control as="select" name="network_zone" value={formData.network_zone} onChange={handleOptionChange}>
                          <option value="">Select</option>
                          <option value="1">Internal</option>
                          <option value="2">External</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="type">
                        <Form.Label>Environment Type</Form.Label>
                        <Form.Control as="select" name="type" value={formData.type} onChange={handleOptionChange}>
                          <option value="">Select</option>
                          <option value="1">Production</option>
                          <option value="2">UAT</option>
                          <option value="3">Dev</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="data_classification">
                        <Form.Label>Data Classification</Form.Label>
                        <Form.Control as="select" name="data_classification" value={formData.data_classification} onChange={handleOptionChange}>
                          <option value="">Select</option>
                          <option value="1">Private</option>
                          <option value="2">Restricted</option>
                          <option value="3">Public</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="severity">
                        <Form.Label>Severity</Form.Label>
                        <Form.Control as="select" name="severity" value={formData.severity} onChange={handleOptionChange}>
                          <option value="">Select</option>
                          <option value="1">Critical</option>
                          <option value="2">High</option>
                          <option value="3">Medium</option>
                          <option value="4">Low</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="epss_percentile">
                        <Form.Label>Epss Percentile</Form.Label>
                        <Form.Control as="select" name="epss_percentile" value={formData.epss_percentile} onChange={handleOptionChange}>
                          <option value="">{formData.epss_percentile}</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                  <div style={{marginLeft:'47%'}}>
                    <Button variant="primary" className="mt-2" size="lg" block="block" type="submit" refresh="true">
                      Update
                    </Button>
                  </div>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}





// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { Form, Button, Row, Col } from 'react-bootstrap';
// import { useParams,useNavigate } from 'react-router-dom';


// export default function UpdateComponent() {

//   const [asset_criticality, setasset_criticality] = useState('');
//     const [network_zone, setnetwork_zone] = useState('');
//     const [type, setType] = useState('');
//     const [data_classification, setdata_classification] = useState('');
//     const [severity, setSeverity] = useState('');
//     const [epss_percentile, setEpsaa] = useState('');
  
//     const [exploitability, setExploitability] = useState(0);
//     const [validationError, setValidationError] = useState({});
    
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         asset_criticality: '',
//         network_zone: '',
//         type: '',
//         data_classification: '',
//         severity: '',
//         epss_percentile: ''
//     });
//     // const { id } = useParams();


//     const calculateExploitability = (
//           asset_criticality,
//           network_zone,
//           type,
//           data_classification,
//           severity
//         ) => {
//           const average =
//             (vulnAsset(asset_criticality) +
//               vulnNet(network_zone) +
//               vulnEnv(type) +
//               vulnData(data_classification)) /
//             4;
//           const severityScore = vulnSeverityScore(severity);
//           const exploitabilityValue = average * severityScore;
//           setExploitability(exploitabilityValue);
//         };

//     const vulnSeverityScore = (severity) => {
//           switch (severity) {
//             case '1':
//             case '2':
//               return 50; // High
//             case '3':
//               return 30; // Medium
//             case '4':
//               return 20; // Low
//             default:
//               return 1; // Default value
//           }
//         };
      
//         const vulnAsset = (asset_criticality) => {
//           switch (asset_criticality) {
//             case '1':
//               return 5;
//             case '2':
//               return 3;
//             case '3':
//               return 2;
//             default:
//               return 0;
//           }
//         };
      
//         const vulnNet = (network_zone) => {
//           switch (network_zone) {
//             case '1':
//               return 5;
//             case '2':
//               return 10;
//             default:
//               return 0;
//           }
//         };
      
//         const vulnEnv = (type) => {
//           switch (type) {
//             case '1':
//               return 7;
//             case '2':
//               return 2;
//             case '3':
//               return 1;
//             default:
//               return 0;
//           }
//         };
      
//         const vulnData = (data_classification) => {
//           switch (data_classification) {
//             case '1':
//               return 6;
//             case '2':
//               return 4;
//             case '3':
//               return 0;
//             default:
//               return 0;
//           }
//         };

    
//     useEffect(() => {
//         // Fetch data for the specified ID and populate the form
//         axios.get(`http://localhost:8000/api/details/${id}`).then(({ data }) => {
//             const { asset_criticality, network_zone, type, data_classification, severity } = data.issue;
//             setFormData({ asset_criticality, network_zone, type, data_classification, severity });
//             calculateExploitability(
//                           data.asset_criticality,
//                           data.network_zone,
//                           data.type,
//                           data.data_classification,
//                           data.severity
//                         );
//         }).catch(error => {
//             console.error('Error fetching data:', error);
//         });
//     }, [id]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post(`http://localhost:8000/api/edit/${id}`, formData);
//             Swal.fire({
//                 icon: 'success',
//                 text: 'Issue updated successfully!'
//             });
//         } catch (error) {
//             Swal.fire({
//                 icon: 'error',
//                 text: 'Failed to update issue!'
//             });
//         }
//     };

//     const handleOptionChange = (event) => {
//       const { name, value } = event.target;
//       switch (name) {
//         case 'asset_criticality':
//           setasset_criticality(value);
//           break;
//         case 'network_zone':
//           setnetwork_zone(value);
//           break;
//         case 'type':
//           setType(value);
//           break;
//         case 'data_classification':
//           setdata_classification(value);
//           break;
//         case 'severity':
//           setSeverity(value);
//           break;
//         default:
//           break;
//       }
//       calculateExploitability(asset_criticality, network_zone, type, data_classification, severity);
//     };

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-12">
//                     <h2>Update Issue</h2>
//                     <form onSubmit={handleSubmit}>

//                     <h4 className="card-title">Update Issue Exploitability: {exploitability}</h4>
//                      <hr />
//                           <Row>
//                             <Col>
//                                 <Form.Group controlId="asset_criticality">
//                                     <Form.Label>Asset Criticality</Form.Label>
//                                     <Form.Control as="select" name="asset_criticality" value={formData.asset_criticality} onChange={handleOptionChange}>
//                                         <option value="" disabled>Select</option>
//                                         <option value="1">High</option>
//                                         <option value="2">Medium</option>
//                                         <option value="3">Low</option>
//                                     </Form.Control>
//                                 </Form.Group>
//                             </Col>
//                             <Col>
//                                 <Form.Group controlId="network_zone">
//                                     <Form.Label>Network Zone</Form.Label>
//                                     <Form.Control as="select" name="network_zone" value={formData.network_zone} onChange={handleOptionChange}>
//                                         <option value="" disabled>Select</option>
//                                         <option value="1">Internal</option>
//                                         <option value="2">External</option>
//                                     </Form.Control>
//                                 </Form.Group>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col>
//                                 <Form.Group controlId="type">
//                                     <Form.Label>Environment Type</Form.Label>
//                                     <Form.Control as="select" name="type" value={formData.type} onChange={handleOptionChange}>
//                                         <option value="" disabled>Select</option>
//                                         <option value="1">Production</option>
//                                         <option value="2">UAT</option>
//                                         <option value="3">Dev</option>
//                                     </Form.Control>
//                                 </Form.Group>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col>
//                                 <Form.Group controlId="data_classification">
//                                     <Form.Label>Data Classification</Form.Label>
//                                     <Form.Control as="select" name="data_classification" value={formData.data_classification} onChange={handleOptionChange}>
//                                         <option value="1">Private</option>
//                                         <option value="2">Restricted</option>
//                                         <option value="3">Public</option>
//                                     </Form.Control>
//                                 </Form.Group>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col>
//                                 <Form.Group controlId="severity">
//                                     <Form.Label>Severity</Form.Label>
//                                     <Form.Control as="select" name="severity" value={formData.severity} onChange={handleOptionChange}>
//                                         <option value="1">High</option>
//                                         <option value="3">Medium</option>
//                                         <option value="4">Low</option>
//                                     </Form.Control>
//                                 </Form.Group>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col>
//                                 <Form.Group controlId="epss_percentile">
//                                     <Form.Label>Epss Percentile</Form.Label>
//                                     <Form.Control as="select" name="epss_percentile" value={formData.epss_percentile} onChange={handleOptionChange}>
//                                         <option value="1">Private</option>
//                                         <option value="2">Restricted</option>
//                                         <option value="3">Public</option>
//                                     </Form.Control>
//                                 </Form.Group>
//                             </Col>
//                         </Row>
//                         <Button variant="primary" className="mt-2" size="lg" block type="submit">
//                             Update
//                         </Button>
                        
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }
