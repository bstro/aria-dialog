import React from "react";
import {
  OverlayContainer,
  useOverlayPosition,
  useOverlayTrigger
} from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import "./styles.css";
import { PopoverWithTrigger } from "./PopoverWithTrigger";

export default function App() {
  return (
    <>
      <PopoverWithTrigger>
        {({ Trigger, Popover }) => (
          <>
            <div style={{ position: "absolute", left: "25%", top: "25%" }}>
              <Trigger elementType="button">
                <button>Toggle!</button>
              </Trigger>
            </div>

            <Popover>
              {({ Header, Main, Footer }) => (
                <>
                  <Header>Header!</Header>
                  <Main>Main</Main>
                  <Footer>Footer</Footer>
                </>
              )}
            </Popover>
          </>
        )}
      </PopoverWithTrigger>
    </>
  );
}
