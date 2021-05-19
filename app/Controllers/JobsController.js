import { ProxyState } from "../AppState.js";
import { jobsService } from "../Services/JobsService.js";

export class JobsController {

    constructor() {
        ProxyState.on('jobs', this.drawJobs)
    }

    drawJobs() {
        let template = ''
        ProxyState.jobs.forEach(job =>
            template += /*html*/`
            <div class="col-lg-4 listing my-3">
                <div class="card">
                    <div class="card-body text-center">
                    <h2>${job.name}</h2>
                    <p>${job.description}</p>
                    <p>${job.salary}</p>
                    <em> Fulltime: ${job.fulltime}</em>
                    </div>
                </div>
            </div>
            `
        )
        document.getElementById('listings').innerHTML = template
        document.getElementById("form-button").innerHTML = /*html*/ `<div class="col-12">
            <button class="fab" onclick="app.jobsController.toggleForm()">+</button>
        </div>`
        document.getElementById('form-field').innerHTML = /*html*/ `<form class="card p-3 shadow d-none" onsubmit="app.jobsController.addJob(event)" id="job-form">
                    <div class="form-group">
                        <label for="name" class="sr-only">Job Title</label>
                        <input type="text" class="form-control" placeholder="Job Title"id="name">
                    </div>
                    <div class="form-group">
                        <label for="description" class="sr-only">Description</label>
                        <input type="text" class="form-control" placeholder="Job Description"id="description">
                    </div>
                    <div class="form-group">
                        <label for="salary" class="sr-only">Salary</label>
                        <input type="text" class="form-control" placeholder="Salary"id="salary">
                    </div>
                    <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="fulltime"
                    height="5" width="5">
                    <label for="fulltime" class="form-check-label">Fulltime</label>
                    </div>
                    <button type="submit">submit form</button>
                </form>
                `
    }

    addJob(event) {
        event.preventDefault()
        console.log(event)
        let form = event.target
        let formData = {
            name: form.name.value,
            description: form.description.value,
            salary: form.salary.value,
            fulltime: form.fulltime.value,
        }
        console.log(formData)
        jobsService.addJob(formData)
        form.reset()
        this.toggleForm()

    }

    toggleForm() {
        document.getElementById('job-form').classList.toggle('d-none')
    }
}