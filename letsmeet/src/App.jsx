
import './App.css';
// import img from '../components/img1'

function App() {
  return (

    <body>
      <div className='background'>
        <div className='inner-1'>
          <p style={{ fontSize: "2pc", fontWeight: "bold", marginLeft: "140px" }}>LOGIN HERE</p>


          <div style={{ gap: "50px", display: "grid" }}>
            <div>
              <p style={{ fontWeight: "bold", fontSize: "20px", marginTop: "0px", marginBottom: "0px" }}>User Name</p>
              <textarea style={{ width: "100%" }}></textarea>

            </div>
            <div>
              <p style={{ fontWeight: "bold", fontSize: "20px", marginTop: "0px", marginBottom: "0px" }}>Password</p>
              <textarea style={{ width: "100%" }}></textarea>

            </div>
            <button>LOGIN IN</button>

          </div>

        </div>
      </div>

    </body>



  );
}

export default App;
