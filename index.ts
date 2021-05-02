import * as core from "@actions/core";
import {getOctokit, context} from "@actions/github"

try {
    const message = core.getInput('message');
    const github_token = core.getInput('GITHUB_TOKEN');

    if (context.payload.pull_request == null) {
        core.setFailed('No pull request found.');
    }

    const pull_request_number = context.payload.pull_request.number;

    const octokit = getOctokit(github_token);
    octokit.issues.createComment({
        ...context.repo,
        issue_number: pull_request_number,
        body: message
    });

} catch (error) {
    core.setFailed(error.message);
}