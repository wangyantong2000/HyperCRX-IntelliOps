import { getRepositoryInfo } from '../../../../helpers/get-repo-info';
import React, { useEffect, useState } from 'react';
import elementReady from 'element-ready';
import i18n from 'i18next';
import { useProChat } from '@ant-design/pro-chat';
import eventEmitter from '../../../../helpers/eventEmitter';

let content = '';
let show = false;

const getTextarea = async () => {
  const textareaElement = (await elementReady('#read-only-cursor-text-area')) as HTMLTextAreaElement;
  return textareaElement.value;
};
const getFileInfo = async () => {
  const language = i18n.language;
  const repoInfo = await getRepositoryInfo();
  const fileName = repoInfo?.path.split('/').at(-1);
  const fileExtension = fileName?.substring(fileName.lastIndexOf('.')) as string;
  return {
    language,
    fileName,
    fileExtension,
  };
};
export const ToggleChat = () => {
  const proChat = useProChat();

  useEffect(() => {
    const handleToggle = (newState: boolean) => {
      show = newState;
    };
    eventEmitter.on('toggleIsOpen', handleToggle);
    return () => {
      eventEmitter.off('toggleIsOpen', handleToggle);
    };
  }, []);

  useEffect(() => {
    if (show && proChat) {
      setTimeout(() => {
        proChat.sendMessage(content);
        const chats = proChat.getChats();
        if (chats && chats.length > 0) {
          proChat.deleteMessage(chats[chats.length - 1].id);
        }
      }, 100);
    }
  }, [show, proChat]);

  return <div />;
};
const buildAnnotatePrompt = async () => {
  const { language, fileExtension } = await getFileInfo();
  const content = await getTextarea();
  const basePrompt =
    'You are a programming language commentator.\nYou need to help me add as many comments as possible to the code with the file extension #{fileExtension} to make it more understandable for beginners.\nFirst, you need to add a comment at the top of the file summarizing the code, then add detailed comments to the code below.\nPlease do not change the original code; just add comments as detailed as possible,\nbecause my purpose is only to understand and read. Please use my native language #{language} as the commenting language.\nDo not reply with any text other than the code, and use Markdown syntax.\nHere is the code you need to comment on:\n\n#{content}';
  const prompt = basePrompt
    .replace('#{content}', content)
    .replace('#{fileExtension}', fileExtension)
    .replace('#{language}', language);
  return prompt;
};
const buildCheckPrompt = async () => {
  const { fileName } = await getFileInfo();
  if (!fileName) {
    return '';
  }
  const basePrompt =
    'Determine whether the file can have code comments based on its filename. The filename is #{fileName}. Answer only “yes” or “no” without any additional explanation.';
  const prompt = basePrompt.replace('#{fileName}', fileName);
  return prompt;
};
export const getCheckInfo = async () => {
  const notePrompt = await buildCheckPrompt();
  content = notePrompt;
};

export const getAnnotate = async () => {
  const notePrompt = await buildAnnotatePrompt();
  content = notePrompt;
  show = true;
  eventEmitter.emit('toggleIsOpen', true);
};
