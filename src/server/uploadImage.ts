import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

const GITHUB_TOKEN = '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';
const REPO_NAME = 'MoeniaProperties';
const REPO_OWNER = 'ccuffari';
const IMAGE_FOLDER_PATH = 'img/properties'; // Il percorso all'interno del repository

export async function uploadImageToGithub(imageBuffer: Buffer, imageName: string): Promise<string> {
  const encodedContent = imageBuffer.toString('base64');
  const uniqueImageName = `${uuidv4()}-${imageName}`;
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${IMAGE_FOLDER_PATH}/${uniqueImageName}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Upload image ${uniqueImageName}`,
      content: encodedContent,
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  const responseData = await response.json();
  return responseData.content.download_url;
}
