import { Injectable } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';

type ActionModifier = 'start' | 'end' | 'failed' | 'changed';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private angularFireAnalytics: AngularFireAnalytics) { }

  public logEvent(eventName: string,
    eventParams?: { [key: string]: any; }) {
    this.angularFireAnalytics.logEvent(eventName, eventParams);
  }
}
