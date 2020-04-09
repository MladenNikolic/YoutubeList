import { Component, OnInit } from '@angular/core';
import { VideoServiceService } from '../video-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog} from '@angular/material';
import { ConfirmComponent } from '../confirm/confirm.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  currentVideo: any;
  safeURL: any;
  videoID: number;

  constructor(
    private videoService: VideoServiceService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
    ) {
     }

  ngOnInit() {
    this.route.paramMap.subscribe(data => {
      this.videoID = +data.get('id');
      this.currentVideo = this.videoService.getVideo(this.videoID);
    });
    this.safeURL = this.videoService.getURL(this.currentVideo.url);
  }

  deleteVideoVideoPlayer(): void {
    const dialogRef = this.dialog.open(ConfirmComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data === 1) {
        this.videoService.deleteVideo(this.videoID);
        this.router.navigate(['/']);
      } else if (data === 2) {
      }
    });
  }
}
