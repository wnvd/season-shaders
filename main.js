import { Application, Container, Sprite, Assets, DisplacementFilter, Graphics, FillGradient } from "./pixi.min.js";

const app = new Application();
const colorStops = [0x5996d1, 0x2758a2, 0xb2e74];
const gradientFill = new FillGradient(0, 1500, 0, 0);

const snowflakes = [];

async function setup() {
    await app.init({ resizeTo: window, background: '0xffffff' })
    document.body.appendChild(app.canvas);
}


async function preload() {
    const assests = [
        { alias: 'snow_light', src: '/snow_light.png' },
        { alias: 'snow_medium', src: '/snow_medium.png' },
        { alias: 'snow_heavy', src: '/snow_heavy.png' },
        { alias: 'displacement', src: '/displacement.png' },
        { alias: 'noise', src: '/Grainy-2-noise.png' },
        { alias: 'noise2', src: '/Perlin-6-noise.png' },
        { alias: 'noise3', src: '/Craters-14-noise.png' },
    ];

    await Assets.load(assests);
}

function addGradient() {

    colorStops.forEach((number, index) => {
        const ratio = index / colorStops.length;
        gradientFill.addColorStop(ratio, number);
    });

    const backdrop = new Graphics().rect(0, 0, app.screen.width, app.screen.height, 0).fill({ fill: gradientFill });

    app.stage.addChild(backdrop);
}

function addSnow(app, snowflakes) {
    const snowCounter = new Container();
    app.stage.addChild(snowCounter);

    const totalSnow = 300;
    const snowAssests = ['snow_light', 'snow_medium'];
    for (let i = 0; i < totalSnow; i++) {
        const snowAssest = snowAssests[i % snowAssests.length];
        const snow = Sprite.from(snowAssest);

        snow.anchor.set(0.5);

        snow.scale.set(1.5 + Math.random() * 1);

        snow.x = 6 + Math.random() * app.screen.width;
        snow.y = 1 + Math.random() * app.screen.height;


        snowCounter.addChild(snow);
        snowflakes.push(snow);
    }

}

function addDispalcementEffect(app) {
    const sprite = Sprite.from('displacement');
    sprite.texture.baseTexture.wrapMode = 'repeat';

    const filter = new DisplacementFilter({
        sprite,
        scale: 15,
        width: app.screen.width,
        height: app.screen.height,
    });

    app.stage.filters = [filter];
}


async function sceneSnowy() {
    await setup();
    await preload();
    addGradient();
    addSnow(app, snowflakes);
    addDispalcementEffect(app);

    const frequency = 0.0001;
    const amplitude = 2;

    app.ticker.add((time) => {

        for (let i = 0; i < snowflakes.length; i++) {
            const snowflake = snowflakes[i];
            snowflake.y += Math.sin(0.5) * time.deltaTime;

            snowflake.x += Math.sin(frequency * snowflake.y) * amplitude * time.deltaTime;

            if (snowflake.y - snowflake.height / 2 > app.screen.height) {
                snowflake.y = -snowflake.height / 2;
                snowflake.x = Math.random() * app.screen.width;
            }
        }
    })
}

sceneSnowy();
