import {NgModule} from "@angular/core";
import {NewsPageComponent} from "./news-page.component";
import {RouterModule} from "@angular/router";

const routes = [{
  path: '',
  component: NewsPageComponent
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [NewsPageComponent]
})
export class NewsPageModule {}
