import { Rating } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import getUserList from "@/libs/users/getUserList";
import { Review, Campground } from '../../interface';


const FavCard = ({ reviews }: { reviews?: Review }) => {
  let campgroundName = reviews?.campground?.name || ''
  let camgroundDescription = reviews?.campground?.description || ''
  let campgroubdImage = reviews?.campground?.image || ''
  let campgroundId = reviews?.campground?._id || ''

  console.log(campgroubdImage)

  return (
    <StyledWrapper>
      <article className="card">
        <section className="card__hero">
          <header className="card__hero-header">
            <span>Recommend Camping</span>
            <div className="card__icon">
              <svg height={20} width={20} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
            </div>
          </header>
          <p className="w-72 text-emerald-700 text-4xl font-bold">{campgroundName}</p>
          <img
            src={campgroubdImage}
            alt="Camp img"
            className="w-full h-full object-cover"
          />
        </section>
        <footer className="card__footer">
          <div className="card__job-summary">
            <div className="card__job-icon">
              <img src="/img/logo.png" alt="Logo" width={40} height={40} />
            </div>
            <div className="card__job">
              <h1 className="card__job-title width: 140px;">
                {camgroundDescription} <br />
              </h1>
              <Rating name="read-only" value={reviews?.rating || 0} readOnly />
            </div>
          </div>
          <Link href={`/campground/${campgroundId}`}>
            <button className="card__btn">view</button>
          </Link>
        </footer>
      </article>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    margin: auto;
    width: 350px;
    height: 450px;
    background-color: #fefefe;
    border-radius: 1rem;
    padding: 0.5rem;
    color: #141417;

  }
  .card__hero {
    background-color:rgb(234, 240, 226);
    border-radius: 0.5rem 0.5rem 0 0;
    padding: 1.5rem;
    font-size: 0.875rem;
    width: 333px;
    height: 350px;
    position: relative;
  }
  .card__hero .card__job-title {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
    padding-right: 2rem;
    color:rgb(16, 90, 68);
  }
    .card__job-title {
    margin: 0;
    font-size: 10px;
    font-weight: 200;
    padding-right: rem;
    color:rgb(5, 59, 44);
  }
  .card__hero img {
    width: 300px;
    height: 200px;
    object-fit: cover;
    display: block;
    border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
    position: absolute; 
    bottom : 10px;
    left : 17px;
    }
  .card__hero-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 1rem;
    font-weight: 700;
    color:rgb(22, 97, 66);
  }
  .card__footer {
    display: flex;
    justify-content: flex-start;
    align-items: start;
    flex-direction: column;
    flex-wrap: nowrap;
    padding: 0.75rem;
    row-gap: 1rem;
    font-weight: 700;
    font-size: 0.875rem;
  }
  @media (min-width: 340px) {
    .card__footer {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }
  }
  .card__job {
    display: flex;
    justify-content: flex-start;
    align-items: start;
    flex-direction: column;
    flex-wrap: nowrap;
  }
    .card__job-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 140px; 
  }
  .card__job-summary {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 220px; 
  height: 80px;
  }
    .card__job-icon {
  width: 130px; 
  height: 80px;
}

.card__job-icon img {
  width: 100px; 
  height: 65px;
}

  .card__btn {
    width: 100%;
    font-weight: 600;
    border: none;
    display: block;
    cursor: pointer;
    text-align: left;
    padding: 0.5rem 1.25rem;
    border-radius: 1rem;
    background-color:rgb(29, 186, 81);
    color: #fff;
    font-size: 1rem;
  }
  .card__btn:hover {
    background-color:rgb(201, 240, 193);
    color: rgb(8, 95, 89);
    transform: scale(1.05);
  }
  @media (min-width: 340px) {
    .card__btn {
      width: max-content;
    }
  }
`;

export default FavCard;
