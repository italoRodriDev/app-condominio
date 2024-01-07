import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxMaskDirective } from 'ngx-mask';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SkeletonListComponent } from './skeleton-list/skeleton-list.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [SideBarComponent, SkeletonListComponent, TableComponent],
  imports: [CommonModule, LazyLoadImageModule, NgxMaskDirective],
  exports: [SideBarComponent, SkeletonListComponent, TableComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedComponentsModule {}
