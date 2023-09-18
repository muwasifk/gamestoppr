## Inspiration
During COVID, video games soared in popularity, and even today, we noticed that many of our friends have become no-life addicts (affectionately of course). The accumulation of missed assignments and bad report card grades eventually reached a breaking point, as other options were exhausted (they were smart enough to get around the restrictions of other apps). We needed a way to block video games while retaining their dopamine boosts to satisfy the user's 3 second attention span. As such, our blockchain project, ~~GameStop~~ GameStoppr was created.

## What it does
Gamestoppr is a service that rewards users with our own custom cryptocurrency, Gitcoin (GTC), based on the amount of time they spend away from video games. As the user blocks their apps,  The users then use our cryptocurrency to receive real-life awards. 

## How we built it
Our project consists of four parts: backend server, blockchain, desktop app, and web app. 

### Backend Server
The backend server was created using Python with the Django-Rest framework. 

### Blockchain
To create our custom cryptocurrency, Gitcoin (GTC), we used a local ethereum blockchain provided with Ganache and truffle.js. We also used Solidity to create smart contracts that adhere to the ERC20 standard. We originally minted 20M GTC which we rotate in circulation (when rewards are redeemed they come back to the main wallet). 

### Desktop App 
Our desktop app was created using Python threading and Tkinter. We connected it to the server so that the user can toggle the block from any device, including their mobile phones. We then used Cohere to determine whether running processes were games or not.

### Web App 
The web app was developed using React.js for the frontend.

## Challenges we ran into
- Setting up the blockchain: We used various different frameworks and testnet programs such as Geth before finding one that was compatible with the web3.py library, namely Ganache.
- Safety: We had to be careful, as the last thing we wanted would be the app blocking critical systems in System32 and breaking the user's computer. We added checks and a risk-analysis for the apps, to prevent the blocking of those apps.
- App security: Many of our friends are also coders, and since they're addicted to dopamine hits, there is a high chance that they will try to hack the system to gain rewards while not blocking their games. We had to brainstorm many ways to make sure that this didn't happen, such as adding device registration.
- General bugs and fatigue: Django was being annoying, React was being annoying, Ganache was being annoying, our teammates were annoying (affectionately), we were all tired and we did not get a lot of sleep this weekend...

## Accomplishments that we're proud of
- Learning about how blockchain and Ethereum work, and being able to implement and use them effectively
- Thinking of clever ways to solve smaller problems (such as using machine learning/natural language processing to determine whether running processes are games). 
- In general, creating an app that we and our friends can benefit greatly from, and helping 

## What we learned
- How to set up blockchains, servers, desktop apps
- How to split up components and connect them together
- How to work with teammates, even when we're all tired and grouchy
- The best insults to scream at the bugs in our code (I hate you CORS) :)

## What's next for GameStoppr
- Finishing the market place: we want users to be able to do something with the cryptocurrency. Unfortunately, 36hrs was not enough to do it, but we wish to continue this.
- Fixing security issues: we planned to put many variables in secure files, but we ultimately ran out of time. Before releasing, we need to secure those files
- Add statistics on the dashboard: let the user see more about their use.
