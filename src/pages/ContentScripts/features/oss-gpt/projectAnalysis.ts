import { ProChatInstance } from '@ant-design/pro-chat';
import i18n from 'i18next';
import { getRepoName, hasRepoContainerHeader, isPublicRepoWithMeta } from '../../../../helpers/get-repo-info';
import {
  getActivity,
  getOpenrank,
  getPROpened,
  getPRMerged,
  getPRReviews,
  getStars,
  getForks,
  getParticipant,
  getContributor,
  getIssuesOpened,
  getIssuesClosed,
  getIssueComments,
} from '../../../../api/repo';

interface IssueDetail {
  issuesOpened: any;
  issuesClosed: any;
  issueComments: any;
}
interface PRDetail {
  PROpened: any;
  PRMerged: any;
  PRReviews: any;
}
let repoName: string;
let stars: any;
let forks: any;
let activity: any;
let openrank: any;
let participant: any;
let contributor: any;
let issueDetail: IssueDetail = {
  issuesOpened: null,
  issuesClosed: null,
  issueComments: null,
};
let PRDetail: PRDetail = {
  PROpened: null,
  PRMerged: null,
  PRReviews: null,
};
const getIssueData = async () => {
  issueDetail.issuesOpened = await getIssuesOpened(repoName);
  issueDetail.issuesClosed = await getIssuesClosed(repoName);
  issueDetail.issueComments = await getIssueComments(repoName);
};
const getPRData = async () => {
  PRDetail.PROpened = await getPROpened(repoName);
  PRDetail.PRMerged = await getPRMerged(repoName);
  PRDetail.PRReviews = await getPRReviews(repoName);
};

const getData = async () => {
  repoName = getRepoName();
  stars = await getStars(repoName);
  console.log(stars);
  if (!stars) {
    return false;
  }
  forks = await getForks(repoName);
  await getIssueData();
  activity = await getActivity(repoName);
  openrank = await getOpenrank(repoName);
  participant = await getParticipant(repoName);
  contributor = await getContributor(repoName);
  await getPRData();
  return true;
};
const buildAnalysisPrompt = async () => {
  const language = i18n.language;

  const formatData = (data: any) => {
    if (!data) return '[]';
    return JSON.stringify(data, null, 2);
  };

  const analysisPrompt = `
  You are a professional data analyst. Your task is to analyze the data performance of a GitHub project and generate a clear, concise report to help users quickly understand the project's status and trends. Additionally, provide actionable suggestions for project operators.
  The project name is ${repoName}.

  ### Data Structure:
  1. **Stars**: Monthly total number of new stars.
  2. **Forks**: Monthly total number of new forks.
  3. **Activity**: Monthly community activity index.
  4. **OpenRank**: Monthly OpenRank value.
  5. **Participant**: Monthly total number of participants (e.g., commits, comments, etc.).
  6. **Contributor**: Monthly total number of contributors (e.g., users submitting code).
  7. **Issue Details**:
     - Issues Opened: Number of issues opened each month.
     - Issues Closed: Number of issues closed each month.
     - Issue Comments: Total number of comments on all issues each month.
  8. **PR Details**:
     - PRs Opened: Number of PRs opened each month.
     - PRs Merged: Number of PRs merged each month.
     - PR Reviews: Total number of PR reviews each month.
  
  ### Analysis Goals:
  1. **Data Summary**:
     - Summarize the overall state of the project.
     - Trends in activity and OpenRank to determine whether the community is growing healthily.
  2. **Insights and Findings**:
     - Identify bottlenecks in issue and PR management.
     - Highlight peaks or troughs in community activity and analyze potential causes.
  3. **Suggestions for Improvement**:
     - Provide suggestions for increasing community engagement or attracting new contributors.
     - Offer strategies to optimize issue and PR management .
  4. **Language**: Write in ${language}
  ### Input Data:
  - Stars: ${formatData(stars)}
  - Forks: ${formatData(forks)}
  - Activity: ${formatData(activity)}
  - OpenRank: ${formatData(openrank)}
  - Participants: ${formatData(participant)}
  - Contributors: ${formatData(contributor)}
  - Issue Details:
    - Issues Opened: ${formatData(issueDetail.issuesOpened)}
    - Issues Closed: ${formatData(issueDetail.issuesClosed)}
    - Issue Comments: ${formatData(issueDetail.issueComments)}
  - PR Details:
    - PRs Opened: ${formatData(PRDetail.PROpened)}
    - PRs Merged: ${formatData(PRDetail.PRMerged)}
    - PR Reviews: ${formatData(PRDetail.PRReviews)}
  
  ### Expected Output:
  1. A summary of key data trends.
  2. Insights and findings based on the data.
  3. Suggestions to improve project management and engagement.
  
  Please generate a detailed analysis based on the above data.Do not output any irrelevant content other than the report content.
    `;
  return analysisPrompt;
};

export const getProjectAnalysis = async (proChatRef: React.MutableRefObject<ProChatInstance | undefined>) => {
  const data = await getData();
  if (!data) {
    proChatRef?.current?.pushChat({
      content: i18n['t']('oss_gpt_analysis_error'),
      role: 'assistant',
    });
    return;
  }
  const prompt = await buildAnalysisPrompt();
  console.log(prompt);
  proChatRef?.current?.sendMessage(prompt);
  const chats = proChatRef?.current?.getChats();
  if (chats && chats.length > 0) {
    proChatRef?.current?.deleteMessage(chats[chats.length - 1].id);
  }
};
