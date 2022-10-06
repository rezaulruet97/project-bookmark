import { BookmarkListComponent } from './components/bookmark-list/bookmark-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path : "bookmark-manager" , component : BookmarkListComponent},
  {path : "", redirectTo: "bookmark-manager" , pathMatch : "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
