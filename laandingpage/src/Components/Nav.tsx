import { styled } from "styled-components";
const NavContainder = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NavComp = styled.nav`
  width: 100%;
  display: flex;
  /* outline: 1px solid red; */
  justify-content: space-between;
  align-items: center;
  max-width: 1280px;
`;
const Logo = styled.p`
  margin-left: 10px;
  font-size: 17px;
  font-weight: bold;
`;
const Linkgroups = styled.div`
  margin-right: 10px;

  width: 600px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const Links = styled.a`
  font-size: 15px;
  font-weight: bold;
  color: black;
  text-decoration: none;
  transition: 1s;
  &:hover {
    color: #fbd92d;
  }
`;
const LinkBtn = styled.a`
  border: 2px solid #fbd92d;
  color: #fbd92d;
  border-radius: 3px;
  font-size: 13px;
  font-weight: bold;
  text-decoration: none;
  padding: 10px;
  text-align: center;
  width: 100px;
  &:hover {
    color: #fbd92d;
  }
`;

const Nav = () => {
  return (
    <NavContainder>
      <NavComp>
        <Logo>eFeedbackPro</Logo>

        <Linkgroups>
          <Links href="#home">Home</Links>

          <Links href="#features">Features</Links>

          <Links href="#pricing">Pricing</Links>

          <Links href="#about">About Us</Links>

          <LinkBtn href="/home">Get Started</LinkBtn>
        </Linkgroups>
      </NavComp>{" "}
    </NavContainder>
  );
};

export default Nav;
