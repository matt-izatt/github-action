import * as core from "@actions/core";
import {getOctokit, context} from "@actions/github";
import axios from "axios";

async function run() {
    try {
        if (context.payload.pull_request == null) {
            core.setFailed('No pull request found.');
            return;
        }

        const instance = axios.create({
            baseURL: 'https://botz.learn-dev.uk',
            timeout: 1000
        });

        instance.get('/test')
            .then(response => {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        // const octokit = getOctokit(process.env.GITHUB_TOKEN);
        //
        // octokit.issues.createComment({
        //     ...context.repo,
        //     issue_number: context.payload.pull_request.number,
        //     body: core.getInput('message')
        // });
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();