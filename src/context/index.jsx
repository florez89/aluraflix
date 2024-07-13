import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

const VideoContext = React.createContext();

export const useVideoContext = () => {
    return useContext(VideoContext);
};

export const VideoProvider = ({ children }) => {
    const [videos, setVideos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const response = await axios.get('https://my-json-server.typicode.com/florez89/AluraFlixChallenge-API/videos');
            setVideos(response.data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    const handleSaveVideo = async (editedVideo) => {
        try {
           
            setVideos(prevVideos => {
                return prevVideos.map(video => video.id === editedVideo.id ? editedVideo : video);
            });
            closeModal();
        } catch (error) {
            console.error('Error updating video:', error);
        }
    };

    const handleAddVideo = (newVideo) => {
        
        const tempId = videos.length ? videos[videos.length - 1].id + 1 : 1;
        const videoConId = { ...newVideo, id: tempId };

        
        setVideos(prevVideos => [...prevVideos, videoConId]);
    };

    const handleDeleteVideo = async (videoId) => {
        try {
            const videoExistsInApi = videos.some(video => video.id === videoId && videoId <= videos.length);
            if (videoExistsInApi) {
                await axios.delete(`https://my-json-server.typicode.com/florez89/AluraFlixChallenge-API/videos/${videoId}`);
            }
          
            setVideos(prevVideos => prevVideos.filter(video => video.id !== videoId));
        } catch (error) {
            console.error('Error eliminando video:', error);
        }
    };

    const openModal = (video) => {
        setSelectedVideo(video);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedVideo(null);
        setIsModalOpen(false);
    };

    const videoContextValue = {
        videos,
        fetchVideos,
        handleSaveVideo,
        handleAddVideo,
        handleDeleteVideo,
        isModalOpen,
        openModal,
        closeModal,
        selectedVideo,
    };

    return (
        <VideoContext.Provider value={videoContextValue}>
            {children}
        </VideoContext.Provider>
    );
};
