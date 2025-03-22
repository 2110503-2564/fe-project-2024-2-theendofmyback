import React from 'react';
import styled from 'styled-components';

interface SeeYoursButtonProps {
  name: string;
}

const SeeYoursButton: React.FC<SeeYoursButtonProps> = ({ name }) => {
  return (
    <StyledWrapper>
      <button className="cssbuttons-io-button">
        {name}
        <div className="icon">
          <svg height={26} width={26} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor" />
          </svg>
        </div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .cssbuttons-io-button {
    background : rgb(74 ,222 ,128);
    color: white;
    font-family: inherit;
    padding: 0.5em 1.6em; /* ลด padding ลงเล็กน้อย */
    font-size: 18px; /* ลดขนาดตัวอักษร */
    font-weight: 500;
    border-radius: 0.9em;
    border: none;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    box-shadow: inset 0 0 1.6em -0.6em rgb(74,222,128);
    overflow: hidden;
    position: relative;
    height: 3.2em; /* ลดความสูงของปุ่ม */
    padding-right: 3.6em;
    cursor: pointer;
  }

  .cssbuttons-io-button .icon {
    background: white;
    margin-left: 1em;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5em; /* ลดขนาดไอคอน */
    width: 2.5em;
    border-radius: 0.8em;
    box-shadow: 0.1em 0.1em 0.6em 0.2em rgb(74,222,128);
    right: 0.3em;
    transition: all 0.3s;
  }

  .cssbuttons-io-button:hover .icon {
    width: calc(100% - 0.6em);
  }

  .cssbuttons-io-button .icon svg {
    width: 1.2em; /* ปรับขนาดไอคอน */
    transition: transform 0.3s;
    color: rgb(74,222,128);
  }

  .cssbuttons-io-button:hover .icon svg {
    transform: translateX(0.1em);
  }

  .cssbuttons-io-button:active .icon {
    transform: scale(0.95);
  }
`;

export default SeeYoursButton;
