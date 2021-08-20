import * as https from 'https';
import * as url from 'url';


export enum ResponseStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

/**
 * The CfnCustomResourceInfo should be the event as given to the Lambda function.
 */
export interface CfnCustomResourceInfo {
  StackId: string;
  RequestId: string;
  LogicalResourceId: string;
  PhysicalResourceId: string;
  Data: any;
  Status: ResponseStatus;
  Reason: string;
  NoEcho: boolean;
  ResponseURL: string;
}

/**
 * An async send response function for CloudFormation Custom Resources.
 * Based on this blog: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-lambda-function-code-cfnresponsemodule.html

 * @example await send({ ...event, PhysicalResourceId: context.logStreamName, Status: ResponseStatus.SUCCESS, Data: {}, NoEcho: false, Reason: '' });
 * @param event - the input event, modeled after the CloudFormation Custom Resource event type
 */

export const send = function (event: CfnCustomResourceInfo): Promise<void> {
  return new Promise((resolve, reject) => {
    const { ResponseURL } = event;
    const responseBody = JSON.stringify(event);

    console.log('Response body:\n', responseBody);


    const parsedUrl = url.parse(ResponseURL);
    const options = {
      hostname: parsedUrl.hostname,
      port: 443,
      path: parsedUrl.path,
      method: 'PUT',
      headers: {
        'content-type': '',
        'content-length': responseBody.length,
      },
    };

    const request = https.request(options, function (response) {
      console.log('Status code: ' + response.statusCode);
      console.log('Status message: ' + response.statusMessage);
      resolve();
    });

    request.on('error', function (error) {
      console.log('send(..) failed executing https.request(..): ' + error);
      reject(error);
    });

    request.write(responseBody);
    request.end();
  });

};