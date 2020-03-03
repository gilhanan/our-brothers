import {NgModule} from "@angular/core";
import {MeetingsFiltersComponent} from "./meetings-filters.component";
import {FreeTextFilterModule} from "../../free-text-filter/free-text-filter.module";
import {ViewToggleModule} from "../../view-toggle/view-toggle.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [MeetingsFiltersComponent],
  exports: [MeetingsFiltersComponent],
  imports: [
    ViewToggleModule,
    FreeTextFilterModule,
    CommonModule
  ]
})
export class MeetingsFiltersModule {}
