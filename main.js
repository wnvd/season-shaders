import { Application, Container, Sprite, Assets, Rectangle } from "./pixi.min.js";

const app = new Application();


await app.init({ resizeTo: window, background: '#87CEEB' })
document.body.appendChild(app.canvas);

const container = new Container();
app.stage.addChild(container);
