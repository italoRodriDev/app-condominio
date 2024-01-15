import { TestBed } from '@angular/core/testing';

import { VotacoesService } from './votacoes.service';

describe('VotacoesService', () => {
  let service: VotacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VotacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
