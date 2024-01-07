import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-list',
  templateUrl: './skeleton-list.component.html',
  styleUrls: ['./skeleton-list.component.scss'],
})
export class SkeletonListComponent implements OnInit {

  @Input() image: string = 'lista_vazia_anim.svg';
  @Input() label = 'Não existem dados para exibir...';
  public buffer = 0.06;
  public progress = 0;
  time: boolean = true;
  list: Array<number> = [0, 1, 2, 3];

  constructor() {}

  ngOnInit() {
   this.setLoading();
  }

  setLoading() {
    setInterval(() => {
      this.buffer += 0.06;
      this.progress += 0.06;
      if (this.progress > 1) {
        setTimeout(() => {
          this.buffer = 0.06;
          this.progress = 0;
          this.time = false;
        }, 100);
      }
    }, 100);
  }
}
