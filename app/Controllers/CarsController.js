import { ProxyState } from "../AppState.js";
import { carsService } from "../Services/CarsService.js";

export class CarsController {
    constructor() {
        ProxyState.on('cars', this.drawCars)
        this.drawCars()
    }
    drawCars() {
        let template = ''
        ProxyState.cars.forEach(car => {
            template += /*html */`
            <div class="col-lg-4 listing my-3">
                <div class="card">
                    <div> 
                        <img src="${car.img}" height="200" /> 
                    </div>
                    <div class="card-body">
                        <p>
                            <b>${car.make} ${car.model}</b>
                        </p>
                        <p>
                            <em>${car.price}</em>
                        </p>
                    </div>
                </div>
            </div>
            `
        })
        document.getElementById('listings').innerHTML = template
        document.getElementById('form-button').innerHTML = /*html*/ `<div class="col-12">
            <button class="fab" onclick="app.carsController.toggleForm()">+</button>
        </div>`
        document.getElementById('form-field').innerHTML = /*html*/ `<div class="col-lg-8 m-auto">
                    <form class="card p-3 shadow d-none" id="car-form" onsubmit="app.carsController.addCar(event)">
                        <div class="form-group">
                            <label for="make" class="sr-only">Make:</label>
                            <input class="form-control" placeholder="Make" type="text" id="make" required />
                        </div>
                        <div class="form-group">
                            <label for="Model" class="sr-only">Model:</label>
                            <input class="form-control" type="text" placeholder="Model" id="model" required />
                        </div>
                        <div class="form-group">
                            <label for="price" class="sr-only">Price:</label>
                            <input class="form-control" placeholder="price" type="number" min="0" id="price" required />
                        </div>
                        <div class="form-group">
                            <label for="color" class="sr-only">Color:</label>
                            <input class="form-control" placeholder="color" type="color" id="color" />
                        </div>
                        <div class="form-group">
                            <label for="miles" class="sr-only">miles:</label>
                            <input class="form-control" placeholder="miles" type="number" id="miles" />
                        </div>
                        <div class="form-group">
                            <label for="img" class="sr-only">img:</label>
                            <input class="form-control" placeholder="img" type="text" id="carImg" />
                        </div>
                        <button type="submit">submit form</button>
                    </form>
                </div>`
    }

    addCar(event) {
        event.preventDefault()
        console.log(event)
        let form = event.target
        let formData = {
            make: form.make.value,
            model: form.model.value,
            price: form.price.value,
            color: form.color.value,
            img: form.carImg.value,
            miles: form.miles.value,
        }
        console.log(formData)
        carsService.addCar(formData)
        form.reset()
        this.toggleForm()
    }

    toggleForm() {
        document.getElementById('car-form').classList.toggle('d-none')
    }

}