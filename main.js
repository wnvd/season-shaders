import { Application, Container, Sprite, Assets, Rectangle } from "./pixi.min.js";

const app = new Application();


await app.init({ resizeTo: window, background: '#87CEEB' })
document.body.appendChild(app.canvas);

const container = new Container();
app.stage.addChild(container);

const texture = await Assets.load(`/clouds/cloud2.png`);


const clouds = [];
const totalClouds = 15;

for (let i = 0; i < totalClouds; i++) {

    const cloud = new Sprite(texture);

    cloud.anchor.set(0.5);

    cloud.scale.set(0 + Math.random() * 0.05);

    cloud.x = Math.random() * app.screen.width;
    cloud.y = Math.random() * app.screen.height;

    // cloud.tint = Math.random() * 0xffffff;

    cloud.direction = Math.random() * Math.PI * 2;

    clouds.push(cloud);

    app.stage.addChild(cloud);
}


app.ticker.add((time) => {
    for (let i = 0; i < clouds.length; i++) {
        clouds[i].x += Math.sin(0.01);

        if (clouds[i].x - clouds[i].width / 2 > app.screen.width) {
            clouds[i].x = -clouds[i].width / 2;
            clouds[i].y = Math.random() * app.screen.height;
        }
    }
});
