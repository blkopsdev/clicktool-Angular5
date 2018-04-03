import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('http://18.222.91.150');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getTitle() {
    return browser.getTitle();
  }
  
}
