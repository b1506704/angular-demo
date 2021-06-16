import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-route-a',
  templateUrl: './route-a.component.html',
  styleUrls: ['./route-a.component.css']
})
export class RouteAComponent implements OnInit {
  ownMsg: string = '';
  @Output() messageEvent = new EventEmitter<string>();
  constructor() { }
  setMsg(msg: string) {
    this.ownMsg = msg;
    this.sendMsg();
  }
  sendMsg() {
    this.messageEvent.emit(this.ownMsg);
  }

  ngOnInit(): void {
  }

}
