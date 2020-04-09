import { Component, OnInit, Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VideoServiceService } from '../video-service.service';

@Component({
  selector: 'app-add-video-form',
  template: 'passed in {{ data }}',
  templateUrl: './add-video-form.component.html',
  styleUrls: ['./add-video-form.component.scss']
})


export class AddVideoFormComponent implements OnInit {
  videoForm: FormGroup;
  video: number;
  safeURL: number;

  constructor(
    public dialogRef: MatDialogRef<AddVideoFormComponent>,
    private videoService: VideoServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    const currentVideo = this.videoService.getVideo(this.data);
    this.videoForm = new FormGroup({
      videoname : new FormControl(currentVideo ? currentVideo.videoname : '', Validators.required),
      url : new FormControl(currentVideo ? currentVideo.url : '', Validators.required),
      author : new FormControl(currentVideo ? currentVideo.author : '', Validators.required),
      description : new FormControl(currentVideo ? currentVideo.description : '', Validators.required),
    });
    if (currentVideo.url) {
      this.video = 1;
      this.safeURL = this.videoService.getURL(currentVideo.url);
    }
  }

  onSubmit() {
    this.dialogRef.close(this.videoForm.value);
  }

}
