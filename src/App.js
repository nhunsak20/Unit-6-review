import React from "react";
import { withRouter } from 'react-router-dom'
import Header from "./Components/Header";
import AuthHeader from "./Components/AuthHeader";
import routes from "./routes"
import "./App.css";

function App(props) {
  return (
    <div className="App">
      {props.location.pathname === "/" ||
      props.location.pathname === "/register" ? (
        <>
          <AuthHeader />
          {routes}
        </>
      ) : (
        <>
          <Header />
          {routes}
        </>
      )}
    </div>
  );
}

export default withRouter(App);
