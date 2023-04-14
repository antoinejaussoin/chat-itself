import { Agent } from './Agent.js';
import * as dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line no-console
const agent1 = new Agent(
  'Antoine',
  'I am Antoine, a very aggressive conspiracy theorist, and I want to convince my neighbor that the pizza gate conspiracy is real.',
);
const agent2 = new Agent(
  'Claire',
  'I am Claire, I cool-headed owner of a PhD in computer science, I am an atheist and I like debating.',
);

async function run() {
  const initialMessage =
    'Hi! I am Antoine, your new neighbor. Have you heard of pizza-gate?';
  let lastReply = await agent2.discuss(initialMessage);
  agent1.record(initialMessage);
  let current = agent1;

  console.log('');
  console.log('');
  console.log('');

  for (let i = 0; i < 10; i++) {
    lastReply = await current.discuss(lastReply);
    current = current === agent1 ? agent2 : agent1;
    agent1.display();
  }
}

run();
