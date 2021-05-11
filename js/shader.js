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
        uniform float red;
        uniform float green;
        uniform float blue;
        uniform float exposure;
        uniform float con;

        void main(void){
            vec4 color = texture2D(uSampler, vTextureCoord);
            if (color.a != 0.0){
                color.r += red;
                color.g += green;
                color.b += blue;
                color = (1.0 + exposure) * color;
                color =  0.5 + (1.0 + con) * (color - 0.5);
            }
            gl_FragColor = color;
        }
    `,
    delta: 0
}

//why exposure?
/**
 This is similar to brightness, but the change of brightness is proportional to the luminosity of the colours. In other words, we have to multiply instead of add. We have to use 1 as the base value for the exact same reason we had to for contrast.
 */

let x = 10  // divisive value to amenize the color temperature
let date = new Date();
let hours = date.getHours();
let rr = (255 / x) / 255;
let gg = (250 / x) / 255;
let bb = (230 / x) / 255;
let ex = 50 / 255;
let con = .2

// meio dia -
// tarde -
// anoitecer -
// noite -
// manha -


/* if (hours < 12 && hours > 6){
    for (let c = 0; hours > c; c++){
        // rr += 1
        // gg = ?
        // bb = ?
    }
} else if (hours > 12 && hours < 18){
    for (let c = 0; hours > c; c++){
        // rr = ?
        // gg = ?
        // bb = ?
    }
} else if (hours > 18 && hours < 20){
    for (let c = 0; hours > c; c++){
        // rr = ?
        // gg = ?
        // bb = ?
    }
} else {
    for (let c = 0; hours > c; c++){
        // rr = ?
        // gg = ?
        // bb = ?
    }
} */
let uniforms = {
    red: rr,
    green: gg,
    blue: bb,
    exposure: ex,
    con: con
}

const time = new PIXI.Filter(shader.vertShader, shader.fragShader, uniforms);

export default time

// ideias 
/*
    shader de luz para o sol e a lua
    em vez de fazer varios desenhos a ideia agora é mudar as cores do desenho em relaçao ao ao horario do dia, desse modo nao preciso fazer desenhos, posso mudar matematicamente os pixels
    ate agora tenho:
    - fazer 3 containers variaveis para R G B
    - cada container vai ter uma fase diferente do outro de acordo com a mudança das cores no dia
    - provavelmente tem que acabar em um ciclo, de manha é mais frio, de tarde esquenta as cores, de noite começa a esfriar, de manha retorna o ciclo
    - talvez mudar os sprides ate agora, o jeito que estao agora ele esta levando em consideraçao uma fonte de luz da direita, assim nao mudando o lugar do sol nunca
    talvez o melhor é fazer 8 desenhos para cada faze do sol e da lua e seguir a vida ou fazer de um modo que o desenho nao tenha em si nenhuma luz direcional
    - estudar as cores do dia para ver como variar os containers

    shader de tv antiga ainda é real, tem que estudar mais em como fazer

*/

// essa ideia ainda mantem de referencia 
/* 
    serão geradas 4 cenarios:
    manha - sol nascendo, iluminaçao amarelada/laranjada, vento calmo, vibe de tempo fresco
    tarde - sol em no topo, iluminaçao mais azulada, vento mais forte, vibe de tempo mais quente
    fim de tarde - sol no canto, iluminaçao laranjada, vendo forte, vibe de tempo ameno
    noite, lua no céu, vento forte, vibe bem fresca
*/