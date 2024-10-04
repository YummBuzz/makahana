import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";


export default function About() {
  return (
   <>
   <Navbar pdScroll={0}/>
   <div className="about-page-section1 margin-div mt-5">
      <div className="container">
        <div className="row about-page-content">
          <div className="col-12 about-page-head">
            <h2>About <span> Us </span></h2>
          </div>
          <div className="col-12 col-lg-9">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
              unde est incidunt nisi? Id molestiae nostrum, accusamus autem enim
              quod eaque magnam culpa harum, porro dolore? Deserunt pariatur
              iusto natus! Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Nihil ducimus nam, assumenda fugiat vero repellat porro
              architecto ex error obcaecati perferendis at voluptatum quaerat
              nisi reprehenderit quasi, maxime commodi voluptatem?
            </p>
          </div>

          <div className="col-12 col-lg-9">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
              obcaecati ullam in, culpa itaque laboriosam quasi. Repellendus ad
              cum corrupti accusantium recusandae nesciunt, doloribus, quasi
              dolores natus illo ullam repudiandae?
            </p>
          </div>
          <div className="col-12">
            <img src="/banners/makhana-bg.jpg" className="img-fluid" />
          </div>
          <div className="col-12 col-lg-9 about-tag">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores doloribus dolores excepturi beatae aut saepe adipisci a
              velit nulla aliquid, id accusamus odit. Ipsam dolores a est facere
              officiis laudantium?
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
   
   
   </>
  )
}
