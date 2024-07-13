import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardVideo from '../../components/Cards';

const CategoriasPage = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('https://my-json-server.typicode.com/florez89/AluraFlixChallenge-API/videos');
                setVideos(response.data); 
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div className="categorias-page">
            <h1>Categorías</h1>
            <div className="videos">
                {videos.map((video) => (
                    <CardVideo key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
};

export default CategoriasPage;
