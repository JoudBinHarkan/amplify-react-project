import AWS from 'aws-sdk';

const docClient = new AWS.DynamoDB.DocumentClient();


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
