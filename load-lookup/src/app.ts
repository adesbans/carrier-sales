export const lambdaHandler = async (event: any, context: any) => {

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'load results',
      })
    };

    return response;
  };
