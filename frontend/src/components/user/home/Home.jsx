import React, { useRef, useState } from "react";
import "./Home.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "../Navbar/Navbar"

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Home() {
  const [hoveredSection, setHoveredSection] = useState(null);
  let data =""
  if(hoveredSection == "section1"){
    data = "wagini"
  }
  else if(hoveredSection == "section2"){
    data = "buzz"
  }
  else {
    data = null
  }

  

  return (
    <>
    
      <Navbar data={data}/>
     
      <div className="hm-container">
        <div className="sec-1"  onMouseEnter={() => setHoveredSection('section1')}
          onMouseLeave={() => setHoveredSection(null)}>
          hello 1
          <p style={{width:"900px",height:"200px",backgroundColor:"green"}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae soluta, nostrum itaque iure quis enim et, quos illo ullam animi earum! Quasi nobis aperiam fuga ipsam fugiat quae, rerum est architecto, non suscipit consequuntur culpa, quia similique atque ullam. Doloremque consectetur enim iste magnam exercitationem ab ea provident laboriosam fuga aut. Enim rem sunt animi odio! Repellendus eum quod accusamus, odit modi pariatur ea recusandae dolore suscipit voluptate quam enim nisi cumque id minus qui? Dicta reprehenderit laboriosam quod ducimus ut nihil eaque quia earum voluptate doloribus adipisci non assumenda, alias enim sapiente sint inventore? Accusamus ullam quibusdam eos corrupti.</p>

        </div>
        <div className="sec-2"  onMouseEnter={() => setHoveredSection('section2')}
          onMouseLeave={() => setHoveredSection(null)}>
          hello 2
          <p style={{width:"900px",height:"200px",backgroundColor:"green"}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae soluta, nostrum itaque iure quis enim et, quos illo ullam animi earum! Quasi nobis aperiam fuga ipsam fugiat quae, rerum est architecto, non suscipit consequuntur culpa, quia similique atque ullam. Doloremque consectetur enim iste magnam exercitationem ab ea provident laboriosam fuga aut. Enim rem sunt animi odio! Repellendus eum quod accusamus, odit modi pariatur ea recusandae dolore suscipit voluptate quam enim nisi cumque id minus qui? Dicta reprehenderit laboriosam quod ducimus ut nihil eaque quia earum voluptate doloribus adipisci non assumenda, alias enim sapiente sint inventore? Accusamus ullam quibusdam eos corrupti.</p>
        </div>
      </div>




    </>
  );
}
