import { styled } from "styled-components";
import { useState } from "react";
import "./App.css";
import Nav from "./Components/Nav";
import head from "./assets/head.png";
import Eachfeature from "./Components/Eachfeature";
import collect from "./assets/collect.png";
import manage from "./assets/manage.png";
import analyze from "./assets/analyze.png";

const Container = styled.div`
  width: 100%;
`;

const HeaderContainder = styled.div`
  width: 100%;
  background-color: #fbefa7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 600px;
  align-items: center;
  max-width: 1280px;
`;

const Section = styled.div`
  width: 48%;
  margin: 10px;
  height: auto;
  /* max-height: 500px; */
  p {
    font-size: 13px;
  }

  img {
    width: 100%;
    height: 500px;
    object-fit: contain;
  }
`;

const Headerheading = styled.h1`
  max-width: 70vh;
  font-size: 48px;
  font-weight: 700;
`;
const Headersunheading = styled.h3`
  color: #3b3825;
  font-weight: 400;
  max-width: 60vh;
  margin-bottom: 50px;
`;
const LinkBtn = styled.a`
  border-radius: 3px;
  font-size: 13px;
  font-weight: bold;
  text-decoration: none;
  padding: 10px;
  text-align: center;
  width: 100px;
  background-color: #fbd92d;
  &:hover {
    color: #fff;
  }
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-evenly; */
  align-items: center;
  min-height: 600px;

  h1 {
    font-size: 32px;
  }
  p {
    font-size: 18px;
  }
  button {
    text-transform: uppercase;
    font-size: 12px;
    border: none;
    border-radius: 3px;
    &:hover {
      background-color: #fbefa7;
    }
  }
`;
const FeatureBtnGroup = styled.div``;

function App() {
  const [iscollect, setiscollect] = useState(true);
  const [ismanage, setismanage] = useState(false);
  const [isanalyze, setisanalyze] = useState(false);
  return (
    <Container>
      <Nav />

      <HeaderContainder>
        <Header>
          <Section>
            <Headerheading>
              eFeedbackPro: The Ultimate Feedback Management System
            </Headerheading>

            <Headersunheading>
              Designed to help micro SaaS and SaaS businesses streamline
              feedback collection, management, and analysis in one centralized
              platform.
            </Headersunheading>
            <LinkBtn>Start Your Free Trial</LinkBtn>
            <p>No credit card required</p>
          </Section>

          <Section>
            <img src={head} alt="feed" />
          </Section>
        </Header>
      </HeaderContainder>
      <Features>
        <h1>Our Features</h1>
        <p>Explore the power of eFeedbackPro</p>
        <FeatureBtnGroup>
          <button
            onClick={() => {
              setiscollect(true);
              setisanalyze(false);
              setismanage(false);
            }}
          >
            Collect
          </button>
          <button
            onClick={() => {
              setiscollect(false);
              setisanalyze(false);
              setismanage(true);
            }}
          >
            Manage
          </button>
          <button
            onClick={() => {
              setiscollect(false);
              setisanalyze(true);
              setismanage(false);
            }}
          >
            Analyze
          </button>
        </FeatureBtnGroup>

        {iscollect && (
          <Eachfeature
            pic={collect}
            heading="Effortless Feedback Collection"
            explanation="Collect feedback from multiple channels in a single place."
          />
        )}
        {ismanage && (
          <Eachfeature
            pic={manage}
            heading="Streamlined Feedback Management"
            explanation="Organize and prioritize feedback to focus on what matters most."
          />
        )}

        {isanalyze && (
          <Eachfeature
            pic={analyze}
            heading="Insightful Feedback Analysis"
            explanation="Turn feedback into actionable insights with our powerful analysis tools."
          />
        )}
      </Features>
    </Container>
  );
}

export default App;
