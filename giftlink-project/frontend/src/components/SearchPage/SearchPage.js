import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import urlConfig from '../../config';

function SearchPage() {
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const params = new URLSearchParams();
            if (name) params.append('name', name);
            if (category) params.append('category', category);

            const response = await fetch(`${urlConfig.backendUrl}/api/search?${params.toString()}`);
            const data = await response.json();
            setResults(data);
        } catch (e) {
            console.error('Error searching gifts', e);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Search Gifts</h2>
            <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All Categories</option>
                <option value="Furniture">Furniture</option>
                <option value="Electronics">Electronics</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Books">Books</option>
                <option value="Toys">Toys</option>
                <option value="Clothing">Clothing</option>
                <option value="Sporting Goods">Sporting Goods</option>
                <option value="Outdoor">Outdoor</option>
            </select>
            <button onClick={handleSearch}>Search</button>

            <div style={{ marginTop: '20px' }}>
                {results.map((gift) => (
                    <div key={gift.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                        <h4>{gift.name}</h4>
                        <p>{gift.category} - {gift.condition}</p>
                        <Link to={`/gift/${gift.id}`}>View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchPage;
