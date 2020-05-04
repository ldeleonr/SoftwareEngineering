import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


export class Message {
  constructor(public content: string, public sendBy: string) { }
}


@Injectable()
export class ChatService {
  readonly token = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({ accessToken: this.token });
  conversation = new BehaviorSubject<Message[]>([]);
  constructor() { }

  update(msg: Message) {
    console.log('update mensaje',msg);
    this.conversation.next([msg]);
  }

  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);
    return this.client.textRequest(msg).then(res => {
      const speech = res.result.fulfillment.speech;
      let botMessage = new Message(speech, 'bot');
      if(speech ===""){
        botMessage = new Message('No he entendido tu pregunta', 'bot');

      }
      console.log('esto responde',speech);
      this.update(botMessage);

    });
  }

  talk() {
    this.client.textRequest('Who are you!')
      .then(res => console.log(res));
  }
}

