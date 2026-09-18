import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import urlConfig from '../../config';

function MainPage() {
    const [gifts, setGifts] = useState([]);

    useEffect(() => {
        const fetchGifts = async () => {
            try {
                const response = await fetch(`${urlConfig.backendUrl}/api/gifts`);
                const data = await response.json();
                setGifts(data);
            } catch (e) {
                console.error('Error fetching gifts', e);
            }
        };
        fetchGifts();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Available Gifts</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                {gifts.map((gift) => (
                    <div key={gift.id} style={{ border: '1px solid #ccc', padding: '10px', width: '220px' }}>
                        <h4>{gift.name}</h4>
                        <p>{gift.category}</p>
                        <p>{gift.condition}</p>
                        <Link to={`/gift/${gift.id}`}>View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainPage;
