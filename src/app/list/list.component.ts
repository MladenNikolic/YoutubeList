import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material';
import { AddVideoFormComponent} from '../add-video-form/add-video-form.component';
import { ConfirmComponent } from '../confirm/confirm.component';
import { VideoServiceService } from '../video-service.service';
import { Router } from '@angular/router';

export interface PeriodicElement {
  videoname: string;
  url: string;
  author: string;
  description: string;
  ID: number;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  @ViewChild('table', { static: true }) table: { renderRows: () => void; };
  title = 'Zadatak';
  index = Math.floor((Math.random() * 1000) + 1);
  dataSource = [];

  constructor(
    public dialog: MatDialog,
    private videoService: VideoServiceService,
    private router: Router
    ) { }

  displayedColumns: string[] = ['videoname', 'author', 'description', 'url', 'play', 'edit', 'delete'];
  ELEMENT_DATA = this.dataSource;

  ngOnInit() {
    this.dataSource = this.videoService.getVideos();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddVideoFormComponent);
    dialogRef.afterClosed().subscribe(data => {
      data.ID = this.index++;
      this.videoService.setVideo(data);
      this.table.renderRows();
    });
  }

  editDialog(id: number): void {
    const dialogRef = this.dialog.open(AddVideoFormComponent, {data: id} );
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.videoService.deleteVideo(id);
        data.ID = this.index++;
        this.videoService.setVideo(data);
        this.dataSource = this.videoService.getVideos();
        this.table.renderRows();
      }
    });
  }


  deleteVideo(id: number): void {
    const dialogRef = this.dialog.open(ConfirmComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data === 1) {
        this.videoService.deleteVideo(id);
        this.dataSource = this.videoService.getVideos();
        this.table.renderRows();
      } else if (data === 2) {
        this.table.renderRows();
      }
    });
  }

  playVideo(element): void {
    this.router.navigate(['video', element.ID]);
  }

}
