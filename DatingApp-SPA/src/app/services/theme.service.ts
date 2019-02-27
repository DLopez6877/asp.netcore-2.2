import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

constructor() { }

private updateThemeSource = new Subject<any>();

updateTheme = this.updateThemeSource.asObservable();

invokeThemeChange() {
  this.updateThemeSource.next();
}

}
