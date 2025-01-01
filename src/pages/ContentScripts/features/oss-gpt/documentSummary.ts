import { Octokit } from '@octokit/rest';
import { getGithubToken } from '../../../../helpers/github-token';
import { ProChatInstance } from '@ant-design/pro-chat';
import { getRepositoryInfo } from '../../../../helpers/get-repo-info';
import i18n from 'i18next';
import sleep from '../../../../helpers/sleep';
const getFile = async (result: any) => {
  const githubToken = await getGithubToken();
  if (!githubToken) {
    return null;
  }
  const { type, owner, repo, branch, filePath } = result;
  const octokit = new Octokit({ auth: githubToken });
  let response;
  if (type === 'homepage' || type === 'unknown') {
    response = await octokit.repos.getContent({
      owner,
      repo,
      path: 'README.md',
    });
  } else if (type === 'file') {
    response = await octokit.repos.getContent({
      owner,
      repo,
      path: filePath,
      ref: branch, // 分支名
    });
  } else {
    response = await octokit.repos.getContent({
      owner,
      repo,
      path: 'README.md',
      ref: branch, // 指定分支
    });
  }
  if (response.data && 'content' in response.data) {
    const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
    return content;
  } else {
    return null;
  }
};
const getTextarea = async (textareaElement: HTMLTextAreaElement) => {
  return textareaElement.value;
};
const getFileInfo = async () => {
  const language = i18n.language;
  const repoInfo = await getRepositoryInfo();
  const path = repoInfo?.path || '';

  const pathParts = path.split('/');
  const fileName = pathParts.reverse().find((part) => part.includes('.')) || '';
  const fileExtension = fileName ? fileName.substring(fileName.lastIndexOf('.')) : '';

  return {
    language,
    fileName,
    fileExtension,
  };
};
const buildPrompts = async (content: string) => {
  let { language, fileName, fileExtension } = await getFileInfo();
  if (!fileName && !fileExtension) {
    fileName = 'README.md';
    fileExtension = 'md';
  }

  const chunkSize = 60000;
  const chunks = [];
  for (let i = 0; i < content.length; i += chunkSize) {
    chunks.push(content.slice(i, i + chunkSize));
  }

  return chunks.map((chunk, index) => {
    const isLast = index === chunks.length - 1;
    return `${
      isLast
        ? `You have been receiving and storing content parts in your memory. Now it's time to generate a comprehensive summary.

      First, confirm you have received all previous ${chunks.length - 1} parts by listing their numbers.
      
      Here is the final part (${index + 1} of ${chunks.length}):`
        : `You are receiving content in multiple parts. This is part ${index + 1} of ${chunks.length}.
      
      Your tasks for this part:
      1. Store this content in your memory - you will need it later
      2. Do not generate any summary yet
      3. Confirm you have stored it by saying exactly: "Part ${index + 1} content stored in memory"`
    }

      --- Part ${index + 1} Content ---
      ${chunk}

      ${
        isLast
          ? `
      Now that you have all parts, please:
      1. **Confirm**: List all part numbers you have received
      2. **File Type**: Identify the file type (${fileName})
      3. **Complete Summary**: Generate a comprehensive summary of ALL parts combined
      4. **Language**: Write in ${language}
      5. **Structure**:
         - Start with file type identification
         - Then provide the main summary
         - Keep it clear and concise

      Remember: Your summary should cover the ENTIRE content from ALL ${chunks.length} parts, not just this last part.`
          : 'Remember to just confirm you stored this part - no summary yet.'
      }`;
  });
};

const parseGitHubPageUrl = (): any => {
  const url = window.location.href;
  const regex = /^https:\/\/github\.com\/([^/]+)\/([^/]+)(?:\/(?:(blob|tree)\/([^/]+)\/(.+)|([^/]+))?)?$/;
  const match = url.match(regex);
  console.log('match', match);
  if (!match) {
    return null;
  }

  const [, owner, repo, type, branch, filePath, page] = match;

  if (!type || page) {
    return { type: 'homepage', owner, repo };
  } else if (type === 'blob' && branch && filePath) {
    return { type: 'file', owner, repo, branch, filePath };
  } else if (type === 'tree' && branch) {
    return { type: 'branch', owner, repo, branch };
  }
  return null;
};

const sendAndDelete = async (proChatRef: React.MutableRefObject<ProChatInstance | undefined>, message: string) => {
  proChatRef?.current?.sendMessage(message);
  const chats = proChatRef?.current?.getChats();
  if (chats && chats.length > 0) {
    proChatRef?.current?.deleteMessage(chats[chats.length - 1].id);
  }
  await sleep(1000);
};

export const getDocumentSummary = async (proChatRef: React.MutableRefObject<ProChatInstance | undefined>) => {
  const result = parseGitHubPageUrl();
  if (!result) return;

  const content = await getFile(result);
  if (!content) {
    proChatRef?.current?.pushChat({
      content: i18n['t']('oss_gpt_summary_error'),
      role: 'assistant',
    });
    return;
  }

  const prompts = await buildPrompts(content);

  for (let i = 0; i < prompts.length; i++) {
    await sendAndDelete(proChatRef, prompts[i]);

    if (i < prompts.length - 1) {
      const chats = proChatRef?.current?.getChats();
      if (chats && chats.length > 0) {
        proChatRef?.current?.deleteMessage(chats[chats.length - 1].id);
      }
    }
  }
};
