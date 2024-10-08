import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, finalize } from 'rxjs';
import { FormService } from '../forms/form.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AlertsService } from '../alerts/alerts.service';
import { CondominioModel } from 'src/app/models/condomio.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class VotacoesService {
  form: FormGroup = this.formService.formPautaVotacao;

  condominio: CondominioModel | undefined;
  itemsPerPage = 30;
  currentPage = 1;
  public bsItems = new BehaviorSubject<Array<any>>([]);
  listItems = this.bsItems.asObservable();
  public bsPage = new BehaviorSubject(1);
  currentPageIndex = this.bsPage.asObservable();
  listFilesUpload: Array<any> = [];

  refCollection: string = 'PautasVotacao';

  constructor(
    private formService: FormService,
    private fireStore: AngularFirestore,
    private fireStorage: AngularFireStorage,
    private modalCtrl: ModalController,
    private alertService: AlertsService
  ) {}

  getListItems() {
    this.fireStore
      .collection(this.refCollection)
      .doc(this.condominio?.idUser)
      .collection('dados', (ref) => ref.limit(this.itemsPerPage))
      .valueChanges()
      .subscribe((data) => {
        this.bsItems.next([]);
        if (data.length) {
          this.bsItems.next(data);
        }
      });
  }

  getListItemsMonth(currentMonth: string) {
    this.fireStore
      .collection(this.refCollection)
      .doc(this.condominio?.idUser)
      .collection('dados', (ref) => ref.limit(this.itemsPerPage))
      .valueChanges()
      .subscribe((data) => {
        this.bsItems.next([]);
        if (data.length) {
          // Filtrar por mês
          const currentMonth = moment().format('YYYY-MM');
          const filteredData = data.filter((item) => {
            const itemMonth = moment(currentMonth).format('YYYY-MM');
            return itemMonth === currentMonth;
          });

          // Ordenar os dados filtrados por data
          const sortDate = filteredData.sort((a: any, b: any) => {
            const dateA = moment(a.data, 'YYYY-MM-DD');
            const dateB = moment(b.data, 'YYYY-MM-DD');
            return dateA.diff(dateB);
          });

          // Atualizar o BehaviorSubject com os dados filtrados e ordenados
          this.bsItems.next(sortDate);
        }
      });
  }

  getListItemsSearch(tag: string, query: string) {
    if (query.length > 3) {
      this.fireStore
        .collection(this.refCollection)
        .doc(this.condominio?.idUser)
        .collection('dados', (ref) =>
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
      .doc(this.condominio?.idUser)
      .collection('dados')
      .doc(idItem)
      .delete()
      .then(() => {
        this.alertService.showToast('Excluido com sucesso!');
      })
      .catch((error) => {
        this.alertService.showToast('Erro: ' + error.code);
      });
  }

  validateFormPreSave() {
    const idForm = this.form.controls['id'].value;

    if (this.condominio?.idUser != null) {
      if (idForm != null) {
        this.updateData(idForm);
      } else {
        const idFire = this.fireStore.createId();
        this.form.patchValue({
          id: idFire,
          perfilCompleto: false,
          condominio: this.condominio,
        });
        this.saveDataNew(idFire);
      }
    } else {
      this.alertService.showToast('Algo saiu errado, faça o login novamente!');
    }
  }

  saveDataNew(idRef: string) {
    this.fireStore
      .collection(this.refCollection)
      .doc(this.condominio?.idUser)
      .collection('dados')
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
      .doc(this.condominio?.idUser)
      .collection('dados')
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
      .doc(this.condominio?.idUser)
      .collection('dados')
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
      .collection(this.refCollection)
      .doc(this.condominio?.idUser)
      .collection('dados')
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
