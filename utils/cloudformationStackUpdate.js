import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  CloudFormationClient,
  UpdateStackCommand,
  DescribeStacksCommand,
  GetTemplateCommand,
  Capability,
} from "@aws-sdk/client-cloudformation";

const __filename = fileURLToPath(import.meta.url);
const __parentPath = path.basename(path.dirname(__filename));
const __dirname = __filename.split(__parentPath)[0];

const client = new CloudFormationClient();

export const getTemplate = async (stackName) => {
  const input = {
    StackName: stackName,
  };
  const command = new GetTemplateCommand(input);
  const response = await client.send(command);

  return response;
};

const cloudformationStackDescribe = async (stackName) => {
  const input = {
    StackName: stackName,
  };
  const command = new DescribeStacksCommand(input);
  const response = await client.send(command);

  return response;
};

const cloudformationStackUpdate = async (stackName, updatableParameters) => {
  const currentStackDetails = await cloudformationStackDescribe(stackName);

  const currentParameters = currentStackDetails.Stacks[0].Parameters;

  const templateBody = fs.readFileSync(
    `${__dirname}aws-cfts\\${stackName}.yaml`,
    {
      encoding: "utf-8",
    }
  );

  const input = {
    StackName: stackName,
    Capabilities: [Capability.CAPABILITY_NAMED_IAM],
    Parameters: [...currentParameters, ...updatableParameters],
    TemplateBody: templateBody,
    DisableRollback: false,
  };
  const command = new UpdateStackCommand(input);
  const response = await client.send(command);
};

export default cloudformationStackUpdate;
