import fs from "fs";
import { getTemplate } from "./utils/cloudformationStackUpdate.js";
import updatableStackDetails from "./constants/updatableStackDetails.js";

const stacksGet = async () => {
  for (const stackDetails of updatableStackDetails) {
    const { stacks } = stackDetails;

    for (const stack of stacks) {
      const response = await getTemplate(stack);
      fs.writeFileSync(`./aws-cfts/${stack}.yaml`, response.TemplateBody);
    }
  }
};

stacksGet();
