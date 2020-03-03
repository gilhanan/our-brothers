import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ArticlesPageComponent} from "./articles-page.component";


const routes = [{
  path: '',
  component: ArticlesPageComponent
}];

@NgModule({
  declarations: [ArticlesPageComponent],
  imports: [RouterModule.forChild(routes)]
})
export class ArticlesPageModule {}
