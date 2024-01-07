import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Injectable } from '@angular/core';
import { FormService } from '../forms/form.service';
import { FormGroup } from '@angular/forms';
import { AlertsService } from '../alerts/alerts.service';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, finalize } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoAreaGourmetService {

  form: FormGroup = this.formService.formAgendamento;
  itemsPerPage = 30;
  currentPage = 1;
  public bsItems = new BehaviorSubject<Array<any>>([]);
  listItems = this.bsItems.asObservable();
  public bsPage = new BehaviorSubject(1);
  currentPageIndex = this.bsPage.asObservable();
  listFilesUpload: Array<any> = [];

  refCollection: string = 'AgendamentosAreaGourmet';

  constructor(
    private formService: FormService,
    private fireStore: AngularFirestore,
    private fireStorage: AngularFireStorage,
    private modalCtrl: ModalController,
    private alertService: AlertsService
  ) {}

  getListItems() {
    this.fireStore
      .collection(this.refCollection, ref => ref.limit(this.itemsPerPage))
      .valueChanges()
      .subscribe((data) => {
        this.bsItems.next([]);
        if (data.length) {

          const sortDate = data.sort((a: any, b: any) => {
            const dateA = moment(a.data, 'YYYY-MM-DD');
            const dateB = moment(b.data, 'YYYY-MM-DD');
            return dateA.diff(dateB);
          });
          this.bsItems.next(sortDate);
        }
      });
  }

  getListItemsSearch(tag: string, query: string) {
    if (query.length > 3) {
      this.fireStore
        .collection(this.refCollection, (ref) =>
          ref
            .where(tag, '>=', query)
            .where(tag, '<=', query + '\uf8ff')
            .limit(30)
        )
        .valueChanges()
        .subscribe((data) => {
          if (data.length) {
            this.bsItems.next([]);
            this.bsItems.next(data);
          } else {
            this.alertService.showToast('Nenhum resultado foi encontrado...');
          }
        });
    } else {
      this.getListItems();
    }
  }

  remove(idItem: string) {
    this.fireStore
      .collection(this.refCollection)
      .doc(idItem)
      .delete()
      .then(() => {
        this.alertService.showToast('Excluido com sucesso!');
        this.modalCtrl.dismiss();
      })
      .catch((error) => {
        this.alertService.showToast('Erro: ' + error.code);
      });
  }

  validateFormPreSave() {
    const idForm = this.form.controls['id'].value;

      if (idForm != null) {
        this.updateData(idForm);
      } else {
        const idFire = this.fireStore.createId();
        this.form.patchValue({
          id: idFire,
        });
        this.saveDataNew(idFire);
      }
  }

  saveDataNew(idRef: string) {
    this.fireStore
      .collection(this.refCollection)
      .doc(idRef)
      .set(this.form.value)
      .then(() => {
        this.alertService.showToast('Cadastrado com sucesso!');
        this.formService.resetDataForm();
        this.modalCtrl.dismiss();
      })
      .catch((error) => {
        this.alertService.showToast('Erro: ' + error.code);
      });
  }

  updateData(idRef: string) {
    this.fireStore
      .collection(this.refCollection)
      .doc(idRef)
      .update(this.form.value)
      .then(() => {
        this.alertService.showToast('Atualizado com sucesso!');
        this.formService.resetDataForm();
        this.modalCtrl.dismiss();
      })
      .catch((error) => {
        this.alertService.showToast('Erro: ' + error.code);
      });
  }

  updateStatus(idItem: string, newStatus: boolean) {
    this.fireStore
      .collection(this.refCollection)
      .doc(idItem)
      .update({ status: newStatus })
      .then(() => {
        this.alertService.showToast('Status atualizado com sucesso!');
      })
      .catch((error) => {
        this.alertService.showToast('Erro: ' + error.code);
      });
  }

  uploadFileImages(currentImages: Array<any>, pathSaveImages: string) {
    return new Promise<Array<any>>((resolve) => {
      var urlsUploadComplete: Array<any> = [];
      if (currentImages != null) {
        urlsUploadComplete = currentImages;
      }

      if (this.listFilesUpload.length > 0) {
        this.listFilesUpload.forEach((data, index) => {
          var currentFile: number = index + 1;
          var numberFiles: number = this.listFilesUpload.length;

          if (data.file != null) {
            this.alertService
              .showLoadingUploadImage(
                `Aguarde! Estamos enviando as imagens: ${currentFile}/${numberFiles}`
              )
              .then((loading) => {
                loading.present();

                var idImg = this.fireStore.createId().toString();
                var ref = this.fireStorage.ref(
                  `${pathSaveImages}/${idImg + '.jpg'}`
                );
                var task = ref.put(data?.file);

                task.percentageChanges().subscribe((progress) => {});
                task
                  .snapshotChanges()
                  .pipe(
                    finalize(() => {
                      ref.getDownloadURL().subscribe((url) => {
                        // -> Salvando url de imagem na lista
                        urlsUploadComplete.push({ id: idImg, url: url });
                        this.alertService.showToast(
                          `Upload da imagem ${currentFile} finalizada com sucesso!`
                        );
                        if (currentFile == numberFiles) {
                          this.listFilesUpload = [];
                          urlsUploadComplete.sort((a, b) => b - a);
                          resolve(urlsUploadComplete);
                        }
                      });
                    })
                  )
                  .subscribe();
              });
          }
        });
      } else {
        resolve(urlsUploadComplete);
      }
    });
  }

  removeImage(item: any, dataImage: any) {
    const idDoc = item?.id;
    const idImage = dataImage?.image?.id;
    const newListImages = dataImage?.newListImages;

    this.fireStore
      .collection('Categories')
      .doc(idDoc)
      .update({ urlImagesUpload: newListImages })
      .then(() => {
        this.fireStorage
          .ref('Imagens')
          .child(this.refCollection)
          .child(idDoc)
          .child(idImage + '.jpg')
          .delete();
        this.alertService.showToast('Imagem excluida com sucesso!');
      });
  }

  nextPage() {
    if (this.bsItems.value.length >= this.itemsPerPage) {
      this.itemsPerPage += 30;
      this.bsPage.next(this.itemsPerPage);
      this.getListItems();
    }
  }
}
