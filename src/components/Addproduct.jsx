import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Addproduct() {
    let [inputprod, setInputprod] = useState({ name: "", price: 0, description: '', category: '', image: '',imagehover:'' });
    let navigate = useNavigate();

    function handelsubmit(e) {
        e.preventDefault();

        let formData = new FormData();
        formData.append('name', inputprod.name);
        formData.append('price', inputprod.price);
        formData.append('description', inputprod.description);
        formData.append('category', inputprod.category);
        formData.append('image', inputprod.image);
        formData.append('imagehover', inputprod.imagehover);

        axios.post("http://localhost:3000/products", inputprod)
            .then(res => {
                setInputprod(res.data);
                navigate("/dashboard");
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }

    let handleImageChange = (e) => {
        let file = e.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = () => {
                setInputprod({ ...inputprod, image: reader.result });
                
            };
            reader.readAsDataURL(file);
        }
    };

    let handleImagehoverChange = (e) => {
        let file = e.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = () => {
                setInputprod({ ...inputprod, imagehover: reader.result });
                
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <form onSubmit={handelsubmit}>
                <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input type="text" className="form-control" onChange={e => setInputprod({ ...inputprod, name: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input type="number" className="form-control" onChange={e => setInputprod({ ...inputprod, price: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control" onChange={e => setInputprod({ ...inputprod, description: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input type="text" className="form-control" onChange={e => setInputprod({ ...inputprod, category: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input type="file" className="form-control" onChange={handleImageChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">ImageHover</label>
                    <input type="file" className="form-control" onChange={handleImagehoverChange} />
                </div>
                <button type="submit" className="btn plane"><i class="fa-solid fa-paper-plane"></i> Submit</button>
            </form>
        </div>
    );
}