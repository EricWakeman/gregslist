// @ts-nocheck
import { ProxyState } from "../AppState.js";
import { carsService } from "../Services/CarsService.js";

export class CarsController {
    constructor() {
        ProxyState.on('cars', this.drawCars)
        carsService.getCars()
    }

    getCars() {
        carsService.getCars()
    }
    drawCars() {
        let template = ''
        ProxyState.cars.forEach(car => {
            template += /*html */`
            <div class="col-lg-4 listing my-3">
                <div class="card">
                    <div> 
                        <img src="${car.imgUrl}" height="200" /> 
                    </div>
                    <div class="card-body">
                         <p>
                            <em>${car.year}</em>
                        </p>
                        <p>
                            <b>${car.make} ${car.model}</b>
                        </p>
                        <p>
                            <em>${car.price}</em>
                        </p>
                    </div>
                    <button class="btn btn-block btn-primary" onclick="app.carsController.updateCar('${car.id}')">Update Post</button>
                    <button class="btn btn-block btn-danger" onclick="app.carsController.deleteCar('${car.id}')">Delete Post</button>
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
                            <input class="form-control d-none" placeholder="id" type="text" id="carId">
                        </div>
                        <div class="form-group">
                            <label for="make" class="sr-only">Make:</label>
                            <input class="form-control" placeholder="Make" type="text" id="make" required />
                        </div>
                        <div class="form-group">
                            <label for="Model" class="sr-only">Model:</label>
                            <input class="form-control" type="text" placeholder="Model" id="model" required />
                        </div>
                        <div class="form-group">
                            <label for="Year" class="sr-only">Year:</label>
                            <input class="form-control" type="number" placeholder="Year" id="year" minlength='4' required />
                        </div>
                        <div class="form-group">
                            <label for="price" class="sr-only">Price:</label>
                            <input class="form-control" placeholder="price" type="number" min="0" id="price" required />
                        </div>
                        <div class="form-group">
                            <label for="img" class="sr-only">img:</label>
                            <input class="form-control" placeholder="img" type="text" id="imgUrl" />
                        </div>
                        <button type="submit">submit form</button>
                    </form>
                </div>`
    }

    toggleForm() {
        document.getElementById('car-form').classList.toggle('d-none')
    }

    addCar(event) {
        try {
            event.preventDefault()
            console.log(event)
            let form = event.target
            let formData = {
                year: form.year.value,
                make: form.make.value,
                model: form.model.value,
                price: form.price.value,
                imgUrl: form.imgUrl.value,
            }
            if (form.carId.value) {
                formData.id = form.carId.value
                console.log(formData)
                carsService.updateCar(formData)

            } else {
                carsService.addCar(formData)

            }
            form.reset()
            this.toggleForm()
        } catch (error) {
            console.log(error.message)
        }
    }

    updateCar(id) {
        console.log(id)
        this.toggleForm()
        let car = ProxyState.cars.find(c => c.id == id)
        let form = document.getElementById('car-form')
        form.carId.value = car.id
        form.make.value = car.make
        form.model.value = car.model
        form.year.value = car.year
        form.price.value = car.price
        form.imgUrl.value = car.imgUrl
    }

    deleteCar(id) {
        if (window.confirm("are you sure you wish to delete this post?")) {
            carsService.deleteCar(id)

        }
    }

}