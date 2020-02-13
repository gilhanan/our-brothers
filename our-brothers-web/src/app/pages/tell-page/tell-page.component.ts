import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ParticipationsService } from 'src/app/services/participations.service';
import { DataService } from 'src/app/services/data.service';
import {
  Meeting,
  User,
  BereavedProfile,
  Slain
} from 'src/app/model';
import { Subject, combineLatest } from 'rxjs';

interface TrainingMeeting {
  text: string;
  on: boolean;
  value: string;
}

const traningMeetingsConst: TrainingMeeting[] = [
  {
    text: '24.3 יום שלישי, בין השעות 1700-2100, בWEWORK חיפה',
    on: false,
    value: 'm1'
  },
  {
    text: '25.3 יום רביעי, בין השעות 1700-2100, בWEWORK ת"א',
    on: false,
    value: 'm2'
  },
  {
    text: '26.3 יום חמישי, בין השעות 1700-2100, בWEWORK ירושלים',
    on: false,
    value: 'm3'
  },
  {
    text: '29.3 יום ראשון, בין השעות 1700-2100, בWEWORK באר שבע ',
    on: false,
    value: 'm4'
  },
  {
    text: '7.4 יום שלישי, 19:00-20:30 סדנה אינטרנטית',
    on: false,
    value: 'm5'
  },
  {
    text: '18.4 יום שבת, 2030-2200 סדנה אינטרנטית',
    on: false,
    value: 'm6'
  }
];

@Component({
  selector: 'app-tell-page',
  templateUrl: './tell-page.component.html',
  styleUrls: ['./tell-page.component.scss']
})
export class TellPageComponent implements OnInit {
  public user: User;
  public meetings: Meeting[];
  public currentStep: number = 0;
  public currentStep$ = new Subject<number>();
  public casualtyDetailsFrom: FormGroup;
  public trainingSession = false;
  public trainingMeetings: TrainingMeeting[] = traningMeetingsConst;
  public noTrainingMeeting = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private participationsService: ParticipationsService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.casualtyDetailsFrom = this.fb.group({
      casualtyFname: ['', Validators.required],
      casualtyLname: ['', Validators.required],
      casualtyDate: ['', Validators.required],
      casualtyStory: ['', Validators.required]
    });

    combineLatest(
      this.authService.user,
      this.currentStep$.pipe(distinctUntilChanged()))
      .subscribe(([user, currentStep]) => {

        this.user = user;
        this.currentStep = currentStep;

        // Auto navigations after the first step
        if (currentStep > 0) {
          if (!user || !this.participationsService.isUserHaveAllDetails(user)) {
            this.currentStep$.next(1);
            this.authService.requestToLogin();
          } else if (!this.participationsService.isBrotherHaveSlainDetails(user)) {
            this.currentStep$.next(2);
          } else if (!this.participationsService.isBrotherAnsweredTrainingMeeting(user)) {
            this.currentStep$.next(3);
          } else {
            this.currentStep$.next(4);
          }
        }
      });

    this.dataService.getMeetings().subscribe(meetings => {
      this.meetings = meetings;
    });
  }

  get casualtyFname() {
    return this.casualtyDetailsFrom.get('casualtyFname');
  }

  get casualtyLname() {
    return this.casualtyDetailsFrom.get('casualtyLname');
  }

  get casualtyDate() {
    return this.casualtyDetailsFrom.get('casualtyDate');
  }

  get casualtyStory() {
    return this.casualtyDetailsFrom.get('casualtyStory');
  }

  saveBereavedProfile() {
    let slains: Slain[] = [];
    if (
      this.authService.currentUser.bereavedProfile &&
      this.authService.currentUser.bereavedProfile.slains &&
      this.authService.currentUser.bereavedProfile.slains.length > 0
    ) {
      slains = this.authService.currentUser.bereavedProfile.slains;
    }

    const deathDate = new Date(this.casualtyDetailsFrom.get('casualtyDate').value).getTime();

    slains.push({
      deathDate,
      firstName: this.casualtyDetailsFrom.get('casualtyFname').value,
      lastName: this.casualtyDetailsFrom.get('casualtyLname').value
    });

    const bereavedProfile: BereavedProfile = {
      slains,
      story: this.casualtyDetailsFrom.get('casualtyStory').value
    };

    this.dataService.setBereavedProfile(this.authService.currentUser, bereavedProfile);
  }

  markedTraningMetting(traningMeeting: TrainingMeeting) {
    if (traningMeeting.on) {
      this.noTrainingMeeting = false;
    } else {
      if (
        !this.trainingMeetings.some(trainingMeeting => {
          return trainingMeeting.on;
        })
      ) {
        this.noTrainingMeeting = true;
      }
    }
  }

  markedNoTraningMetting(noTrainingMeeting) {
    if (noTrainingMeeting) {
      this.trainingMeetings.forEach(trainingMeeting => {
        trainingMeeting.on = false;
      });
    }
  }

  saveTraningAnswer() {
    const onTrainingMeetings: string[] = [];
    if (!this.noTrainingMeeting) {
      this.trainingMeetings.forEach(trainingMeeting => {
        if (trainingMeeting.on) {
          onTrainingMeetings.push(trainingMeeting.value);
        }
      });
    }

    this.dataService
      .setBereavedGuidanceAnswer(this.authService.currentUser, {
        answered: true,
        general: onTrainingMeetings
      });
  }

  onJoinMeeting({ user, meeting }: { user: User; meeting: Meeting }) {
    if (window.confirm('האם ברצונך להשתבץ למפגש?')) {
      if (user.role === 'bereaved') {
        this.dataService
          .bereavedRegisterHost(user, meeting)
          .subscribe(result => {
            if (result) {
              window.alert('שובצת בהצלחה!');
            }
          });
      }
    }
  }
}
