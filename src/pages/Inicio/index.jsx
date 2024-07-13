import React from 'react';
import styled from 'styled-components';
import CardVideo from '../../components/Cards';
import Modal from '../../components/Modal';
import { useVideoContext } from '../../context';

const colorPorDefecto = '#CCCCCC';

const categoriasColores = {
    'Front End': 'var(--color-frontend)',
    'BackEnd': 'var(--color-backend)',
    'Innovacion y Gestion': 'var(--color-innovacionygestion)',
};

const InicioContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: wrap;
    background-color: var(--dark-grey);
    padding: 20px;

    @media (max-width: 1200px) {
        box-sizing: border-box;
        width: auto;
        align-items: center;
        padding: 10px;
    }
`;

const Categoria = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    margin-bottom: 20px;

    @media (max-width: 1200px) {
        width: auto;
        margin-right: 10px;
    }
`;

const Nombre = styled.h2`
    margin: 10px;
    padding: 10px;
    border: none;
    border-radius: 10px;
    width: 320px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    font-weight: 800;
    line-height: 37.5px;
    color: var(--white);

    @media (max-width: 1200px) {
        width: 270px;
        height: auto;
        margin-left: 20px;
    }
`;

const Video = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

const InicioPage = () => {
    const { videos } = useVideoContext();

    return (
        <InicioContainer>
            {Object.keys(categoriasColores).map(categoriaNombre => (
                <Categoria key={categoriaNombre}>
                    <Nombre style={{ backgroundColor: categoriasColores[categoriaNombre] || colorPorDefecto }}>
                        {categoriaNombre}
                    </Nombre>
                    <Video>
                        {videos
                            .filter(video => video.categoria === categoriaNombre)
                            .map(video => (
                                <CardVideo
                                    key={video.id}
                                    video={video}
                                    categoriaColor={categoriasColores[categoriaNombre]}
                                />
                            ))}
                    </Video>
                </Categoria>
            ))}
            <Modal />
        </InicioContainer>
    );
};

export default InicioPage;
