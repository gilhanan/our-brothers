import {NgModule} from "@angular/core";
import {ListColumnComponent} from "./list-column/list-column.component";
import {ListHeaderComponent} from "./list-header/list-header.component";
import {CommonModule} from "@angular/common";

const api = [ListHeaderComponent, ListColumnComponent];

@NgModule({
  declarations: api,
  imports: [
    CommonModule
  ],
  exports: api
})
export class ListModule {}
