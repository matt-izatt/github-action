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
            timeout: 1000,
            headers: {'X-Custom-Header': 'foobar'}
        });

        instance.post('/pr', {
            "owner": "matt-izatt",
            "repo": "jest-test-repo",
            "issueNumber": 2,
            "body": "",
            "testResults": {
                "total": {
                    "lines": {
                        "total": 20,
                        "covered": 20,
                        "skipped": 0,
                        "pct": 100
                    },
                    "statements": {
                        "total": 21,
                        "covered": 21,
                        "skipped": 0,
                        "pct": 100
                    },
                    "functions": {
                        "total": 6,
                        "covered": 6,
                        "skipped": 0,
                        "pct": 100
                    },
                    "branches": {
                        "total": 0,
                        "covered": 0,
                        "skipped": 0,
                        "pct": 100
                    }
                },
                "/Users/matt/dev/projects/jest-test-repo/src/car.ts": {
                    "lines": {
                        "total": 20,
                        "covered": 20,
                        "skipped": 0,
                        "pct": 100
                    },
                    "functions": {
                        "total": 6,
                        "covered": 6,
                        "skipped": 0,
                        "pct": 100
                    },
                    "statements": {
                        "total": 21,
                        "covered": 21,
                        "skipped": 0,
                        "pct": 100
                    },
                    "branches": {
                        "total": 0,
                        "covered": 0,
                        "skipped": 0,
                        "pct": 100
                    }
                }
            }
        }).then(function (response) {
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