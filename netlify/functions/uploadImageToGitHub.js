exports.handler = async (event) => {
  const { GITHUB_TOKEN, REPO_OWNER, REPO_NAME } = process.env;
  const { imageBase64, fileName } = JSON.parse(event.body);

  console.log('Received event:', event);
  console.log('Environment variables:', { GITHUB_TOKEN, REPO_OWNER, REPO_NAME });
  console.log('Parsed body:', { imageBase64, fileName });

  if (!GITHUB_TOKEN || !REPO_OWNER || !REPO_NAME) {
    console.error('Missing environment variables');
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Missing environment variables' }),
    };
  }

  if (!imageBase64 || !fileName) {
    console.error('Missing image data or file name');
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing image data or file name' }),
    };
  }

  const filePath = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/public/img/${fileName}`;
  console.log(`Uploading to: ${filePath}`);

  try {
    const response = await fetch(filePath, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Add ${fileName}`,
        content: imageBase64,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Upload failed:', errorText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: 'Upload failed', error: errorText }),
      };
    }

    const responseData = await response.json();
    console.log('Upload successful:', responseData);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Upload successful', url: responseData.content.download_url }),
    };
  } catch (error) {
    console.error('Error during upload:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error', error: error.message }),
    };
  }
};