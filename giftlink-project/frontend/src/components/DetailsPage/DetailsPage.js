import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import urlConfig from '../../config';

function DetailsPage() {
    const { id } = useParams();
    const [gift, setGift] = useState(null);

    useEffect(() => {
        const fetchGift = async () => {
            try {
                const response = await fetch(`${urlConfig.backendUrl}/api/gifts/${id}`);
                const data = await response.json();
                setGift(data);
            } catch (e) {
                console.error('Error fetching gift details', e);
            }
        };
        fetchGift();
    }, [id]);

    if (!gift) return <p>Loading...</p>;

    return (
        <div className="container mt-4">
            <h2>{gift.name}</h2>
            <p><strong>Category:</strong> {gift.category}</p>
            <p><strong>Condition:</strong> {gift.condition}</p>
            <p><strong>Age (years):</strong> {gift.age_years}</p>
            <p><strong>Description:</strong> {gift.description}</p>
        </div>
    );
}

export default DetailsPage;
