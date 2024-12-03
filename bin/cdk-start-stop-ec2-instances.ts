#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CdkStartStopEc2InstancesStack } from "../lib/cdk-start-stop-ec2-instances-stack";
import { ParameterNames } from "../properties/parameter-names";

const app = new cdk.App();
new CdkStartStopEc2InstancesStack(app, "CdkStartStopEc2InstancesStack", {
  env: {
    account: ParameterNames.ACCOUNT,
    region: ParameterNames.REGION,
  },
});
