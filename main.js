import { Application, Container, Sprite, Assets, noiseFrag, DisplacementFilter } from "./pixi.min.js";

const app = new Application();

const snowflakes = [];

async function setup() {
    await app.init({ resizeTo: window, background: '#44667f' })
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

function addSnow(app, snowflakes) {
    const snowCounter = new Container();
    app.stage.addChild(snowCounter);

    const totalSnow = 25;
    const snowAssests = ['snow_light', 'snow_medium'];
    for (let i = 0; i < totalSnow; i++) {
        const snowAssest = snowAssests[i % snowAssests.length];
        const snow = Sprite.from(snowAssest);

        snow.anchor.set(0.5);

        snow.scale.set(2 + Math.random() * 1);

        snow.x = 1 + Math.random() * app.screen.width;
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
        scale: 20,
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

            const snowflake = snowflakes[i];
            snowflake.y += Math.sin(1);

            if (snowflake.y - snowflake.height / 4 > app.screen.height) {
                snowflake.y = -snowflake.height / 2;
                snowflake.x = Math.random() * app.screen.height;
            }

        }
    })
}

sceneSnowy();
