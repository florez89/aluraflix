import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useVideoContext } from '../../context';
import styled from 'styled-components';

const NuevoVideoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    background-color: var(--dark-grey);
    padding: 20px;

    @media (max-width: 1200px) {
        width: auto;
        height: auto;
        padding: 20px;
    }
`;

const CabeceraFormulario = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    margin: 0 auto;
    color: var(--white);
    margin-top: 20px;

    @media (max-width: 1200px) {
        text-align: center;
        margin: 10px auto;
    }
`;

const TituloCabecera = styled.h2`
    font-size: 60px;
    font-weight: 900;
    line-height: 70.31px;
    font-style: oblique;
`;

const ParrafoCabecera = styled.p`
    font-size: 20px;
    font-weight: 400;
    flex-wrap: wrap;
    line-height: 23.44px;
    margin-top: 0;
`;

const Formulario = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 90%;
    height: auto;
    margin-top: 20px;
    padding: 20px;
`;

const Campo = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-bottom: 10px;
    color: var(--white);
`;

const TituloForm = styled.h3`
    font-size: 36px;
    font-weight: 600;
    line-height: 24px;
    padding: 10px;
    text-align: left;
`;

const SectionFormulario = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
`;

const FormIzquierdo = styled.div`
    display: flex;
    flex-direction: column;
    width: 48%;
    margin-bottom: 20px;

    @media (max-width: 1200px) {
        width: 100%;
    }
`;

const FormDerecho = styled.div`
    display: flex;
    flex-direction: column;
    width: 48%;
    margin-bottom: 20px;

    @media (max-width: 1200px) {
        width: 100%;
    }
`;

const Label = styled.label`
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    text-align: left;
`;

const Input = styled.input`
    width: 100%;
    padding: 15px;
    margin-bottom: 10px;
    border: 1px solid #191919;
    outline: none;
    border-radius: 4px;
    background-color: transparent;
    color: #A5A5A5;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    height: 55px;
`;

const Select = styled.select`
    width: 100%;
    padding: 15px;
    margin-bottom: 10px;
    border: 1px solid #191919;
    outline: none;
    border-radius: 4px;
    background-color: transparent;
    color: #A5A5A5;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
`;

const Textarea = styled.textarea`
    width: 100%;
    padding: 15px;
    margin-bottom: 10px;
    border: 1px solid #191919;
    outline: none;
    border-radius: 4px;
    background-color: transparent;
    color: #A5A5A5;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    height: 220px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 50px;
    flex-wrap: wrap;
`;

const ButtonGuardar = styled.button`
    width: 180px;
    height: 54px;
    padding: 10px 20px;
    margin: 0 10px;
    background-color: black;
    color: var(--white);
    border: 3px solid var(--color-button-guardar);
    border-radius: 4px;
    cursor: pointer;
    font-size: 20px;
    font-weight: 900;
    line-height: 24px;
    transition: transform 0.5s ease-out;

    @media (max-width: 1200px) {
        width: auto;
        height: auto;
        margin-bottom: 25px;
    }

    &:hover {
        transform: scale(1.1);
    }
`;

const ButtonLimpiar = styled.button`
    width: 180px;
    height: 54px;
    padding: 10px 20px;
    margin: 0 10px;
    background-color: transparent;
    color: var(--white);
    border: 3px solid white;
    border-radius: 4px;
    cursor: pointer;
    font-size: 20px;
    font-weight: 900;
    line-height: 24px;
    transition: transform 0.5s ease-out;

    @media (max-width: 1200px) {
        width: auto;
        height: auto;
        margin-bottom: 25px;
    }

    &:hover {
        transform: scale(1.1);
    }
`;

const NuevoVideo = () => {
    const { handleAddVideo, fetchVideos } = useVideoContext();
    const navigate = useNavigate();
    const initialVideoState = {
        titulo: '',
        categoria: '',
        imagenVideo: '',
        video: '',
        descripcion: ''
    };
    const [newVideo, setNewVideo] = useState(initialVideoState);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('https://my-json-server.typicode.com/florez89/AluraFlixChallenge-API/videos');
                const uniqueCategorias = [...new Set(response.data.map(video => video.categoria))];
                setCategorias(uniqueCategorias);
            } catch (error) {
                console.error('Error fetching categorias:', error);
            }
        };

        fetchCategorias();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewVideo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            handleAddVideo(newVideo);  
            setNewVideo(initialVideoState);
            navigate('/');
        } catch (error) {
            console.error('Error adding video:', error);
        }
    };

    return (
        <NuevoVideoContainer>
            <CabeceraFormulario>
                <TituloCabecera>NUEVO VIDEO</TituloCabecera>
                <ParrafoCabecera>Completa el formulario para agregar un nuevo video.</ParrafoCabecera>
            </CabeceraFormulario>
            <Formulario onSubmit={handleSubmit}>
                <SectionFormulario>
                    <FormIzquierdo>
                        <Campo>
                            <Label>
                                Título:
                                <Input
                                    type="text"
                                    name="titulo"
                                    value={newVideo.titulo}
                                    onChange={handleChange}
                                    placeholder="Ingrese el título"
                                    required
                                />
                            </Label>
                        </Campo>
                        <Campo>
                            <Label>
                                Imagen:
                                <Input
                                    type="text"
                                    name="imagenVideo"
                                    value={newVideo.imagen}
                                    onChange={handleChange}
                                    placeholder="URL de la imagen"
                                    required
                                />
                            </Label>
                        </Campo>
                        <Campo>
                            <Label>
                                Descripción:
                                <Textarea
                                    name="descripcion"
                                    value={newVideo.descripcion}
                                    onChange={handleChange}
                                    placeholder="¿De qué se trata el video?"
                                    required
                                />
                            </Label>
                        </Campo>
                    </FormIzquierdo>
                    <FormDerecho>
                        <Campo>
                            <Label>
                                Categoría:
                                <Select
                                    name="categoria"
                                    value={newVideo.categoria}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Seleccione la categoría</option>
                                    {categorias.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </Select>
                            </Label>
                        </Campo>
                        <Campo>
                            <Label>
                                Video:
                                <Input
                                    type="text"
                                    name="video"
                                    value={newVideo.video}
                                    onChange={handleChange}
                                    placeholder="URL del video"
                                    required
                                />
                            </Label>
                        </Campo>
                    </FormDerecho>
                </SectionFormulario>
                <ButtonContainer>
                    <ButtonGuardar type="submit">Guardar</ButtonGuardar>
                    <ButtonLimpiar type="button" onClick={() => setNewVideo(initialVideoState)}>Limpiar</ButtonLimpiar>
                </ButtonContainer>
            </Formulario>
        </NuevoVideoContainer>
    );
};

export default NuevoVideo;
