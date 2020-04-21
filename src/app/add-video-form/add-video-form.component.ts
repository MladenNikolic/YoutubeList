import { Component, OnInit, Inject} from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VideoServiceService } from '../Services/video-service.service';
import { VideoInterface } from '../Interfaces/Interface';

@Component({
  selector: 'app-add-video-form',
  template: 'passed in {{ data }}',
  templateUrl: './add-video-form.component.html',
  styleUrls: ['./add-video-form.component.scss']
})


export class AddVideoFormComponent implements OnInit {
  videoForm: FormGroup;
  video: number;
  safeURL: string;

  constructor(
    public dialogRef: MatDialogRef<AddVideoFormComponent>,
    public formBuilder: FormBuilder,
    private videoService: VideoServiceService,
    @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit() {
    const currentVideo: VideoInterface = this.videoService.getVideo(this.data);

    this.videoForm = this.formBuilder.group({
      videoname: [currentVideo ? currentVideo.videoName : '', Validators.required],
      url: [currentVideo ? currentVideo.url : '', Validators.required],
      author: [currentVideo ? currentVideo.author : '', Validators.required],
      description: [currentVideo ? currentVideo.description : '', Validators.required]
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
