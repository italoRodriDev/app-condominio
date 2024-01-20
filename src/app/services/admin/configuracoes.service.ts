import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, finalize } from 'rxjs';
import { CondominioModel } from 'src/app/models/condomio.model';
import { AlertsService } from '../alerts/alerts.service';
import { FormService } from '../forms/form.service';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracoesService {
  form: FormGroup = this.formService.formSettings;
  db = this.fireDatabase.database;

  public bsSettings = new BehaviorSubject<any>(null);
  dataSettings = this.bsSettings.asObservable();

  condominio: CondominioModel | undefined;
  listFilesUpload: Array<any> = [];

  refCollection: string = 'Condominios';

  constructor(
    private alertService: AlertsService,
    private formService: FormService,
    private fireStore: AngularFirestore,
    private fireDatabase: AngularFireDatabase,
    private fireStorage: AngularFireStorage
  ) {}

  saveData() {
    if (this.condominio?.idUser && this.form.valid) {
      this.fireStore
        .collection(this.refCollection)
        .doc(this.condominio?.idUser)
        .update(this.form.value)
        .then(() => {
          this.uploadFileImages();
          this.alertService.showToast('Salvo com sucesso!');
        })
        .catch((error) => {
          this.alertService.showToast('Erro: ' + error.message);
        });
    }
  }

  uploadFileImages() {
    const idCondominio = this.condominio?.idUser!;
    if (idCondominio) {
      this.listFilesUpload.forEach((data, index) => {
        var currentFile: number = index + 1;
        var numberFiles: number = this.listFilesUpload.length;
        if (data.file != null) {
          this.alertService.showLoading().then((loading) => {
            loading.present();

            var idImg = idCondominio;
            var ref = this.fireStorage
              .ref('images')
              .child('Condominios')
              .child('logo')
              .child(idCondominio)
              .child(idImg + '.jpg');
            var task = ref.put(data?.file);

            task.percentageChanges().subscribe((progress) => {});
            task
              .snapshotChanges()
              .pipe(
                finalize(() => {
                  ref.getDownloadURL().subscribe((url) => {
                    // -> Salvando url de imagem
                    this.db
                      .ref(this.refCollection)
                      .child(idCondominio)
                      .child('logo')
                      .update({ id: idImg, url: url })
                      .then(() => {
                        if (currentFile == numberFiles) {
                          this.listFilesUpload = [];
                          this.alertService.showToast('Salvo com sucesso!');
                          this.formService.resetDataForm();
                        }
                        loading.dismiss();
                      })
                      .catch(() => {
                        loading.dismiss();
                      });
                  });
                })
              )
              .subscribe();
          });
        }
      });
    }
  }
}
