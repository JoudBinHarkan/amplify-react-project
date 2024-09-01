import React, { useState, useEffect } from 'react';
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import AWS from 'aws-sdk';
import awsconfig from '../amplifyconfiguration.json';
import './RegisterUser.css'; // Adjust the path if needed
AWS.config.update({
  region: 'us-east-1',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: awsconfig.aws_cognito_identity_pool_id,
  }),
});

const docClient = new AWS.DynamoDB.DocumentClient();

const registerForEvent = async (eventId: string): Promise<void> => {
  console.log('EventID passed to registerForEvent:', eventId);

  const userEmail = "user@example.com"; 

  const params = {
      TableName: 'EventsData',
      Key: { EventID: eventId }, 
      UpdateExpression: 'SET RegisteredEmails = list_append(if_not_exists(RegisteredEmails, :emptyList), :email)',
      ExpressionAttributeValues: {
          ':email': [userEmail],
          ':emptyList': [],
      },
      ReturnValues: 'UPDATED_NEW',
  };

  try {
      const result = await docClient.update(params).promise();
      console.log('Registration successful:', result);
  } catch (error) {
      console.error('Error registering for event:', error);
      console.log('Full error:', JSON.stringify(error, null, 2));
  }
};


export default registerForEvent;
