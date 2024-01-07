import { enableProdMode, importProvidersFrom } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IConfig, provideEnvironmentNgxMask } from 'ngx-mask';
import { environment } from './environments/environment.prod';
import { AppComponent } from './app/app.component';
import { CommonModule } from '@angular/common';
import { routes } from './app/app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';

if (environment.production) {
  enableProdMode();
}

const maskConfig: Partial<IConfig> = {
  validation: false,
};

bootstrapApplication(AppComponent, {
  providers: [
    AngularFireAuth,
    AngularFireStorage,
    AngularFireDatabase,
    provideEnvironmentNgxMask(maskConfig),
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    
    },
    provideIonicAngular(),
    importProvidersFrom(
      CommonModule,
      IonicModule.forRoot({}),  
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireDatabaseModule,
      AngularFireStorageModule,
      AngularFireAuthModule,
    ),
    provideRouter(routes),
  ],
});