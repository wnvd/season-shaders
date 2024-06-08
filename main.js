import { Application, Container, Sprite, Assets, DisplacementFilter } from "./pixi.min.js";

const app = new Application();

const clouds = [];

async function setup() {
    await app.init({ resizeTo: window, background: '#87CEEB' })
    document.body.appendChild(app.canvas);
}

async function preload() {
    const assests = [
        { alias: 'cloud1', src: '/clouds/cloud1.png' },
        { alias: 'cloud2', src: '/clouds/cloud2.png' },
        { alias: 'cloud3', src: '/clouds/cloud3.png' },
        { alias: 'cloud4', src: '/clouds/cloud4.png' },
        { alias: 'cloud5', src: '/clouds/cloud5.png' },
        { alias: 'displacement', src: '/Perlin-4.png' },

    ];

    await Assets.load(assests);
}

function addClouds(app, clouds) {
    const cloudContainer = new Container();
    app.stage.addChild(cloudContainer);

    const totalClouds = 15;
    const cloudAssests = ['cloud1', 'cloud2', 'cloud3', 'cloud4', 'cloud5'];

    for (let i = 0; i < totalClouds; i++) {
        const cloudAssest = cloudAssests[i % cloudAssests.length];
        const cloud = Sprite.from(cloudAssest);

        cloud.anchor.set(0.5);

        cloud.scale.set(0 + Math.random() * 0.08);

        cloud.x = Math.random() * app.screen.width;
        cloud.y = Math.random() * app.screen.height;

        cloudContainer.addChild(cloud);
        clouds.push(cloud);

    }

}

function addDisplacementEffect(app) {
    const sprite = Sprite.from('displacement');
    sprite.texture.baseTexture.wrapMode = 'repeat';

    const filter = new DisplacementFilter({
        sprite,
        scale: 9,
        width: app.screen.width,
        height: app.screen.height,
    });

    app.stage.filters = [filter];
}


async function setSceneSunny() {
    await setup();
    await preload();
    addClouds(app, clouds);
    addDisplacementEffect(app);

    app.ticker.add((time) => {
        for (let i = 0; i < clouds.length; i++) {
            clouds[i].x += Math.sin(0.01); // 0.01

            if (clouds[i].x - clouds[i].width / 2 > app.screen.width) {
                clouds[i].x = -clouds[i].width / 2;
                clouds[i].y = Math.random() * app.screen.height;
            }
        }
    });

}

setSceneSunny();
