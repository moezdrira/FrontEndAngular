import { TestBed } from '@angular/core/testing';

import { ServiceProduitService } from './service-produit.service';

describe('ServiceProduitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceProduitService = TestBed.get(ServiceProduitService);
    expect(service).toBeTruthy();
  });
});
