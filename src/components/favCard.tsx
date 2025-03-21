'use client'
import React from 'react';
import styled from 'styled-components';

const FavCard = () => {
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
          <p className="card__job-title">CEDT camp</p>
          <img
                            src="/img/lakeside.jpg"
                            alt="Description of image"
                            className="w-full h-full object-cover"
                        />
        </section>
        <footer className="card__footer">
          <div className="card__job-summary">
            <div className="card__job-icon">
            <img src="/img/logo.png" alt="Logo" width={50} height={20} />
            </div>
            <div className="card__job">
              <p className="card__job-title">
                Cedt camp <br />
              </p>
            </div>
          </div>
          <button className="card__btn">view</button>
        </footer>
      </article>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    margin: auto;
    width: min(300px, 100%);
    background-color: #fefefe;
    border-radius: 1rem;
    padding: 0.5rem;
    color: #141417;
  }
  .card__hero {
    background-color:rgb(210, 249, 193);
    border-radius: 0.5rem 0.5rem 0 0;
    padding: 1.5rem;
    font-size: 0.875rem;
  }
  .card__hero .card__job-title {
    margin: 0;
    font-size: 2rem;
    font-weight: 600;
    padding-right: 2rem;
  }
    .card__hero img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
  }
  .card__hero-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 1rem;
    font-weight: 700;
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
  .card__job-summary {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 0.75rem;
  }
  .card__btn {
    width: 100%;
    font-weight: 400;
    border: none;
    display: block;
    cursor: pointer;
    text-align: center;
    padding: 0.5rem 1.25rem;
    border-radius: 1rem;
    background-color: #141417;
    color: #fff;
    font-size: 1rem;
  }
  @media (min-width: 340px) {
    .card__btn {
      width: max-content;
    }
  }`;

export default FavCard;
