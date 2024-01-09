import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Injectable } from '@angular/core';
import { FormService } from '../forms/form.service';
import { FormGroup } from '@angular/forms';
import { AlertsService } from '../alerts/alerts.service';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, finalize } from 'rxjs';
import * as moment from 'moment';
import { CondominioModel } from 'src/app/models/condomio.model';

@Injectable({
  providedIn: 'root',
})
export class AgendamentoAreaGourmetService {
  condominio: CondominioModel | undefined;
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
    if (this.condominio?.idUser != null) {
      
      this.fireStore
        .collection(this.refCollection)
        .doc(this.condominio.idUser)
        .collection('dados')
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
  }

  getListItemsSearch(tag: string, query: string) {
    if (this.condominio?.idUser != null) {
      if (query.length > 3) {
        this.fireStore
          .collection(this.refCollection)
          .doc(this.condominio.idUser)
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
  }

  remove(idItem: string) {
    if (this.condominio?.idUser != null) {
      this.fireStore
        .collection(this.refCollection)
        .doc(this.condominio.idUser)
        .collection('dados')
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
    if (this.condominio?.idUser != null) {
      this.fireStore
        .collection(this.refCollection)
        .doc(this.condominio.idUser)
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
  }

  updateData(idRef: string) {
    if (this.condominio?.idUser != null) {
      this.fireStore
        .collection(this.refCollection)
        .doc(this.condominio.idUser)
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
  }

  updateStatus(idItem: string, newStatus: boolean) {
    if (this.condominio?.idUser != null) {
      this.fireStore
        .collection(this.refCollection)
        .doc(this.condominio.idUser)
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
  }

  nextPage() {
    if (this.bsItems.value.length >= this.itemsPerPage) {
      this.itemsPerPage += 30;
      this.bsPage.next(this.itemsPerPage);
      this.getListItems();
    }
  }
}
