import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, Platform } from '@ionic/angular';
import {
  ImageCroppedEvent,
  ImageCropperModule,
  LoadedImage,
} from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-resize-image-modal',
  templateUrl: './resize-image-modal.page.html',
  styleUrls: ['./resize-image-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ImageCropperModule],
})
export class ResizeImageModalPage implements OnInit {
  isMobile = this.platform.is('mobile');

  @Input() widthImg: string = '200px';
  @Input() heightImg: string = '200px';

  imageStyles: any = {
    width: '200px',
    height: '200px',
  };
  imageChangedEvent: any = null;
  croppedImage: any = null;

  sizeAspectRatio: boolean = false;
  typeAspectRatio: number = 4 / 3;

  constructor(
    private platform: Platform,
    private sanitizer: DomSanitizer,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    if (this.widthImg && this.heightImg) {
      this.imageStyles = {
        width: this.widthImg,
        height: this.heightImg,
      };
    }
  }

  fileChangeEvent(event: any): void {
    if(event.srcElement.files[0] != null) {
      this.imageChangedEvent = event;
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl!);
  }

  imageLoaded(image: LoadedImage) {}
  
  cropperReady() {}
  
  loadImageFailed() {}

  onChangeSizeAspectRatio(ev: any) {
    const value = ev.detail.value;
    if (value) {
      this.sizeAspectRatio = value;
    }
  }

  onChangeTypeAspect(ev: any) {
    const value = ev.detail.value;
    if (value) {
      this.typeAspectRatio = value;
    }
  }

  onClickSave() {
    this.modalCtrl.dismiss({data: this.croppedImage});
  }

  onDismiss() {
    this.modalCtrl.dismiss();
  }
}
