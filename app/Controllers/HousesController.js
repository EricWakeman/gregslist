import { ProxyState } from "../AppState.js";
import { houseService } from "../Services/HouseService.js";

export class HousesController {
    constructor() {
        ProxyState.on('houses', this.drawHouses)
    }

    drawHouses() {
        let template = ''
        ProxyState.houses.forEach(house => {
            template += /*html*/ `
            <div class="col-lg-4 listing my-3">
                <div class="card">
                    <img src="${house.img}" />
                    <div class="card-body">
                        <p>
                            <b>Price:</b> $${house.price}
                          <b>  Bed(s):</b> ${house.beds}
                           <b> Bath(s):</b> ${house.baths}
                          <b>  Storie(s):</b> ${house.stories}
                          <b>  Sqft:</b> ${house.interiorSqft}
                          <b>  Land/Lot:</b> ${house.landSqft}
                        </p>
                    </div>
                </div>
            </div> 
            `
        }
        )
        document.getElementById("listings").innerHTML = template
        document.getElementById("form-button").innerHTML = /*html*/ `<div class="col-12">
            <button class="fab" onclick="app.housesController.toggleForm()">+</button>
        </div>`
        document.getElementById("form-field").innerHTML = /*html*/ `<div class="col-lg-8 m-auto">
                        <form class="card p-3 shadow d-none" onsubmit="app.housesController.addHouse(event)" id="house-form">
                            <div class="form-group">
                                <label for="price" class="sr-only">Price</label>
                                    <input class="form-control" placeholder="Price" type="number" id="price">
                            </div>
                            <div class="form-group">
                                <label for="beds" class="sr-only">Beds</label>
                                    <input class="form-control" placeholder="Beds" type="number" id="beds"
                                        required>
                            </div>
                            <div class="form-group">
                                <label for="baths" class="sr-only"></label>
                                    <input class="form-control" placeholder="Baths" type="number" id="baths"
                                        required>
                            </div>
                            <div class="form-group">
                                <label for="stories" class="sr-only"></label>
                                    <input class="form-control" placeholder="Stories" type="number" id="stories"
                                        required>
                            </div>
                            <div class="form-group">
                                <label for="Square Feet" class="sr-only"></label>
                                    <input class="form-control" placeholder="Interior Square Feet" type="text"
                                        id="interiorSqft" required>
                            </div>
                            <div class="form-group">
                                <label for="Land/Lot" class="sr-only"></label>
                                    <input class="form-control" placeholder="Land Square Feet" type="number"
                                        id="landSqft">
                            </div>
                            <div class="form-group">
                                <label for="image" class="sr-only"></label>
                                    <input class="form-control" placeholder="Img" type="text" id="houseImg">
                            </div>
                            <button type="submit">submit form</button>
                        </form>
                    </div>`
    }

    addHouse(event) {
        event.preventDefault()
        console.log(event)
        let form = event.target
        let formData = {
            price: form.price.value,
            beds: form.beds.value,
            baths: form.baths.value,
            stories: form.stories.value,
            interiorSqft: form.interiorSqft.value,
            landSqft: form.landSqft.value,
            img: form.houseImg.value,
        }
        console.log(formData)
        houseService.addHouse(formData)
        form.reset()
        this.toggleForm()
    }

    toggleForm() {
        document.getElementById('house-form').classList.toggle('d-none')
    }
}