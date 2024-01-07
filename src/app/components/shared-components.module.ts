import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxMaskDirective } from 'ngx-mask';
import { DatetimeComponent } from './select-days/datetime/datetime.component';
import { SelectDaysComponent } from './select-days/select-days.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SkeletonListComponent } from './skeleton-list/skeleton-list.component';
import { TableComponent } from './table/table.component';
import { SelectImagesComponent } from './select-images/select-images.component';

@NgModule({
  declarations: [
    SideBarComponent,
    SkeletonListComponent,
    TableComponent,
    SelectDaysComponent,
    DatetimeComponent,
    SelectImagesComponent
  ],
  imports: [CommonModule, LazyLoadImageModule, NgxMaskDirective],
  exports: [
    SideBarComponent,
    SkeletonListComponent,
    TableComponent,
    SelectDaysComponent,
    DatetimeComponent,
    SelectImagesComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedComponentsModule {}
