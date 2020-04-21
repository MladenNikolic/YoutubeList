import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material';
import { AddVideoFormComponent} from '../add-video-form/add-video-form.component';
import { ConfirmComponent } from '../confirm/confirm.component';
import { VideoServiceService } from '../Services/video-service.service';
import { Router } from '@angular/router';
import { VideoInterface } from '../Interfaces/Interface';

const ELEMENT_DATA: VideoInterface[] = [];

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  @ViewChild('table', { static: true }) table: { renderRows: () => void; };
  title = 'Zadatak';
  index: number = Math.floor((Math.random() * 1000) + 1);
  dataSource: VideoInterface[] = [];

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
