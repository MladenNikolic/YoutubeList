import { Injectable } from '@angular/core';
import { MatDialog} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class VideoServiceService {
  videoList = JSON.parse(localStorage.getItem('videos') || '[]');
  safeURL2: string;
  safeURL: any;

  constructor(public dialog: MatDialog, private sanitizer: DomSanitizer) { }

  getVideos() {
    return this.videoList;
  }

  setVideo(video: object) {
    this.videoList.push(video);
    localStorage.setItem('videos', JSON.stringify(this.videoList));
  }

  deleteVideo(index: number) {
    this.videoList = this.videoList.filter(c => c.ID !== index);
    localStorage.setItem('videos', JSON.stringify(this.videoList));
  }

  getVideo(index: number) {
   return this.videoList.find(c => c.ID === index);
  }

  getURL(data: any) {
    this.safeURL2 = data.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/');
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.safeURL2);
    return this.safeURL;
  }

}
