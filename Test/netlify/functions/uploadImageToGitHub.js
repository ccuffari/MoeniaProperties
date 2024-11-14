const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { GITHUB_TOKEN, REPO_OWNER, REPO_NAME } = process.env;
  const { imageBase64, fileName } = JSON.parse(event.body);

  if (!GITHUB_TOKEN || !REPO_OWNER || !REPO_NAME) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Missing environment variables' }),
    };
  }

  if (!imageBase64 || !fileName) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing image data or file name' }),
    };
  }

  // Genera un timestamp unico
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const uniqueFileName = `${fileName.replace(/\.[^/.]+$/, '')}-${timestamp}.png`; // Aggiungi timestamp al nome del file e imposta estensione .png

  const filePath = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/public/img/${uniqueFileName}`;
  console.log(`Uploading to: ${filePath}`);

  const response = await fetch(filePath, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Add ${uniqueFileName}`,
      content: imageBase64,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return {
      statusCode: response.status,
      body: JSON.stringify({ message: 'Upload failed', error: errorText }),
    };
  }

  const responseData = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Upload successful', url: responseData.content.download_url }),
  };
};
