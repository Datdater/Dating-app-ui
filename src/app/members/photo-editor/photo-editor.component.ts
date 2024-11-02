import {Component, inject, input, OnInit, output} from '@angular/core';
import {Member} from "../../model/Member";
import {DecimalPipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {FileUploader, FileUploadModule} from "ng2-file-upload";
import {AccountService} from "../../services/account.service";
import {environment} from "../../../environments/environment";
import {MembersService} from "../../services/members.service";
import {Photo} from "../../model/Photo";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FileUploadModule,
    NgClass,
    NgStyle,
    DecimalPipe
  ],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent implements OnInit{

  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  private toast = inject(ToastrService)
  member = input.required<Member>();
  uploader?: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiBaseUrl;
  memberChange = output<Member>();

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo): void {
    this.memberService.setMainPhoto(photo.id).subscribe({
      next: _ => {
        const user = this.accountService.currentUser();
        if(user) {
          user.photoUrl = photo.url;
          this.accountService.setCurrentUser(user);
        }
        const updatedMember = {...this.member()}
        updatedMember.photoUrl = photo.url;
        updatedMember.photos.forEach(p => {
          if (p.isMain) p.isMain = false;
          if (p.id === photo.id) p.isMain = true;
        });
      }
    })
  }

  deletePhoto(photo: Photo) {
    this.memberService.deletePhoto(photo.id).subscribe({
      next: () => {
        this.toast.success("Delete photo successfully!");
        const updatedMember = {...this.member()}
        updatedMember.photos = updatedMember.photos.filter(p => p.id != photo.id);
        this.memberChange.emit(updatedMember);
      }
    })
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + "user/add-photo",
      authToken: "Bearer " + this.accountService.currentUser()?.token,
      isHTML5: true,
      allowedFileType: ["image"],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 1024 * 1024 * 10
    })
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }
    this.uploader.onSuccessItem = (item, response, status, header) => {
      const photo = JSON.parse(response);
      const updatedMember = {...this.member()};
      updatedMember.photos.push(photo);
      this.memberChange.emit(updatedMember);
    }
  }
}
