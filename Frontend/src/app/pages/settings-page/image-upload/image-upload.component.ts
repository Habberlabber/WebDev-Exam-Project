import { Component, OnInit } from '@angular/core';

import { UserApiService } from '../../../api-services/user-api.service';
import { AuthApiService } from '../../../api-services/auth-api.service';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'WD-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  providers: [UserApiService, AuthApiService]
})
export class ImageUploadComponent implements OnInit {

  fileToUpload: File = null;
  user;

  constructor(
    private userApi: UserApiService,
    private authApi: AuthApiService
  ) { }

  ngOnInit() { 
    this.authApi.check().subscribe(res => {
      this.user = res; 
    }, error => {
      console.log(error);
    });
  }

  onFileChange(files: FileList) {
    this.fileToUpload = files.item(0);
    this.userApi.addImage(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      console.log(data)
    }, error => {
      console.log(error);
    });
  }

}
