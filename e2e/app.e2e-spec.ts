import { AppPage } from './app.po';
import { browser, by, element, protractor, $ } from 'protractor';
var randomstring = require("randomstring");
var path = require('path');
var email = randomstring.generate(7) + "@gmail.com";

describe('Signup', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Click signup button', () => {
  	browser.ignoreSynchronization = true
    page.navigateTo();
    expect(page.getTitle()).toEqual('Clicktool');
    element(by.xpath('//*[@id="myNavbar"]/ul/li[6]/a')).click()
  });

  it('Check agreements checkboxes', () => {
  	expect(page.getTitle()).toEqual('Clicktool');
  	element(by.xpath('//*[@id="reg-form1"]/div[1]/span/p/label')).click()
  	element(by.xpath('//*[@id="reg-form1"]/div[2]/span/p/label')).click()
  	element(by.xpath('//*[@id="reg-form1"]/div[3]/span/p/label')).click()
  	element(by.xpath('//*[@id="reg-form1"]/div[4]/span/p/label')).click()
  	element(by.id('sign-up2')).click()
  })

  it('Enter personal information', () => {
  	expect(page.getTitle()).toEqual('Clicktool');
  	element(by.xpath('/html/body/app-root/app-account-info/div/div[2]/form/div/div[1]/input')).sendKeys('Christopher')
  	element(by.xpath('/html/body/app-root/app-account-info/div/div[2]/form/div/div[2]/input')).sendKeys('Kendrick')
  	element(by.xpath('/html/body/app-root/app-account-info/div/div[2]/form/div/div[3]/input')).sendKeys('07/30/88')
  	element(by.xpath('/html/body/app-root/app-account-info/div/div[2]/form/div/div[4]/input')).sendKeys(email)
  	element(by.xpath('/html/body/app-root/app-account-info/div/div[2]/form/div/div[5]/input')).sendKeys('3233587954')
  	element(by.xpath('/html/body/app-root/app-account-info/div/div[2]/form/div/div[6]/input')).sendKeys('USA')
  	element(by.xpath('/html/body/app-root/app-account-info/div/div[2]/form/div/div[7]/input')).sendKeys('123456789')
  	element(by.css('[formcontrolname=company]')).sendKeys('New Company')
  	element(by.css('[formcontrolname=password]')).sendKeys('password')
  	element(by.css('[formcontrolname=passwordConfirm]')).sendKeys('password')
  	element(by.id('continue')).click()
  })

  it('Click contribution option', () => {
  	element(by.id('12ethereum')).click()
  });

  it('Upload identication documents', () => {
  	var fileToUpload1 = 'id.jpg';
    var absolutePath1 = path.resolve(__dirname, fileToUpload1);
  	element(by.xpath('//*[@id="identification-form"]/div[2]/div/div[1]/app-uploader/input')).sendKeys(absolutePath1)

    var fileToUpload2 = 'selfie.png';
    var absolutePath2 = path.resolve(__dirname, fileToUpload2);
    element(by.xpath('//*[@id="identification-form"]/div[2]/div/div[2]/app-uploader/input')).sendKeys(absolutePath2)

    var fileToUpload3 = 'address.jpeg';
    var absolutePath3 = path.resolve(__dirname, fileToUpload3);
    element(by.xpath('//*[@id="identification-form"]/div[2]/div/div[3]/app-uploader/input')).sendKeys(absolutePath3)

  })

  it('Click finish button', () => {
    element(by.id('finish')).click()
    browser.pause()
  })

});
