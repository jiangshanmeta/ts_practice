import * as mobilenet from '@tensorflow-models/mobilenet'
import * as tf from '@tensorflow/tfjs'
import { MobileNet } from '@tensorflow-models/mobilenet'

import { TensorInformation } from './TensorInformation'

export class ImageClassifier {
    private model: MobileNet|null = null;
    constructor () {
        tf.ENV.set('WEBGL_PACK', false)
    }

    public async Classify (image: tf.Tensor3D | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement): Promise<TensorInformation[] | null> {
        if (!this.model) {
            this.model = await mobilenet.load()
        }
        if (this.model) {
            const result = await this.model.classify(image)
            return {
                ...result
            }
        }
        return null
    }
}
