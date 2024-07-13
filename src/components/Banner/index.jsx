import styled from 'styled-components';
import { Link } from 'react-router-dom';
import card from './player.png';
import banner from './banner.png'; 

const BannerContainer = styled.section`
  width: 100%;
  height: 470px;
  background: url(${banner}) no-repeat center center;  
  background-size: cover;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 1200px) {
    height: auto;
    padding: 20px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0012338F;
    z-index: 1;
  }
`;

const ContentLeft = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  color: white;
  max-width: 60%;
  padding: 20px;
`;

const TitleBanner = styled.h1`
  font-size: 46px;
  font-weight: 400;
  line-height: 53px;
  margin: 0 0 10px 0;
`;

const ParagraphBanner = styled.p`
  font-size: 18px;
  font-weight: 300;
  line-height: 20px;
`;

const CardBanner = styled.div`
  position: relative;
  z-index: 2;

  img {
    width: 400px;
    height: 260px;
    margin-right: 25px;

    @media (max-width: 1200px) {
      width: 300px;
      height: auto;
    }
  }
`;

function Banner() {
    return (
        <BannerContainer>
            <ContentLeft>
                <TitleBanner>Challenge React</TitleBanner>
                <ParagraphBanner>
                    Este challenge es una forma de aprendizaje. Es un mecanismo donde podrás comprometerte en la resolución de un problema para poder aplicar todos los conocimientos adquiridos en la formación React.
                </ParagraphBanner>
            </ContentLeft>
            <CardBanner>
                <a href="https://youtu.be/C_wBJGhauMY" target="__blank">
                    <img src={card} alt="¿Que significa pensar como programador?" />
                </a>
            </CardBanner>
        </BannerContainer>
    );
}

export default Banner;
