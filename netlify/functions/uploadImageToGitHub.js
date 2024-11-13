const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { GITHUB_TOKEN, REPO_OWNER, REPO_NAME } = process.env;
  const { imageData, fileName } = JSON.parse(event.body);

//   const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/public/img/${fileName}`, {
  const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/${fileName}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Add ${fileName}`,
      content: imageData,
    }),
  });

  if (!response.ok) {
    return {
      statusCode: response.status,
      body: JSON.stringify({ message: 'Upload failed' }),
    };
  }

  const responseData = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Upload successful', url: responseData.content.download_url }),
  };
};
