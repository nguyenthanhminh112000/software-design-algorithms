import { JobRunner } from "./JobRunner";
import { IJob } from "./types";

// Create 10,000 jobs with random priorities between 1 and 100
const jobs: IJob[] = Array.from({ length: 10000 }, (_, i) => ({
  jobID: `job${i}`,
  priority: Math.floor(Math.random() * 100) + 1,
}));

// Create a job runner and start it
const jobRunner = new JobRunner(jobs);
jobRunner.start();
