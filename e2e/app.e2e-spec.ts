import { NascarPoolPage } from './app.po';

describe('nascar-pool App', () => {
  let page: NascarPoolPage;

  beforeEach(() => {
    page = new NascarPoolPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
