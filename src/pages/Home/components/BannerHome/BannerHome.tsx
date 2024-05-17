"use client";
import React, { useEffect } from 'react';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';

export type BannerHomeProps = {
}

const BannerHome: React.FC<BannerHomeProps>  = ({}) => {
  useEffect(() => {
    AOS.init();
  }, [])
  
	return (
		<BannerHomeStl data-aos="fade-up">
			<div className="blocks">
				<div className="block">
					<a href="#link">
					<div>Bogotá</div>
					<img src="https://images.freeimages.com/images/large-previews/17c/miami-city-1218429.jpg" alt="" />
					</a>
				</div>
				<div className="block">
					<a href="#link">
					<div>Medellín</div>
					<img src="https://media.istockphoto.com/id/476013574/es/foto/hong-kong-en-la-noche.jpg?s=1024x1024&w=is&k=20&c=V5vX9gpJy1tlcq_kpx8OPPVLOoE97XMhi7UH1DzCeog=" alt="" />
					</a>
				</div>
				<div className="block">
					<a href="#link">
					<div>Tunja</div>
					<img src="https://www.gannett-cdn.com/presto/2020/02/25/USAT/940dfe56-9479-417f-b5b0-d69846c1f64a-GettyImages-535771789.jpg?crop=5312%2C2988%2Cx0%2Cy1249&amp;width=1200" alt="" />
					</a>
				</div>
				<div className="block">
					<a href="#link">
					<div>Barranquilla</div>
					<img src="https://images.freeimages.com/images/large-previews/c2e/city-glow-1447263.jpg" alt="" />
					</a>
				</div>
			</div>
 		</BannerHomeStl>
	);
};

export const BannerHomeStl = styled.div`
@media only screen and (max-width: 600px) {
    .blocks {
	margin-top: 50px;
      flex-wrap: wrap;
      flex-direction: column;
      }
      .block {
      clip-path: none !important;
    }
  }
  .blocks {
    display: flex;
    height: 500px;
    overflow: clip;
  
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      will-change: filter;
    }
    
    .block {
      container: block/inline-size;
      flex: 1;
      margin-right: -20%;
      clip-path: polygon(20% 0, 100% 0%, 80% 100%, 0% 100%);
      transition: .25s flex .125s linear;
      will-change: flex;
      
      a {
        position: relative;
  
        div {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          color: #fff;
          font-size: clamp(12px, 5cqw, 32px);
          z-index: 2;
        }
      }
      
      &:first-child {
        img {
          filter: grayscale(0);
        }
      }
      
      img {
        filter: grayscale(1);
      }
      
      &:hover {
        flex: 1.25;
      }
      
      &:hover img {
        filter: grayscale(0);
      }
      
      &:first-child {
        clip-path: polygon(0 0, 100% 0%, 80% 100%, 0% 100%);
      }
      
      &:last-child {
        margin-right: -15%;
        clip-path: polygon(20% 0, 100% 0%, 100% 100%, 0% 100%);
      }
    }
    
    &:has(.block:not(:first-child):hover) {
      .block:first-child img {
        filter: grayscale(1);
      }
    }
  }`;

export default BannerHome;
