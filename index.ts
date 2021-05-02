import * as core from "@actions/core";
import {getOctokit, context} from "@actions/github"

try {
    if (context.payload.pull_request == null) {
        core.setFailed('No pull request found.');
    }

    const octokit = getOctokit(process.env.GITHUB_TOKEN);
    octokit.issues.createComment({
        ...context.repo,
        issue_number: context.payload.pull_request.number,
        body: core.getInput('message')
    });

} catch (error) {
    core.setFailed(error.message);
}