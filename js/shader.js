let shader = {
    vertShader: `
        attribute vec2 aVertexPosition;
        attribute vec2 aTextureCoord;
        uniform mat3 projectionMatrix;
        varying vec2 vTextureCoord;
        void main(void)
        {
            gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
            vTextureCoord = aTextureCoord;
        }
    `,
    fragShader: `
        varying vec2 vTextureCoord;
        uniform sampler2D uSampler;
        uniform float delta;
        void main(void){
            vec4 color = texture2D(uSampler, vTextureCoord);
            if (color.a != 0.0){
                color.r = delta;
                color.g -= delta;
                color.b -= delta;
            }
            gl_FragColor = color;
        }
    `,
    delta: 0
}
const noise = new PIXI.Filter(shader.vertShader, shader.fragShader, shader.delta);

export default noise