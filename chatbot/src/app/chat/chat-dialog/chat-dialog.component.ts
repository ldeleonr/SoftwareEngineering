import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../../chat.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { scan } from 'rxjs/operators';


@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {
  messages: Observable<Message[]>;
  formValue: string;
  user = [];
  bot = [];
  mensajes:any[] = [];
  constructor(private chat: ChatService) { }

  ngOnInit(): void {
    this.chat.talk();
    this.messages = this.chat.conversation.asObservable().pipe(
      scan((acc, val) => acc.concat(val))
    )

    let mensajes = this.messages.subscribe(res=>{
      //console.log('adentro del message',res);

      this.mensajes=res;
      console.log('MENSAJES ANTES DEL FOR', res);
      this.clean();
      for (let k = 0; k < this.mensajes.length ; k++){
        if(this.mensajes[k].sendBy === 'user'){
          this.user.push(this.mensajes[k]);
          console.log('if user');
        }
        else if(this.mensajes[k].sendBy === 'bot'){
          this.bot.push(this.mensajes[k]);
          console.log('if boot');
        }
      }
      console.log('BOT',this.bot);
      console.log('user',this.user);
    });
   // console.log('MENSAJEEE INICIAL ON INIT',);




  }

  sendMessage(){

    //console.log('envia mensaje',this.formValue)
    const resp=this.chat.converse(this.formValue);
   //console.log('responde',resp);
    this.formValue='';

  }

  clean(){
    this.user = [];
    this.bot = [];
  }

}
