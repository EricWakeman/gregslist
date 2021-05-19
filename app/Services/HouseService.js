import { ProxyState } from "../AppState.js"
import { House } from "../Models/House.js"

class HouseService {
    addHouse(formData) {
        let newHouse = new House(formData.price, formData.beds, formData.baths, formData.stories, formData.interiorSqft, formData.landSqft, formData.houseImg)
        ProxyState.houses.unshift(newHouse)
        ProxyState.houses = ProxyState.houses
    }

}

export const houseService = new HouseService()