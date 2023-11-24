import { Controller } from "./controller/Controller";

class App {
  async play() {
    await new Controller().start();
  }
}

export default App;

const app = new App();
app.play();
