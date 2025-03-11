import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UpdateIssue from './update.component';
import '../../App.css';
import { GrUpdate } from "react-icons/gr";

export default function ViewComponent() {
    const [issueData, setIssueData] = useState([]);
    const { id } = useParams();

    const [showUpdateIssue, setShowUpdateIssue] = useState(false);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8000/api/details/${id}`).then(({ data }) => {
                setIssueData(data.issue[0]);
            });
        }

    }, [id]);

    const toggleUpdateIssue = () => {
        
        setShowUpdateIssue(!showUpdateIssue); 
    };
    
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
        <div className="view-issue-details-container">
        <h1 className='text-center'>Issue Details</h1>
        {Object.keys(issueData).length > 0 ? (
            <div className="issue-details-form">
                <div className='button' style={{marginBottom:"14px"}}>
                    <button className='btn btn-success me-2' style={{ marginBottom: '15px',marginLeft:"90%" }}  onClick={toggleUpdateIssue} refresh="true"><GrUpdate /></button>
                    {showUpdateIssue && <UpdateIssue />}
                </div>
                <form>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th>Title:</th>
                                    <td>{issueData.title}</td>
                                </tr>
                                <tr>
                                    <th>Application Name:</th>
                                    <td>{issueData.ip}</td>
                                </tr>
                                <tr>
                                    <th>Threat:</th>
                                    <td>{issueData.threat}</td>
                                </tr>
                                <tr>
                                    <th>CVE ID/s:</th>
                                    <td>{issueData.cve_id}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="gy-2 row">
                        <div className='col-md-6 col-xxl-6'>
                            <div className="table-responsive">
                                <table className="table table-table-border mb-0 table">
                                    <tbody>
                                        <tr>
                                            <th>Issue Category:</th>
                                            <td className='text-muted'>{issueData.issue_category}</td>
                                        </tr>
                                        <tr>
                                            <th>Assessment Type:</th>
                                            <td>{issueData.assessment_type}</td>
                                        </tr>
                                        <tr>
                                            <th>Category:</th>
                                            <td>{issueData.category}</td>
                                        </tr>
                                        <tr>
                                            <th>Initial Closure Date:</th>
                                            <td>{issueData.initial_closure_date}</td>
                                        </tr>
                                        <tr>
                                            <th>Action Owner:</th>
                                            <td>{issueData.action_owner}</td>
                                        </tr>
                                        <tr>
                                            <th>Issue Status:</th>
                                            <td>{issueData.tester_status}</td>
                                        </tr>
                                        <tr>
                                            <th>Overall Risk Score:</th>
                                            <td>{issueData.overall_risk_score}</td>
                                        </tr>
                                        <tr>
                                            <th>Severity:</th>
                                            <td>{getSeverityLabel(issueData.severity)}</td>
                                        </tr>
                                        <tr>
                                            <th>Exploitability:</th>
                                            <td>{issueData.exploitability}</td>
                                        </tr>
                                        <tr>
                                            <th>DNS:</th>
                                            <td>{issueData.dns}</td>
                                        </tr>
                                        <tr>
                                            <th>NetBIOS:</th>
                                            <td>{issueData.net_bios}</td>
                                        </tr> 
                                        <tr>
                                            <th>QID:</th>
                                            <td>{issueData.qid}</td>
                                        </tr>
                                        <tr>
                                            <th>ENV Type:</th>
                                            <td>{getLabel(issueData.type)}</td>
                                        </tr>
                                        <tr>
                                            <th>Port:</th>
                                            <td>{issueData.port}</td>
                                        </tr>
                                        <tr>
                                            <th>Protocol:</th>
                                            <td>{issueData.protocol}</td>
                                        </tr>
                                        <tr>
                                            <th>First Discovered:</th>
                                            <td>{issueData.first_discovered}</td>
                                        </tr>
                                        <tr>
                                            <th>Last Observed:</th>
                                            <td>{issueData.last_observed}</td>
                                        </tr>
                                        <tr>
                                            <th>Vendor Reference:</th>
                                            <td>{issueData.vendor_reference}</td>
                                        </tr>
                                        <tr>
                                            <th>Solution:</th>
                                            <td>{issueData.solution}</td>
                                        </tr>                            
                                        <tr>
                                            <th>Plugin Output:</th>
                                            <td>{issueData.plugin_output}</td>
                                        </tr>                            
                                        <tr>
                                            <th>MAC Address:</th>
                                            <td>{issueData.mac_address}</td>
                                        </tr>                            
                                        <tr>
                                            <th>Synopsis:</th>
                                            <td>{issueData.synopsis}</td>
                                        </tr>                                
                                        <tr>
                                            <th>Risk Factor:</th>
                                            <td>{issueData.risk_factor}</td>
                                        </tr>                            
                                        <tr>
                                            <th>CVSS Base Score:</th>
                                            <td>{issueData.cvss_base_score}</td>
                                        </tr>                            
                                        <tr>
                                            <th>CVSS Temporal Score:</th>
                                            <td>{issueData.cvss_temporal_score}</td>
                                        </tr>                            
                                        <tr>
                                            <th>Vuln Publication Date:</th>
                                            <td>{issueData.vuln_publication_date}</td>
                                        </tr>                            
                                        <tr>
                                            <th>Patch Publication Date:</th>
                                            <td>{issueData.patch_publication_date}</td>
                                        </tr>                            
                                        <tr>
                                            <th>Exploit Ease:</th>
                                            <td>{issueData.exploit_ease}</td>
                                        </tr>                            
                                        <tr>
                                            <th>Exploit Frameworks:</th>
                                            <td>{issueData.exploit_frameworks}</td>
                                        </tr>  
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='col-md-6 col-xxl-6'>
                            <div className="table-responsive">
                                <table className="table table-table-border mb-0 table">
                                    <tbody>
                                        <tr>
                                            <th>Initial Closure Date:</th>
                                            <td>{issueData.initial_closure_date}</td>
                                        </tr>
                                        <tr>
                                            <th>Revised Closure Date:</th>
                                            <td>{issueData.revised_closure_date}</td>
                                        </tr>
                                        <tr>
                                            <th>Tester Status:</th>
                                            <td>{issueData.tester_status}</td>
                                        </tr>
                                        <tr>
                                            <th>Requestor Status:</th>
                                            <td>{issueData.requestor_status}</td>
                                        </tr>
                                        <tr>
                                            <th>Issue Team:</th>
                                            <td>{issueData.issue_team}</td>
                                        </tr>
                                        <tr>
                                            <th>L1 SPOC Name:</th>
                                            <td>{issueData.l1_spoc_name}</td>
                                        </tr>
                                        <tr>
                                            <th>L1 SPOC Email:</th>
                                            <td>{issueData.l1_spoc_email}</td>
                                        </tr>
                                        <tr>
                                            <th>L2 SPOC Name:</th>
                                            <td>{issueData.l2_spoc_name}</td>
                                        </tr>
                                        <tr>
                                            <th>L2 SPOC Email:</th>
                                            <td>{issueData.l2_spoc_email}</td>
                                        </tr>
                                        <tr>
                                            <th>Requestor Remark:</th>
                                            <td>{issueData.requestor_remark}</td>
                                        </tr>
                                        <tr>
                                            <th>Tester Remark:</th>
                                            <td>{issueData.tester_remark}</td>
                                        </tr>            
                                        <tr>
                                            <th>Technology:</th>
                                            <td>{issueData.Technology}</td>
                                        </tr>
                                        <tr>
                                            <th>CISA CVE ID:</th>
                                            <td>{issueData.cisa_cve_id}</td>
                                        </tr>
                                        <tr>
                                            <th>Artifact:</th>
                                            <td>{issueData.artifact}</td>
                                        </tr>
                                        <tr>
                                            <th>Review Comment:</th>
                                            <td>{issueData.review_comment}</td>
                                        </tr>            
                                        <tr>
                                            <th>Asset Category:</th>
                                            <td>{issueData.asset_category}</td>
                                        </tr>
                                        <tr>
                                            <th>Asset Type:</th>
                                            <td>{issueData.asset_type}</td>
                                        </tr>
                                        <tr>
                                            <th>Hosting Location:</th>
                                            <td>{issueData.hosting_location}</td>
                                        </tr>
                                        <tr>
                                            <th>Hosting Type:</th>
                                            <td>{issueData.hosting_type}</td>
                                        </tr>            
                                        <tr>
                                            <th>Is Date Updated:</th>
                                            <td>{issueData.is_date_updated}</td>
                                        </tr>
                                        <tr>
                                            <th>Is Paused:</th>
                                            <td>{issueData.is_paused}</td>
                                        </tr>
                                        <tr>
                                            <th>Is Deleted:</th>
                                            <td>{issueData.is_deleted}</td>
                                        </tr>
                                        <tr>
                                            <th>Is Repeated:</th>
                                            <td>{issueData.is_repeated}</td>
                                        </tr>            
                                        <tr>
                                            <th>RAF Expiry Date:</th>
                                            <td>{issueData.raf_expiry_date}</td>
                                        </tr>
                                        <tr>
                                            <th>Issue Submitted:</th>
                                            <td>{issueData.issue_submitted}</td>
                                        </tr>
                                        <tr>
                                            <th>Created At:</th>
                                            <td>{issueData.created_at}</td>
                                        </tr>
                                        <tr>
                                            <th>Updated At:</th>
                                            <td>{issueData.updated_at}</td>
                                        </tr>            
                                        <tr>
                                            <th>CWE ID:</th>
                                            <td>{issueData.cwe_id}</td>
                                        </tr>
                                        <tr>
                                            <th>Network Zone:</th>
                                            <td>{getNetworkLabel(issueData.network_zone)}</td>
                                        </tr>
                                        <tr>
                                            <th>Data Classification:</th>
                                            <td>{getDataLabel(issueData.data_classification)}</td>
                                        </tr>
                                        <tr>
                                            <th>EPSS Percentile:</th>
                                            <td>{issueData.epss_percentile}</td>
                                        </tr>            
                                        <tr>
                                            <th>Asset Criticality:</th>
                                            <td>{getAssetLabel(issueData.asset_criticality)}</td>
                                        </tr>          
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        ) : (
            <p>Loading issue data...</p>
        )}
        </div>
    );
}


//         <div style={{ padding: '20px' }}>
//             <h2>Issue Details</h2><br></br>
//             {Object.keys(issueData).length > 0 ? (
//                 <div className="issue-details-form">

//                         {/* <div style={{ marginBottom: '20px', width: '100%', textAlign:'left' }}> */}
//                             <div className='button-Container'>
//                                 <button className='btn btn-success me-2' style={{ marginBottom: '30px' }} onClick={toggleUpdateIssue}>Update</button>
//                                     {showUpdateIssue && <UpdateIssue />}
//                             </div>
//                             <div>
//                                 <p><strong>Title:</strong> {issueData.title}</p>
//                                     <hr style={{ width: '100%', margin: '10px 0' }} />
//                                 <p><strong>Application Name:</strong> {issueData.ip}</p>
//                                     <hr style={{ width: '100%', margin: '10px 0' }} />
//                                 <p><strong>Threat:</strong> {issueData.threat}</p>
//                                     <hr style={{ width: '100%', margin: '10px 0' }} />
//                                 <p><strong>CVE ID/s:</strong> {issueData.cve_id}</p>
//                                     <hr style={{ width: '100%', margin: '10px 0' }} />
//                                     <br></br><br></br>

//                                 <div style={{ display: 'flex', flexDirection: 'row' }}>
//                                     <div style={{ flex: 1 }}>
//                                         <p><strong>Issue Category:</strong> {issueData.issue_category}</p>
//                                         <p><strong>Assessment Type:</strong> {issueData.assessment_type}</p>
//                                         <p><strong>Category:</strong> {issueData.category}</p>
//                                         <p><strong>Initial Closure Date:</strong> {issueData.initial_closure_date}</p>
//                                         <p><strong>Action Owner:</strong> {issueData.action_owner}</p>
//                                         <p><strong>Issue Status:</strong> {issueData.tester_status}</p>
//                                         <p><strong>Overall Risk Score:</strong> {issueData.overall_risk_score}</p>
//                                         <p><strong>Severity:</strong>{getSeverityLabel(issueData.severity)}</p>
//                                         <p><strong>Exploitability:</strong> {issueData.exploitability}</p>
//                                         <p><strong>DNS:</strong> {issueData.dns}</p>
//                                         <p><strong>NetBIOS:</strong> {issueData.net_bios}</p>
//                                         <p><strong>QID:</strong> {issueData.qid}</p>
//                                         <p><strong>ENV Type:</strong> {getLabel(issueData.type)}</p>
//                                         <p><strong>Port:</strong> {issueData.port}</p>
//                                         <p><strong>Protocol:</strong> {issueData.protocol}</p>
//                                         <p><strong>First Discovered:</strong> {issueData.first_discovered}</p>
//                                         <p><strong>Last Observed:</strong> {issueData.last_observed}</p>
//                                         <p><strong>Vendor Reference:</strong> {issueData.vendor_reference}</p>
//                                         <p><strong>Solution:</strong> {issueData.solution}</p>
//                                         <p><strong>Plugin Output:</strong> {issueData.plugin_output}</p>
//                                         <p><strong>MAC Address:</strong> {issueData.mac_address}</p>
//                                         <p><strong>Synopsis:</strong> {issueData.synopsis}</p>
//                                         <p><strong>Risk Factor:</strong> {issueData.risk_factor}</p>
//                                         <p><strong>CVSS Base Score:</strong> {issueData.cvss_base_score}</p>
//                                         <p><strong>CVSS Temporal Score:</strong> {issueData.cvss_temporal_score}</p>
//                                         <p><strong>Vuln Publication Date:</strong> {issueData.vuln_publication_date}</p>
//                                         <p><strong>Patch Publication Date:</strong> {issueData.patch_publication_date}</p>
//                                         <p><strong>Exploit Ease:</strong> {issueData.exploit_ease}</p>
//                                         <p><strong>Exploit Frameworks:</strong> {issueData.exploit_frameworks}</p>
//                                     </div>

//                                     <div style={{ flex: 1 }}>
//                                         <p><strong>Initial Closure Date:</strong> {issueData.initial_closure_date}</p>
//                                         <p><strong>Revised Closure Date:</strong> {issueData.revised_closure_date}</p>
//                                         <p><strong>Tester Status:</strong> {issueData.tester_status}</p>
//                                         <p><strong>Requestor Status:</strong> {issueData.requestor_status}</p>
//                                         <p><strong>Issue Team:</strong> {issueData.issue_team}</p>
//                                         <p><strong>L1 SPOC Name:</strong> {issueData.l1_spoc_name}</p>
//                                         <p><strong>L1 SPOC Email:</strong> {issueData.l1_spoc_email}</p>
//                                         <p><strong>L2 SPOC Name:</strong> {issueData.l2_spoc_name}</p>
//                                         <p><strong>L2 SPOC Email:</strong> {issueData.l2_spoc_email}</p>
//                                         <p><strong>Requestor Remark:</strong> {issueData.requestor_remark}</p>
//                                         <p><strong>Tester Remark:</strong> {issueData.tester_remark}</p>
//                                         <p><strong>Technology:</strong> {issueData.Technology}</p>
//                                         <p><strong>CISA CVE ID:</strong> {issueData.cisa_cve_id}</p>
//                                         <p><strong>Artifact:</strong> {issueData.artifact}</p>
//                                         <p><strong>Review Comment:</strong> {issueData.review_comment}</p>
//                                         <p><strong>Asset Category:</strong> {issueData.asset_category}</p>
//                                         <p><strong>Asset Type:</strong> {issueData.asset_type}</p>
//                                         <p><strong>Hosting Location:</strong> {issueData.hosting_location}</p>
//                                         <p><strong>Hosting Type:</strong> {issueData.hosting_type}</p>
//                                         <p><strong>Is Date Updated:</strong> {issueData.is_date_updated}</p>
//                                         <p><strong>Is Paused:</strong> {issueData.is_paused}</p>
//                                         <p><strong>Is Deleted:</strong> {issueData.is_deleted}</p>
//                                         <p><strong>Is Repeated:</strong> {issueData.is_repeated}</p>
//                                         <p><strong>RAF Expiry Date:</strong> {issueData.raf_expiry_date}</p>
//                                         <p><strong>Issue Submitted:</strong> {issueData.issue_submitted}</p>
//                                         <p><strong>Created At:</strong> {issueData.created_at}</p>
//                                         <p><strong>Updated At:</strong> {issueData.updated_at}</p>
//                                         <p><strong>CWE ID:</strong> {issueData.cwe_id}</p>
//                                         <p><strong>Network Zone:</strong>{getNetworkLabel(issueData.network_zone)}</p>
//                                         <p><strong>Data Classification:</strong> {getDataLabel(issueData.data_classification)}</p>
//                                         <p><strong>EPSS Percentile:</strong> {issueData.epss_percentile}</p>
//                                         <p><strong>Asset Criticality:</strong>{getAssetLabel(issueData.asset_criticality)}</p>
//                                         <hr style={{ width: '100%', margin: '10px 0' }} />
//                                     </div>
//                                 </div>
//                             </div>
//                         {/* </div> */}
//                 </div>
//             ) : (
//                 <p>Loading issue data...</p>
//                 )}
//         </div>
//     );
// }


