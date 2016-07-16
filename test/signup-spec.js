"use strict";

// Test First Name and Last Name 
describe('Last Name', function () {
    browser.get('http://localhost:8080/#/signup-form.html');
    it('should exist after touching', function () {

        var lastNameInput = element(by.css('#lastname'));
        // if the last name bar has been touched, but still no input, 
        // there should be error message dislayed
        lastNameInput.sendKeys(' ');
        var errorMessage = element(by.css('#vlastname'));
        expect(errorMessage.isDisplayed()).toEqual(true);

        // if the last name bar has been touched, and has an input, 
        // there should not be error message dislayed
        lastNameInput.clear();
        lastNameInput.sendKeys('a');
        expect(errorMessage.isDisplayed()).toEqual(false);
    });
});

//Test password and confirm passowrd for match
describe('Password', function(){
    browser.get('http://localhost:8080/#/signup-form.html');
    var password = element(by.css('#pasword'));
    var confirmPass = element(by.css('#confirm'));
    it('password1 should exist', function() {
        expect(password).not.toBe("");
        expect(element(by.css('#enterPass1')).isDisplayed()).toBe(true);

        expect(confirmPass).not.toBe("");
        expect(element(by.css('#enterPass2')).isDisplayed()).toBe(true);
    });

    it('both passwords should match', function(){
        expect(password).toBe(confirmPass);    
        expect(element(by.css('.matchPass')).isDisplayed()).toBe(true);
    });
});
