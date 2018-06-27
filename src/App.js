import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom"

import News from "./News";
import About from "./About"
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <News />
          <footer>
            <About />
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
