import { prediction } from "../interfaces/prediction" 

export class PredictImage{
  private _urlApi: string
  private _image: HTMLImageElement
  private _apiToGetImage: Function

  constructor(urlApi: string, image: HTMLImageElement, apiToGetImage: Function){
    this._urlApi = urlApi
    this._image = image
    this._apiToGetImage = apiToGetImage
  }

  private setImageOnHtml(pathImage: string, htmlImage: HTMLImageElement){
    htmlImage.src = pathImage
  }

  private setPredictionsOnHTML(predictions: prediction[], elementHTML: HTMLElement): void{
    predictions.forEach((prediction: prediction, index: number)=>{
      elementHTML.innerHTML += `
        <h3>Probabilidade ${index+1}</h3>
        <p>Nome: ${prediction.className}</p>
        <p>Probabilidade: ${prediction.probability}</p>
      `
    })
  }

  private async modelToPredictImage(model: Promise<Function>,image: HTMLImageElement){
  
    return model
           .then(model => {
              return model.classify(image)
           })
           .then((predictions:prediction[]) => {
              return predictions
           })
  }
  

  async predictImage(){
    await this._apiToGetImage(this._urlApi) 
          .then((urlImage:string)=>{
            this.setImageOnHtml(urlImage, this._image)
            return this.modelToPredictImage(mobilenet.load(),  this._image)
          })
          .then((predictions:prediction[])=>{
            const divResults = <HTMLElement>document.querySelector('#results')
            this.setPredictionsOnHTML(predictions, divResults)
          })   
  }
}