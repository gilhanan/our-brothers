import {NgModule} from "@angular/core";
import {DonatePageComponent} from "./donate-page.component";
import {RouterModule} from "@angular/router";

const routes = [{
  path: '',
  component: DonatePageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [DonatePageComponent]
})
export class DonatePageModule {}
