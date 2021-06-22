import { Component, OnInit, TemplateRef } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  host: { '[class.ngb-toasts]': 'true' },
})
export class NotificationComponent implements OnInit {
  constructor(public notifService: NotificationService) {}
  isTemplate(notif: any) {
    return notif.inputElement instanceof TemplateRef;
  }
  ngOnInit(): void {}
}
