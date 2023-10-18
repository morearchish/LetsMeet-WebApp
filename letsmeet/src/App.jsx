
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
              <form id="login-form">
                <p style={{ fontWeight: "bold", fontSize: "20px", marginTop: "0px", marginBottom: "0px" }}>User Name</p>
                <input style={{ height: "35px", width: "480px" }} type="text" name="username" id="username" />
              </form>
            </div>
            <div>
              <form id="login-form">
                <p style={{ fontWeight: "bold", fontSize: "20px", marginTop: "0px", marginBottom: "0px" }}>Password</p>
                <input style={{ width: "480px", height: "35px" }} type="password" name="password" id="password" />
              </form>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button style={{ height: "50px", width: "300px" }} id="login-button">LOGIN IN</button>
            </div>

          </div>

        </div>
      </div>

    </body>



  );
}

export default App;
