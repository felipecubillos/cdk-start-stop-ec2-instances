# Start and Stop EC2 Instances using Eventbridge Scheduler

A CDK project that creates an eventbridge scheduler with Universal targets calling EC2 startInstances and stopIntances

![Architecture](/architecture.png "AWS Architecture")

## Deployment

To deploy this project follow this steps :

1. Deploy the project
   \*\*Remember to update the ParameterNames.ts file with your account information.

```bash
npm i
npx aws-cdk deploy
```

2. Clean Up the project (Avoid unexpected costs)

```bash
npx aws-cdk destroy
```

## Read more about it in my blog

[![Blog](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://acubillos.hashnode.dev/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/felipecubillos/)
