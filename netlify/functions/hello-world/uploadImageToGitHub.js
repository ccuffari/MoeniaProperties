const fetch = require("node-fetch");

exports.handler = async (event) => {
  const { imageBase64, fileName } = JSON.parse(event.body);
  const githubToken = process.env.GITHUB_TOKEN;

  const content = Buffer.from(imageBase64, 'base64').toString('base64');
  const repoPath = `img/${fileName}`;

  const response = await fetch(`https://api.github.com/repos/tuo-username/tuo-repo/contents/${repoPath}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${githubToken}`,
      Accept: 'application/vnd.github+json'
    },
    body: JSON.stringify({
      message: `Add image ${fileName}`,
      content: content
    })
  });

  if (!response.ok) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Upload failed' }) };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ url: `https://raw.githubusercontent.com/tuo-username/tuo-repo/main/img/${fileName}` })
  };
};
