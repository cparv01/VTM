
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function CreateComponent() {
    const [formData, setFormData] = useState({
        title: '',
        assessment_type: '',
        ip: '',
        category: '',
        initial_closure_date: '',
        action_owner: '',
        tester_status: '',
        overall_risk_score: '',
        severity: ''
    });

    console.log("form_data",formData);

    const handleChange = (e) => {
        
        this.setFormData({
            [e.target.title]:e.target.value,
            [e.target.assessment_type]:e.target.value,
            [e.target.ip]:e.target.value,
            [e.target.category]:e.target.value,
            [e.target.initial_closure_date]:e.target.value,
            [e.target.action_owner]:e.target.value,
            [e.target.tester_status]:e.target.value,
            [e.target.overall_risk_score]:e.target.value,
            [e.target.severity]:e.target.value
        });
        // setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/issues/create', formData);
            Swal.fire({
                icon: 'success',
                text: 'Issue created successfully!'
            });
            setFormData({
                title: '',
                assessment_type: '',
                ip: '',
                category: '',
                initial_closure_date: '',
                action_owner: '',
                tester_status: '',
                overall_risk_score: '',
                severity: ''
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: 'Failed to create issue!'
            });
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2>Create New Issue</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="assessment_type" className="form-label">Assessment Type</label>
                            <input type="text" className="form-control" id="assessment_type" name="assessment_type" value={formData.assessment_type} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Application Name" className="form-label">Application Name</label>
                            <input type="text" className="form-control" id="ip" name="ip" value={formData.ip} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <input type="text" className="form-control" id="category" name="category" value={formData.category} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="initial_closure_date" className="form-label">Initial Closure Date</label>
                            <input type="date" className="form-control" id="initial_closure_date" name="initial_closure_date" value={formData.initial_closure_date} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="action_owner" className="form-label">Action Owner</label>
                            <input type="text" className="form-control" id="action_owner" name="action_owner" value={formData.action_owner} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Issue statustus" className="form-label">Issue status</label>
                            <input type="text" className="form-control" id="tester_status" name="tester_status" value={formData.tester_status} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="overall_risk_score" className="form-label">Overall Risk Score</label>
                            <input type="text" className="form-control" id="overall_risk_score" name="overall_risk_score" value={formData.overall_risk_score} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="severity" className="form-label">Severity</label>
                            <input type="text" className="form-control" id="severity" name="severity" value={formData.severity} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary me-2">Submit</button>
                        <Link to="/list" className="btn btn-secondary">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}