import fs from "fs";
import cloudformationStackUpdate from "./utils/cloudformationStackUpdate.js";
import updatableStackDetails from "./constants/updatableStackDetails.js";

const stacksUpdate = async () => {
  const updatedResults = [];

  for (const stackDetails of updatableStackDetails) {
    const { stacks, parameters } = stackDetails;
    for (const stack of stacks) {
      try {
        await cloudformationStackUpdate(stack, parameters);

        updatedResults.push({
          stack: stack,
          status: "COMPLETED",
          error: "",
        });
      } catch (error) {
        console.log(
          `Stack update failed for stack: ${stack} with error: ${error.message}`
        );

        updatedResults.push({
          stack: stack,
          status: "FAILED",
          error: error.message,
        });
      }
    }
  }

  const currentDate = new Date();

  fs.writeFileSync(
    `./resolved-stacks-details/cft-updates-${currentDate.getTime()}.json`,
    JSON.stringify(updatedResults)
  );
};

stacksUpdate();
