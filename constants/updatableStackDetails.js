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
