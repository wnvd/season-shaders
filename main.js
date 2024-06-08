import { Application, Container, Sprite, Assets, Rectangle, DisplacementFilter } from "./pixi.min.js";

const app = new Application();

const snowflakes = [];

async function setup() {
    await app.init({ resizeTo: window, background: '#000000' })
    document.body.appendChild(app.canvas);
}


async function preload() {
    const assests = [
        { alias: 'snowflake', src: '/snow_medium.png' },
        { alias: 'displacement', src: '/displacement.png' },
    ];

    await Assets.load(assests);
}

function addSnow(app, snowflakes) {
    const snowCounter = new Container();
    app.stage.addChild(snowCounter);

    const totalSnow = 60;
    for (let i = 0; i < totalSnow; i++) {
        const snow = Sprite.from('snowflake');

        snow.anchor.set(0.5);

        snow.scale.set(1 + Math.random() * 0.09);

        snow.x = Math.random() * app.screen.width;
        snow.y = Math.random() * app.screen.height;

        snowCounter.addChild(snow);
        snowflakes.push(snow);
    }

}

function addDispalcementEffect(app) {
    const sprite = Sprite.from('displacement');
    sprite.texture.baseTexture.wrapMode = 'repeat';

    const filter = new DisplacementFilter({
        sprite,
        scale: 30,
        width: app.screen.width,
        height: app.screen.height,
    });

    app.stage.filters = [filter];
}


async function sceneSnowy() {
    await setup();
    await preload();
    addSnow(app, snowflakes);
    addDispalcementEffect(app);

    app.ticker.add(() => {
        for (let i = 0; i < snowflakes.length; i++) {
            snowflakes[i].y += Math.sin(3);

            if (snowflakes[i].y - snowflakes[i].height / 2 > app.screen.height) {
                snowflakes[i].y = -snowflakes[i].height / 2;
                snowflakes[i].x = Math.random() * app.screen.height;
            }

        }
    })
}

sceneSnowy();
