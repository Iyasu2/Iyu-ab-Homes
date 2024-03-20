import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Post.css'; // Import the CSS file
import Logout from './Logout';

function Post() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token in local storage:', token);
        if (!token) {
            // If token doesn't exist, navigate to the login page
            navigate('/login');
        }
    }, [navigate]);

    const [formData, setFormData] = useState({
        type: '',
        built_in_area: '',
        total_area: '',
        state: '',
        city: '',
        town: '',
        floors: '',
        accommodation: '',
        user_id: '',
        image: null
    });

    useEffect(() => {
        // Retrieve user ID from JWT token in local storage
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = parseJwt(token);
            setFormData({ ...formData, user_id: decodedToken.id });
        }
    }, []); // Run this effect only once on component mount

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            // If input type is file, set the image state
            setFormData({
                ...formData,
                [e.target.id]: e.target.files[0]
            });
        } else {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('JWT token not found');
            }
    
            const formDataToSubmit = new FormData();
        
            // Append all form data to the FormData object, except for built_in_area
            for (const key in formData) {
                if (key !== 'built_in_area' && formData[key] !== null && formData[key] !== '') {
                    formDataToSubmit.append(key, formData[key]);
                }
            }
        
            // Append built_in_area based on the house type
            const isBuiltInAreaRequired = formData.type !== 'apartment' && formData.type !== 'condominium';
            if (isBuiltInAreaRequired) {
                formDataToSubmit.append('built_in_area', formData.built_in_area);
            } else {
                formDataToSubmit.append('built_in_area', formData.total_area);
            }
        
            const response = await fetch('http://localhost:5000/api/post', {
                method: 'POST',
                body: formDataToSubmit,
                headers: {
                    'Authorization': `Bearer ${token}` // Include JWT token in headers
                }
            });
        
            if (!response.ok) {
                throw new Error('Failed to add house');
            }
        
            // Reset the form data after successful submission
            setFormData({
                type: '',
                built_in_area: '',
                total_area: '',
                state: '',
                city: '',
                town: '',
                floors: '',
                accommodation: '',
                user_id: '',
                image: null, // Reset the image state
            });
        
            alert('House added successfully');
        } catch (error) {
            console.error('Error adding house:', error);
            alert('Failed to add house');
        }
    };

    const privateResidentFloorOptions = Array.from({ length: 30 }, (_, i) => i).map((value) => (
        <option key={value} value={value}>
            {value === 0 ? '0' : value}
        </option>
    ));

    const otherFloorOptions = Array.from({ length: 30 }, (_, i) => i + 1).map((value) => (
        <option key={value} value={value}>
            {value === 1 ? `${value}st` : value === 2 ? `${value}nd` : value === 3 ? `${value}rd` : `${value}th`}
        </option>
    ));

    return (
        <div className="container mt-5">
            <Logout />
            <div className="row">
                <div className="col-md-8">
                    <div className="post-form-box">
                        <h1 style={{ textAlign: 'center' }}>Add House</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="type" className="form-label">Type</label>
                                <select className="form-select" id="type" value={formData.type} onChange={handleChange} required>
                                    {formData.type === '' && <option value="" disabled hidden>Select</option>}
                                    <option value="condominium">Condominium</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="private_resident">Private Resident</option>
                                    <option value="warehouse">Warehouse</option>
                                </select>
                            </div>

                            {formData.type !== 'apartment' && formData.type !== 'condominium' && (
                                <div className="form-group">
                                    <label htmlFor="built_in_area" className="form-label">Built-in Area</label>
                                    <div className="input-group">
                                        <input type="number" className="form-control" id="built_in_area" value={formData.built_in_area || ''} onChange={handleChange} required />
                                        <span className="input-group-text"> m²</span>
                                    </div>
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="total_area" className="form-label">Total Area</label>
                                <div className="input-group">
                                    <input type="number" className="form-control" id="total_area" value={formData.total_area || ''} onChange={handleChange} required />
                                    <span className="input-group-text"> m²</span>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="state" className="form-label">State</label>
                                <input type="text" className="form-control" id="state" value={formData.state} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="city" className="form -label">City</label>
                                <input type="text" className="form-control" id="city" value={formData.city} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="town" className="form-label">Town</label>
                                <input type="text" className="form-control" id="town" value={formData.town} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                {(formData.type === 'private_resident' || formData.type === 'warehouse') ? (
                                    <>
                                        <label htmlFor="floors" className="form-label">Floor</label>
                                        <div className="input-group">
                                            <span className="input-group-text">Ground +</span>
                                            <select className="form-select" id="floors" value={formData.floors} onChange={handleChange} required>
                                                {formData.floors === '' && <option value="" disabled hidden>Select</option>}
                                                {privateResidentFloorOptions}
                                            </select>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <label htmlFor="floors" className="form-label">Floor</label>
                                        <select className="form-select" id="floors" value={formData.floors} onChange={handleChange} required>
                                            {formData.floors === '' && <option value="" disabled hidden>Select</option>}
                                            {otherFloorOptions}
                                        </select>
                                    </>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="accommodation" className="form-label">Accommodation</label>
                                <select className="form-select" id="accommodation" value={formData.accommodation} onChange={handleChange} required>
                                    {formData.accommodation === '' && <option value="" disabled hidden>Select</option>}
                                    <option value="sell">Sell</option>
                                    <option value="rent">Rent</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Image</label>
                                <input type="file" className="form-control" id="image" onChange={handleChange} required />
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="image-preview-box">
                        <h3>Image Preview</h3>
                        {formData.image ? (
                            <img src={URL.createObjectURL(formData.image)} alt="Preview" className="img-fluid" />
                        ) : (
                            <div className="placeholder-container">
                                <div className="placeholder-image"></div>
                                <div className="placeholder-image"></div>
                                <div className="placeholder-image"></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;

// Helper function to decode JWT token
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
}