import {NgModule} from "@angular/core";
import {QnaListComponent} from "./qna-list/qna-list.component";
import {QnaItemComponent} from "./qna-list/qna-item/qna-item.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [QnaListComponent, QnaItemComponent],
  exports: [QnaListComponent, QnaItemComponent],
  imports: [
    CommonModule
  ]
})
export class QnaModule {}
