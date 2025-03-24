import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const CampgroundHomeCard = ({ id, name, description, location, image }: { id: string; name: string; description: string; location: string; image: string }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <h3 className="card__title">{name}</h3>
        <img
          src={image}  
          alt={description}  
          className="img"
        />
        <p className="card__content">{description}</p> 
        <div className="card__date">@{location}</div> 
        <div className="card__arrow">
          <Link href={`/campground/${id}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height={15} width={15}>
            <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z" />
          </svg>
        </Link>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    --border-radius: 0.75rem;
    --primary-color: rgb(77, 179, 37);
    --secondary-color: rgb(56, 82, 79);
    width: 300px;
    font-family: "Arial";
    padding: 1rem;
    cursor: pointer;
    border-radius: var(--border-radius);
    background: rgb(255, 255, 255);
    box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 3%);
    position: relative;
  }

  .card > * + * {
    margin-top: 1.1em;
  }

  .card .card__content {
    color: var(--secondary-color);
    font-size: 0.86rem;
    color: rgb(25, 120, 80);
  }

  .card .card__title {
    padding: 0;
    font-size: 1.3rem;
    font-weight: 800;
    color: rgb(25, 120, 80);
  }

  .card .card__date {
    color: rgb(30, 169, 64);
    font-size: 0.8rem;
  }

  .card .img {
    width: 280px;
    height: 200px;
    border-radius: var(--border-radius);
  }

  .card .card__arrow {
    position: absolute;
    background: var(--primary-color);
    padding: 0.4rem;
    border-top-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    bottom: 0;
    right: 0;
    transition: 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card svg {
    transition: 0.2s;
  }

  /* hover */
  .card:hover .card__title {
    color: var(--primary-color);
    text-decoration: underline;
  }

  .card:hover .card__arrow {
    background: rgb(25, 120, 80);
  }

  .card:hover .card__arrow svg {
    transform: translateX(3px);
  }
`;

export default CampgroundHomeCard;
