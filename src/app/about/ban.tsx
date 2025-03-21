import React from 'react';
import styled from 'styled-components';

const CardBan = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <a className="card1" >
          <p className='text-xl font-bold'>The End of BACK</p>
          <p className="small">sw dev project 2</p>
          <div className="go-corner" >
            <div className="go-arrow">
              
            </div>
          </div>
        </a>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card p {
    font-size: px;
    font-weight: 400;
    line-height: 20px;
    color: #666;
  }

  .card p.small {
    font-size: 14px;
  }

  .go-corner {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 32px;
    height: 32px;
    overflow: hidden;
    top: 0;
    right: 0;
    background-color:rgb(90, 201, 68);
    border-radius: 0 4px 0 32px;
  }

  .go-arrow {
    margin-top: -4px;
    margin-right: -4px;
    color: white;
    font-family: courier, sans;
  }

  .card1 {
    display: block;
    position: relative;
    max-width: 262px;
    background-color: #f2f8f9;
    border-radius: 4px;
    padding: 32px 24px;
    margin: 12px;
    text-decoration: none;
    z-index: 0;
    overflow: hidden;
    transition: all 0.3s ease-out;
  }

  .card1:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: -16px;
    right: -16px;
    background:rgb(90, 201, 68);
    height: 32px;
    width: 32px;
    border-radius: 32px;
    transform: scale(1);
    transform-origin: 50% 50%;
    transition: transform 0.25s ease-out;
  }

  .card1:hover:before {
    transform: scale(21);
  }

  .card1:hover p {
    color: rgba(255, 255, 255, 0.8);
  }

  .card1:hover h3 {
    color: #fff;
  }

  /* Optional Card Styles for More Effects */
  .card2:hover {
    box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
    top: -4px;
    border: 1px solid #ccc;
    background-color: white;
  }

  .card3:hover {
    border: 1px solidrgb(90, 201, 68);
    box-shadow: 0px 0px 999px 999px rgba(255, 255, 255, 0.5);
  }

  .card4:hover {
    border: 1px solid #cd3d73;
  }
`;

export default CardBan;
