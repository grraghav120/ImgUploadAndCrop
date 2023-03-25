import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { DataService } from './data.service';
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit{
  UploadForm!:FormGroup;
  imgSrc: string='';
  constructor(public dialog: MatDialog,private dataServ:DataService){ }
  ngOnInit(): void {
    this.UploadForm = new FormGroup({
      sign:new FormControl('',Validators.required),
    });
  }

  openDialog(msg:any) {
    const dialogRef = this.dialog.open(UploadDialogComponent,
      {
        data: msg
      });
    dialogRef.afterClosed().subscribe(result => {
      if(result!==true){
        console.log('No file choosen');
        this.imgSrc='';
        this.dataServ.profilePic='';
        this.UploadForm.setValue({
          sign:'',
        })
      }
      else{
        this.imgSrc=this.dataServ.profilePic;
      }
    });
  }

}
