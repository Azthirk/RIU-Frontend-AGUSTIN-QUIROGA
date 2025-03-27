import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should initially have isLoading as false', () => {
    expect(service.isLoading()).toBeFalse();
  });

  it('should set isLoading to true when show() is called', () => {
    service.show();
    expect(service.isLoading()).toBeTrue();
  });
});
