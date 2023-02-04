import GameProvider from "./store/gameContext";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { themeLight, themeDark } from "./theme/theme";
import {useState} from 'react'
function Home({ className }: { className?: string }) {
  const [theme, useTheme] = useState(themeLight)
    return (
    <div className={className}>
      <ThemeProvider theme={theme}>
        <GameProvider>
          <Outlet></Outlet>
        </GameProvider>
      </ThemeProvider>
    </div>
  );
}

export default styled(Home)`
  background-color: #ffc700;
  width: 100%;
  overflow: hidden;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
