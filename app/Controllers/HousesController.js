// @ts-nocheck
import { ProxyState } from "../AppState.js";
import { houseService } from "../Services/HouseService.js";

export class HousesController {
    constructor() {
        ProxyState.on('houses', this.drawHouses)

    }

    drawHouses() {
        console.log(ProxyState.houses)
        if (ProxyState.houses.length == 0) {
            houseService.getHouses()
            console.log(ProxyState.houses)

        } else {
            let template = ''
            ProxyState.houses.forEach(house => {
                template += /*html*/ `
                <div class="col-lg-4 listing my-3">
                    <div class="card">
                        <img src="${house.imgUrl}" height="200" width="200"/>
                        <div class="card-body">
                            <p>
                                <b>Price:</b> $${house.price}
                              <b>  Bed(s):</b> ${house.bedrooms}
                               <b> Bath(s):</b> ${house.bathrooms}
                               <b> year:</b> ${house.year}
                              <b>  Storie(s):</b> ${house.levels}
            
                            </p>
                        </div>
                    </div>
                    <button class="btn btn-block btn-primary" onclick="app.housesController.updateHouse('${house.id}')"> Update Post </button>
                    <button class="btn btn-block btn-danger" onclick="app.housesController.deleteHouse('${house.id}')"> Delete Post </button>
                </div>

                `
            }
            )
            document.getElementById("listings").innerHTML = template
            document.getElementById("form-button").innerHTML = /*html*/ `<div class="col-12">
                <button class="fab" onclick="app.housesController.toggleForm()">+</button>
            </div>`
            document.getElementById("form-field").innerHTML = /*html*/
                `<div class="col-lg-8 m-auto">
                            <form class="card p-3 shadow d-none" onsubmit="app.housesController.addHouse(event)" id="house-form">
                                <div class="form-group ">
                                        <input class="form-control " placeholder="houseId" type="text" id="houseId">
                                </div>
                                <div class="form-group">
                                    <label for="price" class="sr-only">Price</label>
                                        <input class="form-control" placeholder="Price" type="number" id="price">
                                </div>
                                <div class="form-group">
                                    <label for="year" class="sr-only">year</label>
                                        <input class="form-control" placeholder="year" type="number" id="year">
                                </div>
                                <div class="form-group">
                                    <label for="bedrooms" class="sr-only">Bedrooms</label>
                                        <input class="form-control" placeholder="Bedrooms" type="number" id="bedrooms"
                                            required>
                                </div>
                                <div class="form-group">
                                    <label for="bathrooms" class="sr-only">Bathrooms</label>
                                        <input class="form-control" placeholder="Bathrooms" type="number" id="bathrooms"
                                            required>
                                </div>
                                <div class="form-group">
                                    <label for="levels" class="sr-only">Levels</label>
                                        <input class="form-control" placeholder="Levels" type="number" id="levels"
                                            required>
                                </div>
                                <div class="form-group">
                                    <label for="image" class="sr-only">Image</label>
                                        <input class="form-control" placeholder="ImgUrl" type="text" id="imgUrl">
                                </div>
                                <button type="submit">submit form</button>
                            </form>
                        </div>`
        }

    }

    addHouse(event) {
        try {
            event.preventDefault()
            console.log(event)
            let form = event.target
            let formData = {
                price: form.price.value,
                bedrooms: form.bedrooms.value,
                bathrooms: form.bathrooms.value,
                year: form.year.value,
                levels: form.levels.value,
                imgUrl: form.imgUrl.value,
            }
            if (form.houseId.value) {
                formData.id = form.houseId.value
                houseService.updateHouse(formData)

            } else {
                houseService.addHouse(formData)
            }

            console.log(formData)
            form.reset()
            this.toggleForm()
        } catch (error) {
            console.log(error.message)
        }


    }

    updateHouse(id) {

        this.toggleForm()
        let house = ProxyState.houses.find(h => h.id == id)
        console.log(house)
        let form = document.getElementById('house-form')
        form.price.value = house.price
        form.year.value = house.year
        form.levels.value = house.levels
        form.bedrooms.value = house.bedrooms
        form.bathrooms.value = house.bathrooms
        form.imgUrl.value = house.imgUrl
        form.houseId.value = house.id
    }

    deleteHouse(id) {
        console.log(id)
        if (window.confirm("are you sure you wish to delete this post?")) {

            houseService.deleteHouse(id)
        }
    }

    toggleForm() {
        document.getElementById('house-form').classList.toggle('d-none')
    }
}