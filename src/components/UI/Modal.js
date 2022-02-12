import styled from "styled-components";

const Modal = styled.div`
  position: fixed;
  width: 30rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #eaeaea;
  box-shadow: 1px 1px 8px 6px rgba(255, 255, 255, 0.25);
  z-index: 100;

  @media screen and (max-width: 500px) {
    width: 23rem;
  }
`;

export default Modal;