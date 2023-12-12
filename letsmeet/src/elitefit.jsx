import React, { useEffect, useState } from 'react'
import "./new.css"
import axios from 'axios';
import ImgData from './images.json'

export default function Elitefit() {
  const [hoveredElement, setHoveredElement] = useState(null);
  const [check, setcheck] = useState(null);

  const handleMouseEnter = (elementNumber) => {
    setHoveredElement(elementNumber);
  };

  const handleMouseLeave = () => {
    setHoveredElement(null);
  };

  const [data, setdata] = useState(null);
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  async function fetchData() {
    const url = 'http://localhost:3001/api/test-api/testimonials.json';
    // const url = 'http://elitefit4you.com/test-api/testimonials.json';

    try {
      const response = await axios.get(url);
      setdata(response.data["testimonials"]);
      console.log(data)
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const openSearch = () => {
    // Update the check state to a non-null value
    setcheck(!check); // You can replace 'SomeValue' with the desired non-null value
  }
  useEffect(() => {

    fetchData()
  }, [data])
  return (
    <div className='container-fluid' style={{ width: "100%", height: "40px", backgroundColor: "black", gap: "10px" }}>

      {check && (<div style={{ borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", padding: "6px", position: "absolute", width: "500px", height: "70px", backgroundColor: "white", top: "20vh", right: "0%", gap: "15px" }}>
        <textarea style={{ borderWidth: "px", borderRadius: "6px", width: "300px" }}></textarea>
        <button style={{ backgroundColor: "black", color: "white", borderRadius: "10px", width: "100px", height: "40px" }}>Search</button>

      </div>)

      }
      <div className='row'>
        <div className='col-sm-12 shipping '>
          <p>FREE SHIPPING ON ALL ORDERS</p>
        </div>
      </div>
      <div className="row">

        <div className="col-sm-4" style={{ display: "flex", alignItems: "center" }}>
          <p className="x2">PISTONS</p>
        </div>
        <div className="col-sm-4">
          <div className="row" style={{ fontWeight: "bold", height: "100%" }}>
            <div className="col-3 centy">New</div>
            <div className="col-3 centy"><a style={{ color: "black", textDecoration: "none" }} href="#about" onClick={scrollToAbout}>
              About
            </a></div>
            <div className="col-3 centy">Ascessories</div>
            <div className="col-3 centy">Collection</div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="align-icon" style={{ display: "flex", alignItems: "center" }}>
            <button className="back" onClick={openSearch}></button>
            <div className="back1"></div>
          </div>
        </div>
      </div>
      <div className="row">

        <div className="pulse1 col-md-6 p-0" style={{ height: "600px", backgroundColor: "grey" }}>
          <img src="https://thecoolmom.co/wp-content/uploads/2023/02/pexels-energepiccom-110473-1-scaled.jpg" alt="" className='image1'/>
        </div>
        <div className="pulse1 col-md-6 p-0" style={{ height: "600px", backgroundColor: "grey" }}>
          <img src="https://images.pexels.com/photos/261450/pexels-photo-261450.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className='image1'/>
        </div>
        <div className="pulse1 col-md-6 p-0" style={{ height: "600px", backgroundColor: "grey" }}>
          <img src="https://images.pexels.com/photos/753695/pexels-photo-753695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className='image1'/>
        </div>
        <div className="pulse1 col-md-6 p-0" style={{ height: "600px", backgroundColor: "grey" }}>
          <img src="https://images.pexels.com/photos/5240857/pexels-photo-5240857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className='image1'/>
        </div>
        <div className="pulse1 col-md-6 p-0" style={{ height: "600px", backgroundColor: "grey" }}>
          <img src="https://images.pexels.com/photos/4348078/pexels-photo-4348078.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className='image1'/>
        </div>
        <div className="pulse1 col-md-6 p-0" style={{ height: "600px", backgroundColor: "grey" }}>
          <img src="https://images.unsplash.com/photo-1620298228682-e5eb972dfbe1?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='image1'/>
        </div>
      </div>
      <div className="row container-fluid" style={{ padding: "100px" }}>
        <div id="about" className="col-md-6 about" style={{ height: "600px" }}>
          <img src={ImgData[0].about} alt="About" className="zoom" />
        </div>
        <div className="col-md-6 " style={{ fontSize: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>

          <p style={{ width: "50%" }}>
            <h1 >
              ABOUT  PISTONS
            </h1>
            Established in 1897, our beloved fountain pen haven, 'PISTONS,' has been a haven for pen enthusiasts for generations. With a century-long dedication to fine writing instruments, we've bridged tradition and modernity, offering a curated selection of vintage and contemporary fountain pens. Our little shop, nestled in the heart of town, continues to inspire a love for the art of writing, connecting past and present through the timeless elegance of ink on paper.
          </p>
        </div>
      </div>



      <div style={{ backgroundColor: "whitesmoke", width: "100%", paddingTop: "25px", paddingLeft: "50px", paddingRight: "50px", }}>
        <div style={{ textAlign: "center" }} >
          <h1>TESTIMONIALS</h1>
        </div>
        <div className="row 10 " style={{ padding: "50px" }}>


          <div className="col-xl-3" style={{ justifyContent: "center", display: "flex" }}>
            {hoveredElement === 1 ? (
              <div className="new11" style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "5px", fontSize: "16px", color: "white", height: '277px', width: '277px', borderRadius: '15px' }} onMouseLeave={handleMouseLeave}>
                <p style={{ width: "200px" }}>"{data[0]?.message}"</p>
              </div>
            ) : (
              <div className="new1" style={{ height: '277px', width: '277px', borderRadius: '15px' }} onMouseEnter={() => handleMouseEnter(1)}></div>
            )}
          </div>
          <div className="col-xl-3" style={{ justifyContent: "center", display: "flex" }}>
            {hoveredElement === 2 ? (
              <div className="new11" style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "5px", fontSize: "16px", color: "white", height: '277px', width: '277px', borderRadius: '15px' }} onMouseLeave={handleMouseLeave}>
                <p style={{ width: "200px" }}>"{data[1]?.message}"</p>
              </div>
            ) : (
              <div className="new2" style={{ height: '277px', width: '277px', borderRadius: '15px' }} onMouseEnter={() => handleMouseEnter(2)}></div>
            )}

          </div>
          <div className="col-xl-3" style={{ justifyContent: "center", display: "flex" }}>
            {hoveredElement === 3 ? (
              <div className="new11" style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "5px", fontSize: "16px", color: "white", height: '277px', width: '277px', borderRadius: '15px' }} onMouseLeave={handleMouseLeave}>
                <p style={{ width: "200px" }}>"{data[2]?.message}"</p>
              </div>
            ) : (
              <div className="new3" style={{ height: '277px', width: '277px', borderRadius: '15px' }} onMouseEnter={() => handleMouseEnter(3)}></div>
            )}
          </div>
          <div className="col-xl-3" style={{ justifyContent: "center", display: "flex" }}>
            {hoveredElement === 4 ? (
              <div className="new11" style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "5px", fontSize: "16px", color: "white", height: '277px', width: '277px', borderRadius: '15px' }} onMouseLeave={handleMouseLeave}>
                <p style={{ width: "200px" }}>"{data[3]?.message}"</p>
              </div>
            ) : (
              <div className="new4" style={{ height: '277px', width: '277px', borderRadius: '15px' }} onMouseEnter={() => handleMouseEnter(4)}></div>
            )}
          </div>
        </div>

      </div>
      <div className='footer container-fluid'>
        <div style={{ gap: "15px", display: "inline-grid" }}>
          <div style={{ color: "white", width: "151px", height: "62px", fontSize: "35px" }}>
            PISTONS
          </div>
          <div style={{ color: "white", fontSize: "28px", justifyContent: "center" }}>
            STAY CONNECTED
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <div className='logo_size back2'></div>
            <div className='logo_size back3'></div>
            <div className='logo_size back4'></div>
            <div className='logo_size back5'></div>
            <div className='logo_size back6'></div>

          </div>
        </div>

      </div>







    </div>
  )
}
