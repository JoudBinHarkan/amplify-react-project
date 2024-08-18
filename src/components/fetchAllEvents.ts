import AWS from 'aws-sdk';
import awsconfig from '../amplifyconfiguration.json';
import './RegisterUser.css'; // Make sure this path is correct
const docClient = new AWS.DynamoDB.DocumentClient();
AWS.config.update({
  region: awsconfig.aws_project_region,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: awsconfig.aws_cognito_identity_pool_id,
  }),
}) 

const fetchAllEvents = async () => {
  try {
    const params = {
      TableName: 'EventsData',
    };
    const data = await docClient.scan(params).promise();
    console.log('Fetched data:', data.Items); // Check if data is correctly fetched
    return data.Items || [];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export default fetchAllEvents;
