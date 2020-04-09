import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { ListComponent } from './list/list.component';


const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'video/:id', component: VideoPlayerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  ListComponent,
  VideoPlayerComponent
];
