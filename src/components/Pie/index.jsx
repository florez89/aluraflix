import styled from 'styled-components';
import React from 'react';
import logo from "./logo.png";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const FooterContainer = styled.footer`
  background-color: var(--black);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  border-top: 4px solid var(--blue, #2271D1);
  box-shadow: 0px 5px 29px 0px #2271D1B2;

  @media (max-width: 700px) {
    justify-content: center;
    flex-direction: column;
  }
`;

const Logo = styled.img`
  width: 168px;
  height: 40px;

  @media (max-width: 1200px) {
    margin-top: 10px;
    margin-bottom: 15px;
  }
`;

const Links = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 1200px) {
    margin-top: 15px;
    margin-bottom: 15px;
  }

  li {
    margin: 0 10px;
  }
`;

const Icon = styled.a`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;

  &:hover {
    color: var(--blue, #2271D1);
  }

  
  svg {
    font-size: 40px;
  }
`;

const TextContainer = styled.div`
  color: var(--white);
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

function PieDePagina() {
    return (
        <FooterContainer>
            <Logo src={logo} alt="Logo de la empresa" />

            <Links>
                <li>
                    <Icon href="https://www.linkedin.com/in/gustavo-florez/" target="_blank">
                        <FaLinkedin />
                    </Icon>
                </li>
                <li>
                    <Icon href="https://github.com/florez89" target="_blank">
                        <FaGithub />
                    </Icon>
                </li>
            </Links>
            <TextContainer>
                <p>Desarrollado por Gustavo Florez</p>
                <p>2024</p>
            </TextContainer>
        </FooterContainer>
    );
}

export default PieDePagina;
