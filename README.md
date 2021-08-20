# cfn-response

This is a simple Typescript client library for responding to CloudFormation Custom Resources.

Based on [this blog](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-lambda-function-code-cfnresponsemodule.html).

# Example

```typescript
import { send, ResponseStatus } from '@matthewbonig/cfn-response';
export const handler = async (event: any, context: any) => {
  await send({ ...event, PhysicalResourceId: context.logStreamName, Status: ResponseStatus.SUCCESS, Data: {}, NoEcho: false, Reason: '' });
}
```

# Contributing

yes please, just submit a PR. Thanks.