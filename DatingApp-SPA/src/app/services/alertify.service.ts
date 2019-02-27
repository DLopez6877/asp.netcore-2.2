import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

confirm(message: string, okCallback: () => any) {
  alertify.confirm(message, function(e) {
    if (e) {
      okCallback();
    } else {
      return;
    }
  });
}

success(message: string) {
  alertify.success(message);
}

error(message: string) {
  if (message.length > 100) {
    alertify.error('An error occurred');
  } else {
    alertify.error(message);
  }
}

warning(message: string) {
  alertify.warning(message);
}

message(message: string) {
  alertify.message(message);
}
}
