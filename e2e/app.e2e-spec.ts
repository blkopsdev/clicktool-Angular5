import { AppPage } from './app.po';
import { browser, by, element, protractor, $ } from 'protractor';
const nodemailer = require('nodemailer');
var randomstring = require("randomstring");
var path = require('path');
var email = randomstring.generate(7) + "@gmail.com";

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  servic: "Gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "noreply@clicktool.com",
    pass: "click$toolz312"
  }
});

var resultsHtml = []


describe('Signup a new user', () => {
  let page: AppPage;

  describeItTitle("Signup a new user")

  beforeEach(() => {
    page = new AppPage();
  });

  it('Click signup button', () => {
  	browser.ignoreSynchronization = true
    page.navigateTo();
    expect(page.getTitle()).toEqual('Clicktool');
    element(by.xpath('/html/body/app-root/app-homepage/app-homepage-header/div[2]/header/div/div/div/nav/div[3]/a[2]')).click()
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

  it('Click finish button and complete signup', () => {
    element(by.id('finish')).click()
    browser.driver.sleep(3000)
  })

});

describe('Change password', () => {

  describeItTitle("Change user password")

  afterAll(() => {



  })

  it('Click change password in navbar', () => {
    element(by.css('#myNavbar > app-dashboard-nav > ul > li:nth-child(4) > a')).click()
  })
  it('Enter in old password', () => {
    element(by.xpath('/html/body/app-root/app-password/div/div/div[1]/input')).sendKeys('password')
  })

  it('Enter in new password', () => {
    element(by.xpath('/html/body/app-root/app-password/div/div/div[2]/input')).sendKeys('newpassword')
  })

  it('Enter in new password again', () => {
    element(by.xpath('/html/body/app-root/app-password/div/div/div[3]/input')).sendKeys('newpassword')
  })

  it('Click update password button', () => {
    element(by.xpath('/html/body/app-root/app-password/div/div/button')).click()
    browser.driver.sleep(3000)
  })

  it('Click confirm box', () => {
    browser.switchTo().alert().accept();

    console.log('Sending Email.....')
    let htmlContent = resultsHtml.join(" ")
    console.log(htmlContent)

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"noreply@clicktool.com', // sender address
        to: 'chris@clicktool.com, ', // list of receivers
        subject: 'Test Results ✔', // Subject line
        html: htmlContent // html body
    };


    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      console.log(error, info)
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
    browser.driver.sleep(10000)

  })

})




function describeItTitle(title:string) {
  resultsHtml.push('<h3>'+ title +'</h3><br>')
}

function addItToList(it:string) {

}




