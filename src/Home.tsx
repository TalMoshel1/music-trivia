import GameProvider from "./store/gameContext";
import { Outlet } from "react-router-dom";

function Home() {

    return <div style={{ backgroundColor: '#FAFAFA', height: '100vh', overflow: 'hidden' }}>
      <GameProvider>
        <Outlet></Outlet>
      </GameProvider>
    </div>;
  }
  
  export default Home;