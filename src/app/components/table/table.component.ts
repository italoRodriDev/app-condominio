import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FilterModalPage } from './filter-modal/filter-modal.page';
import { FilterService } from './filter.service';
import { AlertsService } from 'src/app/services/alerts/alerts.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() iconInfo: string = 'information-circle-outline';
  @Input() iconEdit: string = 'create-outline';
  @Input() iconRemove: string = 'trash-outline';
  @Input() colorIconInfo: any = 'medium';
  @Input() colorIconEdit: any = 'medium';
  @Input() colorIconRemove: any = 'medium';
  @Input() titleIconInfo: string = 'Informações';
  @Input() titleIconEdit: string = 'Editar';
  @Input() titleIconRemove: string = 'Excluir';
  @Input() columns: Array<any> = [];
  @Input() lines: Array<any> = [];
  @Input() filters: Array<any> = [];
  @Input() currentPage: number = 0;
  @Input() showToolbar: boolean = true;
  @Input() showCheckBox: boolean = true;
  @Input() showPagination: boolean = true;
  @Input() showBtnDelete: boolean = true;
  @Input() showBtnInfo: boolean = true;
  @Input() showBtnEdit: boolean = true;
  @Input() modePreview: boolean = false;
  @Input() orderAz: boolean = false;
  @Input() atributoOrderAz: string = '';
  @Output() clickItem: EventEmitter<any> = new EventEmitter();
  @Output() clickInfo: EventEmitter<any> = new EventEmitter();
  @Output() clickEdit: EventEmitter<any> = new EventEmitter();
  @Output() clickRemove: EventEmitter<any> = new EventEmitter();
  @Output() clickNextPage: EventEmitter<any> = new EventEmitter();
  @Output() clickPrevPage: EventEmitter<any> = new EventEmitter();
  @Output() changeToggleButton: EventEmitter<any> = new EventEmitter();
  @Output() changeSelectItems: EventEmitter<any> = new EventEmitter();
  @Output() changeLoadScroll: EventEmitter<any> = new EventEmitter();
  @Output() changeFilterSearch: EventEmitter<any> = new EventEmitter();
  // Filtro
  @Input() showBtnConfigFilter: boolean = true;
  @Input() enableSelectOptsFilter: boolean = true;
  @Input() enableStarsFilter: boolean = false;
  @Input() enableValueMoneyFilter: boolean = false;
  @Input() typeValueJsonFilterMinMax: any = null;
  @Input() typeValueJsonFilterStars: any = null;

  listItems: Array<any> = [];
  listItemsFilter: Array<any> = [];
  listItemsSelected: Array<any> = [];
  showOptsMenu: boolean = false;
  currentIndex: number = NaN;
  typeFilter: string = '';

  typeFilterLabel: string = '';
  lowerUpperMoney: any = { lower: null, upper: null };
  numberStars: any = null;

  constructor(
    private modalCtrl: ModalController,
    private alertService: AlertsService,
    private filterService: FilterService
  ) {}

  ngOnInit() {
    this.configInit();
    this.getDataFilter();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.configInit();
  }

  getDataFilter() {
    this.filterService.changeOnChangeSelectOpts.subscribe((value) => {
      this.typeFilter = value;
      const result = this.filters.find((item) => item.value == value);
      if (result != null) {
        this.typeFilterLabel = result?.title;
      }
    });

    this.filterService.changeOnChangeOnChangeStars.subscribe((value) => {
      this.numberStars = value;
      this.filterStars();
    });

    this.filterService.changeOnChangeValueMoney.subscribe((value) => {
      this.lowerUpperMoney = value;
      this.filterMinMaxValue();
    });
  }

  filterStars() {
    if (this.typeValueJsonFilterStars != null && this.numberStars != null) {
      this.listItems = this.listItemsFilter.filter(
        (item) => item[this.typeValueJsonFilterStars] == this.numberStars
      );
    } else {
      this.listItems = this.listItemsFilter;
    }
  }

  filterMinMaxValue() {
    if (this.typeValueJsonFilterMinMax != null) {
      if (
        this.lowerUpperMoney?.lower != null &&
        this.lowerUpperMoney?.upper != null
      ) {
        this.listItems = this.listItemsFilter.filter(
          (item) =>
            item[this.typeValueJsonFilterMinMax] >=
              this.lowerUpperMoney?.lower &&
            item[this.typeValueJsonFilterMinMax] <= this.lowerUpperMoney?.upper
        );
      }
    } else {
      this.listItems = this.listItemsFilter;
    }
  }

  configInit() {
    // -> Reset filtro
    this.filterService.bsChangeSelectOpts.next(this.filters[0].value);
    this.filterService.bsChangeOnChangeStars.next(null);
    this.filterService.bsChangeOnChangeValueMoney.next({
      lower: null,
      upper: null,
    });

    this.lines.forEach((itemAll) => {
      itemAll.checked = false;
      itemAll.colorBackground = this.getRandomRgbaColor();
    });

    if (this.orderAz == true) {
      this.listItems = this.lines
        .slice()
        .sort((a, b) =>
          a[this.atributoOrderAz].localeCompare(
            b[this.atributoOrderAz],
            undefined,
            { sensitivity: 'base' }
          )
        );
    } else {
      this.listItems = this.lines;
    }
    this.listItemsFilter = this.listItems;
    this.typeFilter = this.filters[0].value;
    this.typeFilterLabel = this.filters[0].title;
  }

  async onClickShowModalFilter() {
    const minMaxValue = this.encontrarMenorEMaior(
      this.listItems,
      this.typeValueJsonFilterMinMax
    );
    const modal = await this.modalCtrl.create({
      component: FilterModalPage,
      cssClass: 'custom-css-modal-bag',
      componentProps: {
        listOpts: this.filters,
        enableSelectOpts: this.enableSelectOptsFilter,
        enableStars: this.enableStarsFilter,
        enableValueMoney: this.enableValueMoneyFilter,
        minValueRangeMoney: minMaxValue.menor,
        maxValueRangeMoney: minMaxValue.maior,
      },
    });
    await modal.present();
  }

  onChangeFilterTable(ev: any) {
    const value = ev.detail.value;
    
    if (value && value !== '') {
      this.listItems = this.listItemsFilter.filter(
        (item) =>
          item[this.typeFilter]
            .toString()
            .toLowerCase()
            .indexOf(value.toLowerCase().trim()) > -1
      );
      
    } else {
      this.listItems = this.listItemsFilter;
    }

    this.changeFilterSearch.emit({
      query: value,
      typeFilter: this.typeFilter,
    });
    
  }

  onChangeSelectTypeFilter(ev: any) {
    this.typeFilter = ev.detail.value;
  }

  onClickShowMenu(index: number) {
    this.currentIndex = index;
    this.showOptsMenu = !this.showOptsMenu;
  }

  onClickInfo(dataItem: any) {
    this.clickInfo.emit(dataItem);
  }

  onClickEdit(dataItem: any) {
    this.clickEdit.emit(dataItem);
  }

  onChangeSelect(ev: any, item: any) {
    const value = ev.detail.checked;

    if (item != null) {
      item.checked = value;
    } else {
      this.listItems.forEach((itemAll) => {
        itemAll.checked = value;
      });
    }

    this.listItemsSelected = [];
    this.listItems.forEach((item) => {
      if (item.checked == true) {
        this.listItemsSelected.push(item);
      }
    });

    this.changeSelectItems.emit(this.listItemsSelected);
  }

  onClickRemove(dataItem: any) {
    this.clickRemove.emit(dataItem);
  }

  onClickItemTable(dataItem: any) {
    this.clickItem.next(dataItem);
  }

  onChangeToggle(ev: any, dataItem: any, currentValueToggle: boolean) {
    this.changeToggleButton.emit({
      data: dataItem,
      value: !currentValueToggle,
    });
  }

  loadData(ev: any) {
    this.changeLoadScroll.emit(ev);
    setTimeout(() => {
      ev.target.complete();
    }, 5000);
  }

  getSizeCol(type: string) {
    var size = null;
    if (type == 'Foto') {
      size = 1;
    }
    return size;
  }

  getRandomRgbaColor(): string {
    const r = Math.floor(Math.random() * 200); // Valor aleatório de vermelho (0-199)
    const g = Math.floor(Math.random() * 200); // Valor aleatório de verde (0-199)
    const b = Math.floor(Math.random() * 200); // Valor aleatório de azul (0-199)
    const a = (Math.random() * 0.6 + 0.4).toFixed(2); // Valor aleatório de transparência (0.40-1.00)
    const color = `rgba(${r}, ${g}, ${b}, ${a})`;
    return color;
  }

  encontrarMenorEMaior(lista: Array<any>, atributo: string) {
    if (lista.length === 0) {
      return { menor: undefined, maior: undefined };
    }

    // Inicializa os valores mínimo e máximo com o primeiro elemento da lista
    let menor = lista[0][atributo];
    let maior = lista[0][atributo];

    // Percorre a lista para encontrar o menor e o maior valor
    lista.forEach((item) => {
      const valorAtual = item[atributo];
      menor = Math.min(menor, valorAtual);
      maior = Math.max(maior, valorAtual);
    });

    return { menor, maior };
  }
}
