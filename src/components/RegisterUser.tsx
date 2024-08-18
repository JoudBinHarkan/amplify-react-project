import React, { useState, useEffect } from 'react';
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


const registerUserForEvent = async (eventId: string) => {
  try {
    const userEmail = 'abeerzz@amazon.com'; // Static value for testing

    const params = {
      TableName: 'EventsData',
      Key: {
        EventID: eventId,
      },
      UpdateExpression: 'SET RegisteredEmails = list_append(if_not_exists(RegisteredEmails, :empty_list), :user_email)',
      ExpressionAttributeValues: {
        ':user_email': [userEmail], // Array of emails to append
        ':empty_list': [], // Empty list if the attribute does not exist
      },
      ReturnValues: 'UPDATED_NEW', // Return updated attributes
    };

    console.log('DynamoDB update params:', params); // Debugging line

    const result = await docClient.update(params).promise();
    console.log('Registration successful:', result);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error registering user:', error.message);
    } else {
      console.error('Unknown error registering user:', error);
    }
    throw error;
  }
};

export default registerUserForEvent;