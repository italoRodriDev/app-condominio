import { TestBed } from '@angular/core/testing';

import { AgendamentoAreaGourmetService } from './agendamento-area-gourmet.service';

describe('AgendamentoAreaGourmetService', () => {
  let service: AgendamentoAreaGourmetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendamentoAreaGourmetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
