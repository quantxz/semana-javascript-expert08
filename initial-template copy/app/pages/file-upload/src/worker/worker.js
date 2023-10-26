import VideoProcessor from "./videoProcessor.js"
import MP4Demuxer from "./mp4Demuxer.js"
//vai tranformar o video em 144p
const qvgaConstraints = {
    width: 320, 
    heigth: 240
}

//desafio pra fazer
const vgaConstraints = { 
    width: 640,
    heigth: 480
}
const hdConstraints = { 
    width: 1280,
    heigth: 720
}

//configurando o formato que o encoder vai codificar o video
const encoderConfig = {
    //colocando os valores do qvgaConstraints como formato a ser encodado
    ...qvgaConstraints,
    //velocidade de ler os arquivos(10e6 é 1 mega por segundo)
    bitrate: 10e6,
    //webM
    codec: "vp09.00.10.08",
    pt: 4,
    hardwareAcceleration: 'prefer-software',



    //mp4
    /* codec: "avc1.42002A",
    pt: 1,
    hardwareAcceleration: 'prefer-hardware',
    avc: { format: 'annexb' } */
}

const mp4Demuxer = new MP4Demuxer
const videoProcessor = new VideoProcessor({
    mp4Demuxer
})

onmessage = async ({ data }) => {
    await videoProcessor.start({
        file: data.file,
        encoderConfig,
        sendMessage(message) {
            self.postMessage(message)
        }
    })


    self.postMessage({
        status: 'done'
    })
}