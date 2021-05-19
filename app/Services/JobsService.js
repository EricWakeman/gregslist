import { ProxyState } from "../AppState.js"
import { Job } from "../Models/Job.js"

class JobsService {

    addJob(formData) {
        let newJob = new Job(formData.name, formData.description, formData.salary, formData.fulltime)
        ProxyState.jobs.unshift(newJob)
        ProxyState.jobs = ProxyState.jobs
    }
}

export const jobsService = new JobsService()