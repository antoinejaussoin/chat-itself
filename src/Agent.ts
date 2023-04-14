import { Configuration, OpenAIApi } from 'openai';
import chalk from 'chalk-template';

type Role = 'system' | 'user' | 'assistant';

type Message = { role: Role; content: string };

export class Agent {
  private _openAi: OpenAIApi;
  private _messages: Message[] = [];
  private _displayed = 0;
  constructor(public name: string, _prompt: string) {
    const configuration = new Configuration({
      apiKey: process.env.API_KEY,
    });
    this._openAi = new OpenAIApi(configuration);
    this._messages = [{ role: 'system', content: _prompt }];
  }

  record(message: string) {
    this._messages.push({ role: 'assistant', content: message });
  }

  async discuss(message: string): Promise<string> {
    this._messages.push({ role: 'user', content: message });
    const response = await this._openAi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: this._messages,
    });
    const answer = response.data.choices[0].message?.content || '';
    this._messages.push({
      role: 'assistant',
      content: answer,
    });
    return answer;
  }

  display() {
    const toDisplay = this._messages.slice(this._displayed);
    toDisplay
      .filter((m) => m.role !== 'system')
      .forEach((message) => {
        const color = message.role === 'user' ? 'blue' : 'green';
        console.log(chalk`{${color} ${message.content}}`);
      });
    this._displayed = toDisplay.length;
  }
}
