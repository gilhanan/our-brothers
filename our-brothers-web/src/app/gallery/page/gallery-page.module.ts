import {NgModule} from "@angular/core";
import {GalleryPageComponent} from "./gallery-page.component";
import {RouterModule} from "@angular/router";

const routes = [{
  path: '',
  component: GalleryPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [GalleryPageComponent]
})
export class GalleryPageModule {}
