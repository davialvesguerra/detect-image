import { PredictImage } from './modules/predictImage'
import { apiDog } from './service/apiDogService'

const imageDog = <HTMLImageElement>document.querySelector('#imgDog')

const predictDogImage = new PredictImage('https://dog.ceo/api/breeds/image/random', imageDog, apiDog)
predictDogImage.predictImage()

