<h1 align="center">Hypercrx-IntelliOps</h1>

<div align="center">

开源项目与开发者关系的追踪、挖掘与洞察

[![CLA assistant](https://cla-assistant.io/readme/badge/hypertrons/hypertrons-crx)](https://cla-assistant.io/hypertrons/hypertrons-crx)
[![Slack](https://img.shields.io/badge/slack-join_chat-success.svg?logo=slack)](https://join.slack.com/t/hypertrons/shared_invite/zt-1a7tfc1tx-5YP8m59Yg~vSqiMBMeUJnQ)
[![](https://img.shields.io/badge/Data-OpenDigger-2097FF)](https://github.com/X-lab2017/open-digger)

</div>

`Hypercrx` (发音: 'Hai-puh CRX') 浏览器插件项目旨在通过直接往 GitHub 页面中插入各类可视化看板的形式，帮助用户快速追踪、挖掘和洞察项目与开发者的各类行为数据，为社区的数字化运营和分析提供有效支撑。


## 数据来源

`Hypercrx-IntelliOps`呈现的所有数据都由[OpenDigger](https://github.com/X-lab2017/open-digger)产生。OpenDigger 是一个聚焦于开源分析的开源项目。数据会在每个月第二天更新。

## 演示视频
https://youtu.be/LDOUelckzs0

## 可视化看板 🔥🔥🔥

您可以在以下入口处找到这些看板：

<table>
  <thead>
    <tr>
      <th width="50%">Entrance 1: GitHub User's Profile Page</th>
      <th width="50%">Entrance 2: GitHub Repository Page</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <img
          src="https://user-images.githubusercontent.com/115639837/202907271-3eafea52-0dfd-4376-a896-b7ebbd75ae1d.png"
        />
      </td>
      <td>
        <img
          src="https://user-images.githubusercontent.com/32434520/210231755-34c788a8-ac2c-4993-b139-eb14aceee858.png"
        />
        <img
          src="https://user-images.githubusercontent.com/115639837/202907348-678bfaca-81a0-40b3-a0ee-1e9a4931961b.png"
        />
      </td>
    </tr>
  </tbody>
</table>

### 项目关系挖掘

 <table> 
   <thead> 
     <tr> 
       <th width="33%">项目关系网络图</th> 
       <th width="33%">项目活跃开发者协作网络图</th> 
       <th width="34%">项目活跃度&OpenRank趋势图</th> 
     </tr> 
   </thead> 
   <tbody> 
     <tr> 
       <td> 
         <img 
           src="https://user-images.githubusercontent.com/32434520/210232109-6d3fbb9a-89a9-4c81-987b-18a2623e7aba.gif"
         /> 
       </td> 
       <td> 
         <img 
           src="https://user-images.githubusercontent.com/90528630/171819879-d76a3f01-444a-4544-8d46-de539c5684c3.gif"
         /> 
       </td> 
       <td>
         <img 
           src="https://user-images.githubusercontent.com/115639837/202907049-d799bfe1-2bd2-4ef0-a467-cc480c6488eb.gif"
         /> </td>
     </tr> 
     <tr> 
       <th colspan="3">仓库详情 (鼠标悬浮触发)</th> 
     </tr> 
     <tr> 
       <td colspan="3"> 
         <img 
           src="https://user-images.githubusercontent.com/32434520/202904112-f0f8386f-582d-4883-8e24-1be437f88ee0.png"
         /> 
       </td> 
     </tr> 
   </tbody> 
 </table>

- **项目关系网络图**: 项目关系网络图展示了在给定的时间段内，项目与项目之间的联结关系，**_用于项目间关系的追踪与挖掘_**。从该网络图中，可以找出与该项目有联结关系的其他项目。

- **项目活跃开发者协作网络图**: 项目活跃开发者协作网络图展示了在给定的时间段内，项目内部活跃的开发者之间的协作关系，**_用于项目内部开发者关系的追踪与挖掘_**。从该网络图中，可以找出该项目中最活跃的开发者，及开发者之间的协作关系。

- **项目活跃度&OpenRank 趋势图**：项目活跃度和 OpenRank 趋势图显示了项目成立至今的活跃度和 OpenRank 这两个指标的变化。您可以利用鼠标或触控板在图表内缩放和拖拽，此外，您还可以点击 Legend 按钮来控制图例的显示和隐藏。

- **仓库详情**: 显示了以下统计指标的历史值。活跃度、OpenRank、参与人数、Fork 事件、Star 事件、Issue 创建事件、Issue 评论事件、PR 创建事件、PR 合入事件、Review 评论事件、通过 PR 合入增加和删除的代码行数。

### 开发者关系挖掘

 <table> 
   <thead> 
     <tr> 
       <th width="33%">开发者协作网络图</th> 
       <th width="33%">开发者活跃仓库网络图</th> 
       <th width="34%">开发者活跃度&OpenRank趋势图</th> 
     </tr> 
   </thead> 
   <tbody> 
     <tr> 
       <td> 
         <img 
           src="https://user-images.githubusercontent.com/90528630/171820059-96c6da74-3d29-4e79-a08d-a07861682646.gif"
         /> 
       </td> 
       <td> 
         <img 
           src="https://user-images.githubusercontent.com/32434520/210232362-320c39ca-360d-4d60-a439-23bd02d611a6.gif"
         /> 
       </td> 
       <td>
         <img 
           src="https://user-images.githubusercontent.com/115639837/202906644-4a22a336-fded-4ef2-82e1-16c3cb749d32.gif"
         /> </td>
     </tr> 
   </tbody> 
 </table>

- **开发者协作网络图**: 开发者协作网络图展示了在给定的时间段内，开发者与开发者之间的协作关系, **_用于开发者关系的追踪与挖掘_**。从该网络图中，可以找出与指定开发者联系较为紧密的其他开发者。
- **活跃仓库网络图**: 活跃仓库网络图展示了在给定的时间段内，开发者的活跃项目，**_用于开发者行为的追踪与挖掘_**。从该网络图中，可以找出该开发者在哪些项目中活跃。
- **开发者活跃度&OpenRank 趋势图**：开发者活跃度和 OpenRank 趋势图显示了项目成立至今的活跃度和 OpenRank 这两个指标的变化。您可以利用鼠标或触控板在图表内缩放和拖拽，此外，您还可以点击 Legend 按钮来控制图例的显示和隐藏。

## OSS-GPT

OSS-GPT 引入大语言模型技术，深入探索其在 GitHub 平台中的智能化应用场景，成功实现智能洞察与分析功能。

支持多种大语言模型接口，例如DeepSeek系列、OpenAI系列、本地部署在Ollama上的开源模型等符合OpenAI的接口规范的模型。填写配置，一键切换模型实例。
OSS-GPT，使用ProChat组件进行开发，支持常见的对话交互操作，如流式数据输出、对话中断以及Markdown格式输出等。提供基础开放领域问答、项目文档摘要生成、自动代码注释生成以及自动化项目洞察分析能力。

GitHub API获取原始文件，并针对长文件/长代码，预先分块，填充Prompt模版，按块依次输入。


<img 
 src="./assets/zh-CN/OSS-GPT.png">
          
## FastPR

FastPR 是一项旨在简化开源项目贡献流程的功能。用户可以直接在插件提供的文档页面上修改内容，完成后插件会自动生成并提交 PR，简化贡献流程。该功能不仅支持 GitHub，还可以扩展到其他指定文档站点。

OSS远程配置文件进行规则设定，根据设定规则，进行按需加载，样式定制，以及文档网站与存储库URL映射规则的定制。利用沙箱环境，定时从远端获取最新的配置文件并动态加载规则代码，无需重新更新插件。根据加载的规则代码，对页面url进行判断，是否符合规则配置。使用stackedit组件进行Markdown编辑器的开发。结合Octokit和Gitee Api，实现文档的在线编辑和贡献PR流程的自动化。


<img 
src="./assets/zh-CN/FastPR.png">


## 参与贡献

如果你初来乍到或对 Git/GitHub 的基本操作不熟悉，请阅读[CONTRIBUTING](./CONTRIBUTING.md)。

### 环境需求

1. node >= 16.14

2. yarn

### 快速开始

1. git clone https://github.com/wangyantong2000/HyperCRX-IntelliOps

2. cd HyperCRX-IntelliOps

3. yarn install

4. yarn run start

5. 在 chrome 中加载新鲜出炉的插件:

   1. 在浏览器地址栏访问 chrome://extensions/

   2. 勾选“开发者模式”

   3. 点击“加载已解压的扩展程序”

   4. 选择项目根目录下的“build”目录

   5. 保持“Service Worker”的 DevTools 页面为打开状态 ([why?](https://github.com/hypertrons/hypertrons-crx/pull/274#discussion_r811878203))

      ![](./assets/keep-service-worker-devtools-open.jpeg)

6. Happy hacking!

### HMR & auto-reload

如果你开发的是 Options 页面或 Popup 页面，每次保存文件都可以让页面进行热模块替换而不需要刷新页面，这意味着你能立马看到改动后的效果。

但是，如果你开发的是 Background 或 ContentScripts，每次保存文件后，service worker 会自动重新加载插件。除此之外，若你开发的是 ContentScripts，那么那些被注入 ContentScripts 的页面还会自动刷新从而运行最新的 ContentScripts。

### 问题交流

我们非常欢迎您的贡献，您可以通过 [Issue](https://github.com/hypertrons/hypertrons-crx/issues) 提出问题或交流。

更多信息请参考 [贡献指南](./CONTRIBUTING.md)。

在 <a href="https://join.slack.com/t/hypertrons/shared_invite/zt-1a7tfc1tx-5YP8m59Yg~vSqiMBMeUJnQ" target="_blank">Slack</a> 上联系我们。
