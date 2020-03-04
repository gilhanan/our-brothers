import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-free-text-filter',
  templateUrl: './free-text-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./free-text-filter.component.scss']
})
export class FreeTextFilterComponent implements OnInit, OnDestroy {
  @Input() filter: string;
  @Output() filterChange = new EventEmitter<string>();

  filterDebounce$ = new Subject<string>();
  private subscription: Subscription;

  ngOnInit() {
    this.subscription = this.filterDebounce$
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe(value => this.filterChange.emit(value));
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }
}
