import styled from "styled-components";
import { Link } from "react-router-dom"
import logo from "./logo.png"
import CabeceraLink from "../CabeceraLink";

 const Header = styled.header`
  width: 100%;
  height: 125px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background-color: var(--dark-grey);
  border-bottom: 4px solid var(--blue, #2271D1);
  box-shadow: 0px 5px 29px 0px #2271D1B2;

  @media (max-width: 1200px) {
    width: auto;
    height: auto;
    padding: 20px;
  }
`;
 const LogoContainer = styled.section`
  width: 168px;
  height: 40px;
  margin-left: 25px;

  @media (max-width: 1200px) {
    margin-top: 15px;
    margin-bottom: 15px;
  }
`;
 const StyledLink = styled(Link)`
  text-decoration: none;
`;
 const ButtonHome = styled.button`
  width: 180px;
  height: 54px;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 900;
  line-height: 24px;
  border-radius: 10px;
  background-color: black;
  cursor: pointer;
  transition: transform 0.5s ease-out;
  border: 3px solid var(--color-button-home);
  color: var(--color-button-home);
  box-shadow: inset 0px 5px 15px 0px var(--color-button-home);

  @media (max-width: 1200px) {
    margin-bottom: 15px;
  }

  &:hover {
    transform: scale(1.1);
  }
`;
 const ButtonNuevoVideo = styled.button`
  width: 180px;
  height: 54px;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 900;
  line-height: 24px;
  border-radius: 10px;
  background-color: transparent;
  cursor: pointer;
  transition: transform 0.5s ease-out;
  border: 3px solid white;
  color: white;
  

  @media (max-width: 1200px) {
    margin-bottom: 15px;
  }

  &:hover {
    transform: scale(1.1);
  }
`;
 const Img = styled.img`
  align-items: flex-start;
`;


function Cabecera() {
    return (
      <Header>
        <StyledLink to="/">
          <LogoContainer>
            <Img src={logo} alt="AluraFlix" />
          </LogoContainer>
        </StyledLink>
        <nav>
          <CabeceraLink url="./">
            <ButtonHome>
              Home
            </ButtonHome>
          </CabeceraLink>
          <CabeceraLink url="./NuevoVideo">
            <ButtonNuevoVideo>
              Nuevo Video
            </ButtonNuevoVideo>
          </CabeceraLink>
        </nav>
      </Header>
    );
  }
  
  export default Cabecera;
