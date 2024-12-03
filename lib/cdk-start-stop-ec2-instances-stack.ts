import * as cdk from "aws-cdk-lib";
import { Role, ServicePrincipal, ManagedPolicy } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { ParameterNames } from "../properties/parameter-names";
import { CfnSchedule } from "aws-cdk-lib/aws-scheduler/lib";

export class CdkStartStopEc2InstancesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //👇 Create an IAM role that EventBridge Scheduler can assume to call EC2 API operations.
    const schedulerRole = new Role(this, "SchedulerRole", {
      assumedBy: new ServicePrincipal("scheduler.amazonaws.com"),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName("AmazonEC2FullAccess"),
      ],
    });

    // 👇 Schedule to start an EC2 instance
    new CfnSchedule(
      this,
      `${ParameterNames.PROJECT_NAME}-EC2-scheduler-start`,
      {
        name: `${ParameterNames.PROJECT_NAME}-Start`,
        flexibleTimeWindow: {
          mode: "OFF",
        },
        scheduleExpression: "cron(30 17 ? * 7#2 *)", // 👈 cron jon expression
        scheduleExpressionTimezone: "Canada/Mountain", // 👈 Specify the timezone to match your requirements.
        target: {
          arn: "arn:aws:scheduler:::aws-sdk:ec2:startInstances", // 👈 Api operation to call
          roleArn: schedulerRole.roleArn, // 👈 The role with permissions to perform this action.
          input: JSON.stringify({
            InstanceIds: [ParameterNames.EC2_INSTANCE_ID], // list of instances ID's to start
          }),
        },
      }
    );

    // Stop EC2 instance 5 Hours later

    new CfnSchedule(this, `${ParameterNames.PROJECT_NAME}-EC2-scheduler-stop`, {
      name: `${ParameterNames.PROJECT_NAME}-Stop`,
      flexibleTimeWindow: {
        mode: "OFF",
      },
      scheduleExpression: "cron(30 22 ? * 7#2 *)",
      scheduleExpressionTimezone: "Canada/Mountain",
      target: {
        arn: "arn:aws:scheduler:::aws-sdk:ec2:stopInstances",
        roleArn: schedulerRole.roleArn,
        input: JSON.stringify({
          InstanceIds: [ParameterNames.EC2_INSTANCE_ID],
        }),
      },
    });
  }
}
