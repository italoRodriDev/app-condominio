import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ResizeImageModalPage } from './resize-image-modal/resize-image-modal.page';
import { AlertsService } from 'src/app/services/alerts/alerts.service';

@Component({
  selector: 'app-select-images',
  templateUrl: './select-images.component.html',
  styleUrls: ['./select-images.component.scss'],
})
export class SelectImagesComponent implements OnInit {
  @Input() widthImg: string = '200px';
  @Input() heightImg: string = '200px';
  @Input() title: string = 'Galeria de fotos';
  @Input() modeSelect: string = 'SIMPLE';
  @Input() labelSelectSimpleImage: string = 'Foto';
  @Input() urlImagesUpload: Array<any> = [];
  @Input() modoPaisagem: boolean = false;
  @Input() maxPhotos: number = 10;
  @Output() fileData: EventEmitter<any> = new EventEmitter();
  @Output() preview: EventEmitter<any> = new EventEmitter();
  @Output() listSelected: EventEmitter<Array<any>> = new EventEmitter();
  @Output() clickRemove: EventEmitter<any> = new EventEmitter();

  @ViewChild('imgPreview') imgPreview: ElementRef | undefined;
  @ViewChild('inputFileGrid') inputFileGrid: ElementRef | undefined;
  @ViewChild('inputFileSimple') inputFileSimple: ElementRef | undefined;
  file: any = [];
  listFiles: Array<any> = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private alertCtrl: AlertController,
    private alertService: AlertsService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.changeDetector.detectChanges();
  }

  async onChangeSelectImageCropper(blobURL: any) {
    try {
      const response = await fetch(
        blobURL?.changingThisBreaksApplicationSecurity
      );
      const blob = await response.blob();

      // Agora, 'blob' contém o conteúdo do blob
      // Especifique um nome e tipo de arquivo
      const nomeDoArquivo = 'arquivo.blob';
      const tipoDoArquivo = blob.type;

      // Crie um objeto File com o blob carregado
      this.file = new File([blob], nomeDoArquivo, { type: tipoDoArquivo });
    } catch (error) {
      console.error('Erro ao carregar o blob:', error);
    }

    const numberCurrentPhotos =
      this.listFiles.length + this.urlImagesUpload.length;
    if (numberCurrentPhotos < this.maxPhotos) {
      const reader = new FileReader();

      if (this.modeSelect == 'GRID') {
        if (this.file) {
          reader.readAsDataURL(this.file);
        }

        reader.onload = () => {
          const previewData = reader.result;
          const fileData = this.file;
          const find = this.listFiles.find((el) => el.preview == previewData);

          if (!find) {
            this.listFiles.push({
              file: fileData,
              preview: previewData,
            });
            this.listSelected.emit(this.listFiles);
          }
        };
      } else {
        const preview = this.imgPreview!.nativeElement;
        if (this.file) {
          reader.readAsDataURL(this.file);
        }

        reader.onload = () => {
          preview.src = reader.result;
          const previewData = reader.result;
          const fileData = this.file;
          this.listFiles[0] = {
            file: fileData,
            preview: previewData,
          };
          this.listSelected.emit(this.listFiles);
        };
      }
    } else {
      this.alertService.showToast(
        `Você só pode adicionar no máximo ${this.maxPhotos.toString()} foto!`
      );
    }
  }

  getFile() {
    const numberCurrentPhotos =
      this.listFiles.length + this.urlImagesUpload.length;
    if (numberCurrentPhotos < this.maxPhotos) {
      const reader = new FileReader();

      if (this.modeSelect == 'GRID') {
        this.file = this.inputFileGrid!.nativeElement.files[0];

        if (this.file) {
          reader.readAsDataURL(this.file);
        }

        reader.onload = () => {
          const previewData = reader.result;
          const fileData = this.file;
          const find = this.listFiles.find((el) => el.preview == previewData);

          if (!find) {
            this.listFiles.push({
              file: fileData,
              preview: previewData,
            });
            this.listSelected.emit(this.listFiles);
          }
        };
      } else {
        this.file = this.inputFileSimple!.nativeElement.files[0];
        const preview = this.imgPreview!.nativeElement;
        if (this.file) {
          reader.readAsDataURL(this.file);
        }

        reader.onload = () => {
          preview.src = reader.result;
          const previewData = reader.result;
          const fileData = this.file;
          this.listFiles[0] = {
            file: fileData,
            preview: previewData,
          };
          this.listSelected.emit(this.listFiles);
        };
      }
    } else {
      this.alertService.showToast(
        `Você só pode adicionar no máximo ${this.maxPhotos.toString()} foto!`
      );
    }
  }

  async onClickGetPhotoAndResizeFile() {
    const modal = await this.modalCtrl.create({
      component: ResizeImageModalPage,
      cssClass: 'custom-css-modal-desktop',
      componentProps: {
        widthImg: this.widthImg,
        heightImg: this.heightImg,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.data != null) {
      this.onChangeSelectImageCropper(data?.data);
    }
  }

  async onClickRemoveFile(item: any) {
    const alert = await this.alertCtrl.create({
      header: 'Deseja remover essa imagem?',
      subHeader: 'Ao confirmar a imagem não será enviada ao salvar.',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {},
        },
        {
          text: 'Excluir',
          handler: () => {
            const find = this.listFiles.find((file) => file == item);
            const index = this.listFiles.indexOf(find);
            this.listFiles.splice(index, 1);
            this.listSelected.emit(this.listFiles);
          },
        },
      ],
    });
    await alert.present();
  }

  async onClickRemoveImg(item: any) {
    const alert = await this.alertCtrl.create({
      header: 'Deseja excluir essa imagem?',
      subHeader: 'Ao confirmar a imagem será excluida.',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {},
        },
        {
          text: 'Excluir',
          handler: () => {
            
            const find = this.urlImagesUpload.find((img) => img.id == item.id);
            const index = this.urlImagesUpload.indexOf(find);
            this.urlImagesUpload.splice(index, 1);
            this.clickRemove.next({image: find, newListImages: this.urlImagesUpload});
          },
        },
      ],
    });
    await alert.present();
  }
}
