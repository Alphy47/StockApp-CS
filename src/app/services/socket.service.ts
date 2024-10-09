import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Api1 } from 'app-global';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: Socket;
  constructor() { } 
 
  connect() {
   this.socket = io(Api1);
  //  this.socket = io('http://localhost:3000');
    this.socket.emit('joinGame', { gameId: 5 });
  }
  startGame(gameId:any) {
    this.socket.emit('gameUpdate', { gameId: gameId, words: '1234' });
  
  }
  startGame1(gameId:any) {
    this.socket.emit('startGame', { gameId: gameId});
  
  }
  recieveStartGame() {
    return new Observable((observer) => {
      this.socket.on('startGame', (words) => {
        observer.next(words);
      });
    });
  }
  

  
}
