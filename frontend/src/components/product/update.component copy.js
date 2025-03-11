
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { Form, Button, Row, Col } from 'react-bootstrap';

// export default function UpdateIssue() {
//   const [formData, setFormData] = useState({
//     id : '',
//     asset_criticality: '',
//     network_zone: '',
//     type: '',
//     data_classification: '',
//     severity: '',
//     epss_percentile: '',
//     exploitability: '0'
//   });
//   const [validationError, setValidationError] = useState({});
  
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (id) {
//       axios.get(`http://localhost:8000/api/details/${id}`)
//         .then(({ data }) => {
//           setFormData({
//             id: data.issue[0].id,
//             asset_criticality: data.issue[0].asset_criticality,
//             network_zone: data.issue[0].network_zone,
//             type: data.issue[0].type,
//             data_classification: data.issue[0].data_classification,
//             severity: data.issue[0].severity,
//             epss_percentile: data.issue[0].epss_percentile,
//             exploitability: data.issue[0].overall_risk_score
//           })
          
//         })
//         .catch((error) => {
//           console.error('Error fetching data:', error);
//         });
//     }
//   }, [id]);
//   console.log('formData', formData)
//   const calculateExploitability = (
//     asset_criticality,
//     network_zone,
//     type,
//     data_classification,
//     severity
//   ) => {
//     const average =
//       (vulnAsset(asset_criticality) +
//         vulnNet(network_zone) +
//         vulnEnv(type) +
//         vulnData(data_classification)) /
//       4;
//     const exploitabilityValue = average * vulnSeverityScore(severity);
    
//     setFormData.exploitability=exploitabilityValue;

//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       exploitability: exploitabilityValue,
//     }));
//     console.log("SEVERITY",vulnSeverityScore(severity));
//     console.log("ASSET",vulnAsset(asset_criticality));
//     console.log("net",vulnNet(network_zone));
//     console.log("type",vulnEnv(type));
//     console.log("data_class",vulnData(data_classification));

//   };

//   const vulnSeverityScore = (severity) => {
//     if (severity===1){
//       return 50;
//     }else if (severity===3){
//       return 30; // Medium
//     }else if (severity===4){
//       return 20; // Low
//     }
//   };

//   const vulnAsset = (asset_criticality) => {
//     switch (asset_criticality) {
//       case '1':
//         return 5;
//       case '2':
//         return 3;
//       case '3':
//         return 2;
//       default:
//         return 0;
//     }
//   };

//   const vulnNet = (network_zone) => {
//     switch (network_zone) {
//       case '1':
//         return 5;
//       case '2':
//         return 10;
//       default:
//         return 0;
//     }
//   };

//   const vulnEnv = (type) => {
//     switch (type) {
//       case '1':
//         return 7;
//       case '2':
//         return 2;
//       case '3':
//         return 1;
//       default:
//         return 0;
//     }
//   };

//   const vulnData = (data_classification) => {
//     switch (data_classification) {
//       case '1':
//         return 6;
//       case '2':
//         return 4;
//       case '3':
//         return 0;
//       default:
//         return 0;
//     }
//   };

//   const handleOptionChange = (event) => {
//     const { name, value } = event.target;
    
//     console.log("event_name",name);
//     console.log("event_value",value);

//     const updatedFormData = Object.assign({},formData);
      
//     if((name==='asset_criticality')){

//       updatedFormData.asset_criticality = value;
//     }else if((name==='network_zone')){
//       updatedFormData.network_zone = value;
//     }else if((name==='type')){
//       updatedFormData.type = value;
//     }else if((name==='data_classification')){
//       updatedFormData.data_classification = value;
//     }else if((name==='severity')){
//       updatedFormData.severity= value;
//     }else if((name==='epss_percentile')){
//       updatedFormData.epss_percentile = value;
//     }

//     setFormData(updatedFormData);

//     calculateExploitability(
//       updatedFormData.asset_criticality,
//       updatedFormData.network_zone,
//       updatedFormData.type,
//       updatedFormData.data_classification,
//       updatedFormData.severity
//       );
//     };
//   const updateIssue = async (e) => {
//     e.preventDefault();
//     await axios.post(`http://localhost:8000/api/edit`, formData).then(({ data }) => {
//         Swal.fire({
//           text: data.message,
//           icon: 'success',
//           data: 'average'
//         });
//         navigate('/', { replace: true });
//       })
//       .catch(({ response }) => {
//         if (response.status === 422) {
//           setValidationError(response.data.errors);
          
//         }
//       });
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center">
//         <div className="col-12 col-sm-12 col-md-6">
//           <div className="card">
//             <div className="card-body">
//               <div className="form-wrapper">
//                 <Form onSubmit={updateIssue}>
              
//                 <h4 className="card-title">Update Issue </h4>
              
//                   <h6 style={{marginLeft:'200px', marginBottom:'20px'}}>Overall Risk Score : {formData.exploitability}</h6><br></br>
//                   <Row>
//                     <Col>
//                       <Form.Label>Asset Criticality</Form.Label>
//                         <Form.Control as="select" name="asset_criticality" value={formData.asset_criticality} onChange={handleOptionChange}>
//                           <option value="" >Select</option>
//                           <option value="1">High</option>
//                           <option value="2">Medium</option>
//                           <option value="3">Low</option>
//                       </Form.Control>
                      
//                     </Col>
//                     <Col>
//                       <Form.Group controlId="network_zone">
//                         <Form.Label>Network Zone</Form.Label>
//                         <Form.Control as="select" name="network_zone" value={formData.network_zone} onChange={handleOptionChange}>
//                           <option value="">Select</option>
//                           <option value="1">Internal</option>
//                           <option value="2">External</option>
//                         </Form.Control>
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col>
//                       <Form.Group controlId="type">
//                         <Form.Label>Environment Type</Form.Label>
//                         <Form.Control as="select" name="type" value={formData.type} onChange={handleOptionChange}>
//                           <option value="">Select</option>
//                           <option value="1">Production</option>
//                           <option value="2">UAT</option>
//                           <option value="3">Dev</option>
//                         </Form.Control>
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col>
//                       <Form.Group controlId="data_classification">
//                         <Form.Label>Data Classification</Form.Label>
//                         <Form.Control as="select" name="data_classification" value={formData.data_classification} onChange={handleOptionChange}>
//                           <option value="">Select</option>
//                           <option value="1">Private</option>
//                           <option value="2">Restricted</option>
//                           <option value="3">Public</option>
//                         </Form.Control>
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col>
//                       <Form.Group controlId="severity">
//                         <Form.Label>Severity</Form.Label>
//                         <Form.Control as="select" name="severity" value={formData.severity} onChange={handleOptionChange}>
//                           <option value="">Select</option>
//                           <option value="1">High</option>
//                           <option value="2">High2</option>
//                           <option value="3">Medium</option>
//                           <option value="4">Low</option>
//                         </Form.Control>
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col>
//                       <Form.Group controlId="epss_percentile">
//                         <Form.Label>Epss Percentile</Form.Label>
//                         <Form.Control as="select" name="epss_percentile" value={formData.epss_percentile} onChange={handleOptionChange}>
//                           <option value="">{formData.epss_percentile}</option>
//                         </Form.Control>
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                   <Button variant="primary" className="mt-2" size="lg" block="block" type="submit" style={{marginLeft:'250px'}}>
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



import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ViewComponent() {
    const [issueData, setIssueData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8000/api/details/${id}`).then(({ data }) => {
                setIssueData(data.issue[0]);
                // console.log("new_data", issueData);
            });
        }
    }, [id]);
    
    const getAssetLabel = (asset_criticality) => {
        switch (asset_criticality) {
            case "1":
                return 'High';

            case "2":
                return 'Medium';
            
            case "3":
                return 'Low';

            default: 
                return 'NULL Data';
        }
    }

    const getNetworkLabel = (network_zone) => {
        switch (network_zone) {
            case "1":
                return 'Internal';

            case "2":
                return 'External';

            default: 
                return 'NULL Data';
        }
    }
    
    const getLabel = (type) => {
        console.log(typeof(type));
        switch (type) {
            case "1":
                return "Production";

            case "2":
                return "UAT";
            
            case "3":
                return "Dev";

            default: 
                return 'NULL Data';
        }
    }

    const getDataLabel = (data_classification) => {
        switch (data_classification) {
            case "1":
                return 'Private';

            case "2":
                return 'Restricted';

            case "3":
                return 'Public';

            default:
                return 'NULL Data';
        }
    }

    const getSeverityLabel = (severity) => {
        switch (severity) {

            case 1:
            case 2:
                return 'High';
            case 3:
                return 'Medium';
            case 4:
                return 'Low';
            default:
                return 'NULL Data';
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Issue Details</h2><br></br>
            {Object.keys(issueData).length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'  }}>
                        <div style={{ marginBottom: '20px', width: '100%', textAlign:'left' }}>
                            
                            <Link to={`/product/edit/${id}`} className='btn btn-success me-2' style={{ marginBottom:'30px'}}> Updat </Link>
                            <div>
                            <p><strong>Title:</strong> {issueData.title}</p>
                                <hr style={{ width: '100%', margin: '10px 0' }} />
                            <p><strong>Application Name:</strong> {issueData.ip}</p>
                                <hr style={{ width: '100%', margin: '10px 0' }} />
                            <p><strong>Threat:</strong> {issueData.threat}</p>
                                <hr style={{ width: '100%', margin: '10px 0' }} />
                            <p><strong>CVE ID/s:</strong> {issueData.cve_id}</p>
                                <hr style={{ width: '100%', margin: '10px 0' }} />
                                <br></br><br></br>

                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div style={{ flex: 1 }}>
                                    <p><strong>Issue Category:</strong> {issueData.issue_category}</p>
                                    <p><strong>Assessment Type:</strong> {issueData.assessment_type}</p>
                                    <p><strong>Category:</strong> {issueData.category}</p>
                                    <p><strong>Initial Closure Date:</strong> {issueData.initial_closure_date}</p>
                                    <p><strong>Action Owner:</strong> {issueData.action_owner}</p>
                                    <p><strong>Issue Status:</strong> {issueData.tester_status}</p>
                                    <p><strong>Overall Risk Score:</strong> {issueData.overall_risk_score}</p>
                                    <p><strong>Severity:</strong>{getSeverityLabel(issueData.severity)}</p>
                                    <p><strong>Exploitability:</strong> {issueData.exploitability}</p>
                                    <p><strong>DNS:</strong> {issueData.dns}</p>
                                    <p><strong>NetBIOS:</strong> {issueData.net_bios}</p>
                                    <p><strong>QID:</strong> {issueData.qid}</p>
                                    <p><strong>ENV Type:</strong> {getLabel(issueData.type)}</p>
                                    <p><strong>Port:</strong> {issueData.port}</p>
                                    <p><strong>Protocol:</strong> {issueData.protocol}</p>
                                    <p><strong>First Discovered:</strong> {issueData.first_discovered}</p>
                                    <p><strong>Last Observed:</strong> {issueData.last_observed}</p>
                                    <p><strong>Vendor Reference:</strong> {issueData.vendor_reference}</p>
                                    <p><strong>Solution:</strong> {issueData.solution}</p>
                                    <p><strong>Plugin Output:</strong> {issueData.plugin_output}</p>
                                    <p><strong>MAC Address:</strong> {issueData.mac_address}</p>
                                    <p><strong>Synopsis:</strong> {issueData.synopsis}</p>
                                    <p><strong>Risk Factor:</strong> {issueData.risk_factor}</p>
                                    <p><strong>CVSS Base Score:</strong> {issueData.cvss_base_score}</p>
                                    <p><strong>CVSS Temporal Score:</strong> {issueData.cvss_temporal_score}</p>
                                    <p><strong>Vuln Publication Date:</strong> {issueData.vuln_publication_date}</p>
                                    <p><strong>Patch Publication Date:</strong> {issueData.patch_publication_date}</p>
                                    <p><strong>Exploit Ease:</strong> {issueData.exploit_ease}</p>
                                    <p><strong>Exploit Frameworks:</strong> {issueData.exploit_frameworks}</p>
                                </div>

                                <div style={{ flex: 1 }}>
                                    <p><strong>Initial Closure Date:</strong> {issueData.initial_closure_date}</p>
                                    <p><strong>Revised Closure Date:</strong> {issueData.revised_closure_date}</p>
                                    <p><strong>Tester Status:</strong> {issueData.tester_status}</p>
                                    <p><strong>Requestor Status:</strong> {issueData.requestor_status}</p>
                                    <p><strong>Issue Team:</strong> {issueData.issue_team}</p>
                                    <p><strong>L1 SPOC Name:</strong> {issueData.l1_spoc_name}</p>
                                    <p><strong>L1 SPOC Email:</strong> {issueData.l1_spoc_email}</p>
                                    <p><strong>L2 SPOC Name:</strong> {issueData.l2_spoc_name}</p>
                                    <p><strong>L2 SPOC Email:</strong> {issueData.l2_spoc_email}</p>
                                    <p><strong>Requestor Remark:</strong> {issueData.requestor_remark}</p>
                                    <p><strong>Tester Remark:</strong> {issueData.tester_remark}</p>
                                    <p><strong>Technology:</strong> {issueData.technology}</p>
                                    <p><strong>CISA CVE ID:</strong> {issueData.cisa_cve_id}</p>
                                    <p><strong>Artifact:</strong> {issueData.artifact}</p>
                                    <p><strong>Review Comment:</strong> {issueData.review_comment}</p>
                                    <p><strong>Asset Category:</strong> {issueData.asset_category}</p>
                                    <p><strong>Asset Type:</strong> {issueData.asset_type}</p>
                                    <p><strong>Hosting Location:</strong> {issueData.hosting_location}</p>
                                    <p><strong>Hosting Type:</strong> {issueData.hosting_type}</p>
                                    <p><strong>Is Date Updated:</strong> {issueData.is_date_updated}</p>
                                    <p><strong>Is Paused:</strong> {issueData.is_paused}</p>
                                    <p><strong>Is Deleted:</strong> {issueData.is_deleted}</p>
                                    <p><strong>Is Repeated:</strong> {issueData.is_repeated}</p>
                                    <p><strong>RAF Expiry Date:</strong> {issueData.raf_expiry_date}</p>
                                    <p><strong>Issue Submitted:</strong> {issueData.issue_submitted}</p>
                                    <p><strong>Created At:</strong> {issueData.created_at}</p>
                                    <p><strong>Updated At:</strong> {issueData.updated_at}</p>
                                    <p><strong>CWE ID:</strong> {issueData.cwe_id}</p>
                                    <p><strong>Network Zone:</strong>{getNetworkLabel(issueData.network_zone)}</p>
                                    <p><strong>Data Classification:</strong> {getDataLabel(issueData.data_classification)}</p>
                                    <p><strong>EPSS Percentile:</strong> {issueData.epss_percentile}</p>
                                    <p><strong>Asset Criticality:</strong>{getAssetLabel(issueData.asset_criticality)}</p>
                                    <hr style={{ width: '100%', margin: '10px 0' }} />
                                </div>
                            </div>
                            </div>
                        </div>
                    
                
                </div>
            ) : (
                <p>Loading issue data...</p>
                )}
        </div>
    );
}




