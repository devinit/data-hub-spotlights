# Spotlights Deployment

- The spotlights deployment is made via a github actions CI/CD pipeline.This runs the test, build and deployment stages.

## Github Actions Workflow

### Test Stage

- runs for every push and pull request on all branches

### Build Stage

- requires the test stage for it to run
- only runs for the master and develop branches
- runs the app build using `npm run build` and bundles specified files into one build folder
- stores the folder as a build artifact and the deploy_script in another deploy_script folder in github actions.
- clears the previous build folder on the server and downloads the build folder and deploy_script folder

### Deploy stage

- requires the build stage
- sets the `HOST` and `CMS_URL` environment variables based on the branch. These variables have to be added as github secrets
- unzips the deploy_script folder and executes the script in this folder
