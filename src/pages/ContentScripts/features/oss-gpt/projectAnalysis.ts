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
  1. **Stars**: Number of new stars gained each month
  2. **Forks**: Number of new forks created each month
  3. **Activity**: Project's activity index changes each month
  4. **OpenRank**: Project's OpenRank value changes each month
  5. **Participant**: Number of new participants each month 
  6. **Contributor**: Number of new code contributors each month
  7. **Issue Details** (monthly changes):
     - Issues Opened: Number of new issues opened
     - Issues Closed: Number of issues closed
     - Issue Comments: Number of new comments on issues
  8. **PR Details** (monthly changes):
     - PRs Opened: Number of new PRs opened
     - PRs Merged: Number of PRs merged
     - PR Reviews: Number of new PR reviews
  
   ### Analysis Goals:
  1. **Monthly Growth Analysis**:
     - Summarize the overall state of the project.
     - Trends in activity and OpenRank to determine whether the community is growing healthily.
     - Identify significant changes or patterns in monthly data
  2. **Insights and Findings**:
     - Highlight months with notable activity changes
     - Analyze seasonal patterns if any
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
  proChatRef?.current?.sendMessage(prompt);
  const chats = proChatRef?.current?.getChats();
  if (chats && chats.length > 0) {
    proChatRef?.current?.deleteMessage(chats[chats.length - 1].id);
  }
};
