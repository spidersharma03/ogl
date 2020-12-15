import { Post } from './Post.js';

export class Pass {
    constructor() {
        this.enabled = true;
        this.renderToScreen = false;
        this.needsSwap = true;
    }

    render(renderer, writeBuffer, readBuffer) {
        console.error('Not implemented');
    }
}

export class RenderPass extends Pass {
    constructor(scene, camera) {
        super();
        this.scene = scene;
        this.camera = camera;
    }
    
    render(renderer, writeBuffer, readBuffer) {
        renderer.render(this.scene, this.camera, readBuffer);
    }
}

export class CustomPost extends Post {
    constructor(gl, options = {}) {
        super(gl, options);
    }

    addPass(pass) {
        this.passes.push(pass);
        return pass;
    }

    render({ target = null, update = true, sort = true, frustumCull = true }) {
        const enabledPasses = this.passes.filter((pass) => pass.enabled);
        enabledPasses.forEach((pass, i) => {
            pass.render(this.gl.renderer, this.fbo.write, this.fbo.read);
            pass.needsSwap && this.fbo.swap();
        });
    }

}