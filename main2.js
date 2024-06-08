/*
 * for some reason this ended you using >150 MB of memory.
 * the implementation i came up with only used ~38 MB.
 * */
import { Application, Container, Sprite, Assets, DisplacementFilter } from "./pixi.min.js";

const app = new Application();

const clouds = [];

async function setup() {
    // background color summer sky
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
        { alias: 'displacement', src: '/displacement_map.png' },
    ];

    await Assets.load(assests);
}

function addCloud(app, clouds) {

    const cloudContainer = new Container();
    app.stage.addChild(cloudContainer);

    const TOTAL_CLOUDS = 10;

    // keys for assest object array
    const cloudAssests = ['cloud1', 'cloud2', 'cloud3', 'cloud4', 'cloud5'];

    for (let i = 0; i < TOTAL_CLOUDS; i++) {

        const cloudAssest = cloudAssests[i % cloudAssests.length]

        const cloud = Sprite.from(cloudAssest);

        cloud.anchor.set(0.5);

        // assign additional properties for the animation
        cloud.direction = Math.random() * Math.PI * 2;

        // cloud.tint = Math.random() * 0xffffff;

        // randomly position the cloud sprite around the stage
        cloud.x = Math.random() * app.screen.width;
        cloud.y = Math.random() * app.screen.height;

        cloud.scale.set(0 + Math.random() * 0.05);

        cloudContainer.addChild(cloud);

        clouds.push(cloud);
    }


}

function animateClouds(app, clouds, time) {

    const stagePadding = 100;
    const boundWidth = app.screen.width + stagePadding * 2;

    clouds.forEach((cloud) => {
        cloud.x += Math.sin(3)

        if (cloud.x > -stagePadding) {
            cloud.x += boundWidth;
        }

        if (cloud.x > app.screen.width + stagePadding) {
            cloud.x -= boundWidth;
        }
    });

}

function addDisplacement(app) {
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

(async () => {
    await setup();
    await preload();

    addCloud(app, clouds);
    addDisplacement(app);

    app.ticker.add((time) => {
        animateClouds(app, clouds, time);

        for (let i = 0; i < clouds.length; i++) {
            clouds[i].x += Math.sin(1);

            if (clouds[i].x - clouds[i].width / 2 > app.screen.width) {
                clouds[i].x = -clouds[i].width / 2;
                clouds[i].y = Math.random() * app.screen.height;
            }
        }
    });
})();
