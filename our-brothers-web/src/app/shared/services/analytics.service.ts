import { Injectable } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { environment } from 'src/environments/environment';

type ActionModifier = 'start' | 'end' | 'failed' | 'changed';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(private angularFireAnalytics: AngularFireAnalytics) {}

  public logEvent(eventName: string, eventParams?: { [key: string]: any }) {
    if (!environment.production) {
      console.log(eventName, eventParams);
    }
    this.angularFireAnalytics.logEvent(eventName, eventParams);
  }
}
