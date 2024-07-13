import React from 'react';
import styled from 'styled-components';
import eliminar from './delete.png';
import editar from './edit.png';
import { useVideoContext } from '../../context/index';

const CardContainer = styled.div.attrs(({ $categoriaColor }) => ({
    
}))`
    border: 5px solid ${props => props.$categoriaColor || '#CCCCCC'}; 
    background-color: var(--black);
    padding: 10px;
    margin: 10px;
    border-radius: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 300px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    @media (max-width: 1200px) {
        width: auto;
    }
`;

const ImgVideo = styled.img`
    width: 100%;
    height: auto;
    max-height: 200px;
    border-radius: 5px;
    object-fit: cover; 
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
`;

const ButtonEliminar = styled.button`
    background-color: transparent;
    color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: rgba(255, 0, 0, 0.2); 
    }
`;

const ButtonEditar = styled.button`
    background-color: transparent;
    color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: rgba(0, 255, 0, 0.2); 
    }
`;

const ButtonImage = styled.img`
    margin-right: 10px;
    width: 20px;
`;

const TituloButton = styled.h3`
    margin: 0;
    padding: 0;
`;

const CardVideo = ({ video, categoriaColor }) => {
    const { handleDeleteVideo, openModal } = useVideoContext();

    const handleDelete = async () => {
        try {
            await handleDeleteVideo(video.id);
        } catch (error) {
            console.error('Error eliminando video:', error);
        }
    };

    const handleEdit = () => {
        openModal(video);
    };

   
    const videoImage = video.imagenVideo || video.imagen;

    return (
        <CardContainer $categoriaColor={categoriaColor}>
            <a href={video.video} target="_blank" rel="noopener noreferrer">
                <ImgVideo src={videoImage} alt={video.titulo} />
            </a>
            <InfoContainer>
                <Buttons>
                    <ButtonEliminar onClick={handleDelete}>
                        <ButtonImage src={eliminar} alt="Eliminar" />
                        <TituloButton>Eliminar</TituloButton>
                    </ButtonEliminar>
                    <ButtonEditar onClick={handleEdit}>
                        <ButtonImage src={editar} alt="Editar" />
                        <TituloButton>Editar</TituloButton>
                    </ButtonEditar>
                </Buttons>
            </InfoContainer>
        </CardContainer>
    );
};

export default CardVideo;
