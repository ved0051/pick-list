import { PickListModule } from './pick-list.module';

describe('PickListModule', () => {
  let pickListModule: PickListModule;

  beforeEach(() => {
    pickListModule = new PickListModule();
  });

  it('should create an instance', () => {
    expect(pickListModule).toBeTruthy();
  });
});
