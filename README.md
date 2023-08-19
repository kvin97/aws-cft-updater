# aws-cft-updater

Easy way to update AWS Stack CFTs through your local machine

This script can be used in case if we need to update any sections of the current templates in AWS Cloudformation. Due to the use of AWS SDK, it makes it easier instead of dealing with AWS console directly.

Inside the root folder (`./aws-cft-updater`), it contains following scripts to retrieve and update AWS CFT stacks using AWS SDK.

- `stackGetScript.js`
- `stackUpdateScript.js`

## Prerequisites

1. Configure `aws cli` with relevant AWS account credentials (Update `~/.aws/credentials` file)

### Steps to update stack CFT template and parameters

1. Go to `./aws-cft-updater` root directory
2. Update `./constants/updatableStackDetails.js` file with updatable stack name and parameter details. The format should be as follows.

   ```js
   const updatableStackDetails = [
     {
       stacks: ["aws-stack-update-cft"],
       parameters: [
         {
           ParameterKey: "applicationId",
           ParameterValue: "1",
         },
         {
           ParameterKey: "applicationName",
           ParameterValue: "aws-stack-update",
         },
         {
           ParameterKey: "productOwner",
           ParameterValue: "sample@gmail.com",
         },
         {
           ParameterKey: "environment",
           ParameterValue: "dev",
         },
       ],
     },
   ];

   export default updatableStackDetails;
   ```

   It should be an array of updatable stack details. In each element, `stacks` contain stack names of the relevant CFTs to be updated with the given `parameters`.

3. Then retrieve CFTs of the relevant stacks you put in the above by running `npm run get:stack-cfts`. This will retrieve all the current templates used to update the stacks.
   - Template files will be downloaded to `./aws-cfts` folder.
4. After updating the CFTs locally as mentioned above, run `npm run update:stacks` script. This will update all the stacks given in `./constants/updatableStackDetails.js`.
5. During 3rd and 4th steps, please check the terminal logs, to identify if any errors/exceptions occurred.
6. During 4th step, check `./resolved-stack-details/cft-updates-<timestamp>.json` file to verify the status of the stack update. (This step is necessary to find any validation issues that can arise)
7. It's better to check the stacks in AWS Cloudformation to identify if the changes are correctly propagated. (Sanity test on successful update)
   Please refer to the sample response logged below.
   ```json
   [
     {
       "stack": "sample-pipeline",
       "status": "FAILED",
       "error": "Stack with id sample-pipeline does not exist"
     }
   ]
   ```
