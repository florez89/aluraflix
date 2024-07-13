import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useVideoContext } from '../../context/';
import axios from 'axios';
import close from './cancel.png';

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(3, 18, 47, 0.76);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    overflow: hidden;
`;

const ModalContent = styled.div`
    background-color: var(--dark-blue);
    padding: 10px;
    border-radius: 8px;
    width: 100%;
    height: 90%;
    max-width: 600px;
    position: relative;
    overflow-y: auto;
    max-height: calc(100% - 40px);
    scrollbar-width: thin;
    scrollbar-color: var(--blue) var(--dark-blue);

    @media (max-width: 700px) {
        width: 90%;
        height: 85%;
        margin: 0 10px;
    }

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: var(--blue);
        border-radius: 4px;
    }

    &::-webkit-scrollbar-track {
        background-color: var(--dark-blue);
    }
`;

const ModalCerrar = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`;

const ButtonClose = styled.button`
    background-color: transparent;
    border: none;
    color: var(--white);
    cursor: pointer;

    img {
        width: 35px;
        height: 35px;
    }
`;

const FormModal = styled.form`
    h2 {
        font-size: 60px;
        font-weight: 900;
        border: none;
        font-style: italic;
        text-align: center;
        align-items: center;
        margin-bottom: 20px;
        color: var(--blue);
        text-shadow: 1px 1px 5px var(--blue);
    }

    label {
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;
        color: var(--white);
        font-size: 20px;
        font-weight: 600;
        line-height: 24px;
        margin-left: 25px;
    }

    input,
    select,
    textarea {
        width: 88%;
        padding: 8px;
        margin-top: 5px;
        margin-bottom: 15px;
        border: 3px solid var(--blue);
        outline: none;
        background-color: transparent;
        color: #A5A5A5;
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
        border-radius: 10px;
    }

    input,
    select {
        height: 45px;
    }

    textarea {
        height: 100px;
    }
`;

const ModalButtons = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    justify-content: space-around;
    gap: 10px;
`;

const ButtonGuardar = styled.button`
    width: 180px;
    height: 54px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 20px;
    font-weight: 900;
    line-height: 24px;
    text-align: center;
    transition: transform 0.5s ease-out;
    background-color: black;
    margin-bottom: 20px;
    border: 3px solid var(--color-button-guardar);
    color: var(--color-button-guardar);
    box-shadow: inset 0px 5px 15px 0px var(--color-button-guardar);

    &:hover {
        transform: translateY(-5px);
    }
`;

const ButtonLimpiar = styled.button`
    width: 180px;
    height: 54px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 20px;
    font-weight: 900;
    line-height: 24px;
    text-align: center;
    transition: transform 0.5s ease-out;
    background-color: transparent;
    margin-bottom: 20px;
    border: 3px solid white;
    color: white;

    &:hover {
        transform: translateY(-5px);
    }
`;

const PreviewImage = styled.img`
    max-width: 100%;
    height: auto;
    margin-bottom: 10px;
    border-radius: 8px;
`;

const Modal = () => {
    const { isModalOpen, closeModal, selectedVideo, handleSaveVideo, handleAddVideo, videos, setVideos } = useVideoContext();
    const [editedVideo, setEditedVideo] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('https://my-json-server.typicode.com/florez89/AluraFlixChallenge-API/videos');
                const uniqueCategorias = [...new Set(response.data.map(video => video.categoria))];
                setCategorias(uniqueCategorias);
            } catch (error) {
                setError('Error fetching categorias');
                console.error('Error fetching categorias:', error);
            }
        };

        fetchCategorias();
    }, []);

    useEffect(() => {
        if (selectedVideo) {
            setEditedVideo({
                id: selectedVideo.id,
                titulo: selectedVideo.titulo,
                categoria: selectedVideo.categoria,
                imagenVideo: selectedVideo.imagen || selectedVideo.imagenVideo,
                video: selectedVideo.video,
                descripcion: selectedVideo.descripcion
            });
        } else {
            setEditedVideo({
                id: '',
                titulo: '',
                categoria: '',
                imagenVideo: '',
                video: '',
                descripcion: ''
            });
        }
    }, [selectedVideo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedVideo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        if (editedVideo.id) {
            handleSaveVideo(editedVideo);
        } else {
            handleAddVideo(editedVideo);
        }
    };

    const handleClear = () => {
        setEditedVideo({
            id: '',
            titulo: '',
            categoria: '',
            imagenVideo: '',
            video: '',
            descripcion: ''
        });
    };

    if (!isModalOpen) return null;

    return (
        <ModalContainer>
            <ModalContent>
                <ModalCerrar>
                    <ButtonClose onClick={closeModal}>
                        <img src={close} alt='Cerrar' />
                    </ButtonClose>
                </ModalCerrar>
                <FormModal>
                    <h2>EDITAR VIDEO</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {editedVideo?.imagenVideo && (
                        <PreviewImage src={editedVideo.imagenVideo} alt="Imagen del video" />
                    )}
                    <label>
                        Título:
                        <input
                            type="text"
                            name="titulo"
                            placeholder="Ingrese el título"
                            value={editedVideo?.titulo || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Categoría:
                        <select
                            name="categoria"
                            value={editedVideo?.categoria || ''}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Seleccione la categoría</option>
                            {categorias.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Imagen:
                        <input
                            type="text"
                            name="imagenVideo"
                            placeholder="URL de la imagen"
                            value={editedVideo?.imagenVideo || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Video:
                        <input
                            type="text"
                            name="video"
                            placeholder="URL del video"
                            value={editedVideo?.video || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Descripción:
                        <textarea
                            name="descripcion"
                            placeholder="¿De qué se trata el video?"
                            value={editedVideo?.descripcion || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <ModalButtons>
                        <ButtonGuardar type="button" onClick={handleSave}>
                            Guardar
                        </ButtonGuardar>
                        <ButtonLimpiar type="button" onClick={handleClear}>
                            Limpiar
                        </ButtonLimpiar>
                    </ModalButtons>
                </FormModal>
            </ModalContent>
        </ModalContainer>
    );
};

export default Modal;
