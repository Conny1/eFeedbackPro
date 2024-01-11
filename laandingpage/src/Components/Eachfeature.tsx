import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  width: 85%;
  max-width: 1000px;
  margin-top: 50px;
  justify-content: space-between;
`;
const ImgConatainer = styled.div`
  width: 50%;
  height: 300px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
const Info = styled.div`
  width: 45%;
  h1 {
    font-size: 27px;
  }
  p {
    max-width: 400px;
  }
`;

type Props = {
  pic: string;
  heading: string;
  explanation: string;
};

const Eachfeature = ({ pic, heading, explanation }: Props) => {
  return (
    <Container>
      <ImgConatainer>
        <img src={pic} alt="collect" />
      </ImgConatainer>

      <Info>
        <h1>{heading}</h1>
        <p>{explanation}</p>
      </Info>
    </Container>
  );
};

export default Eachfeature;
