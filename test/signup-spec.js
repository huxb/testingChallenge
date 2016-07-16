"use strict";

// Test First Name and Last Name 
describe('Last Name', function () {
    browser.get('http://localhost:8080/#/signup-form.html');
    it('should exist after touching', function () {

        var lastNameInput = element(by.css('#lastname'));
        // if the last name bar has been touched, but still no input, 
        // there should be error message dislayed
        lastNameInput.sendKeys("");
        var errorMessage = element(by.css('#vlastname'));
        expect(errorMessage.isPresent()).toEqual(true);

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
        expect(element(by.css('#matchPass')).isDisplayed()).toBe(true);
    });
});

// Testing email
describe('Email', function() {
    browser.get('http://localhost:8080/#/signup-form.html');
    var email = element(by.css('#email'));
    // if email is empty after touched, display error message to ask for input
    it ('email should exist', function() {
        email.click();  // select email
        element(by.css('#firstname')).click();  // select something else, so email is touched
        expect(element(by.css('#emptyEmail')).isDisplayed()).toEqual(true);
        expect(element(by.css('#invalidEmail')).isDisplayed()).toEqual(false);
    });
    // if email is not valid, display error message to alert invalid
    it ('email should be valid', function() {
        email.sendKeys('temp');
        expect(element(by.css('#emptyEmail')).isDisplayed()).toEqual(false);
        expect(element(by.css('#invalidEmail')).isDisplayed()).toEqual(true);
    });
    // if email is valid, do not display
    it ('no warnings if everything is correct', function() {
        email.sendKeys('validEmail@testing.app');
        expect(element(by.css('#emptyEmail')).isDisplayed()).toEqual(false);
        expect(element(by.css('#invalidEmail')).isDisplayed()).toEqual(false);
    });
});

describe('Birthdate', function() {
    it('should give invalid error when a user is under 13', function() {
        var birthdate = element(by.css('#birthdate')); 
        var check = element(by.css('#errorAge'));
        birthdate.sendKeys('1/1/2014');
        expect(check.isPresent()).toEqual(true);
    }
    it('should be invalid if date is not in the right format', function() {
        var birthdate = element(by.css('#birthdate')); 
        var validDate = element(by.css('#errorDateValid'));
        birthdate.sendKeys("hafjshjhsa");
        expect(validDate.isPresent()).toEqual(true);
    });
});
// Test submit button
describe('Submit', function () {
    browser.get('http://localhost:8080/#/signup-form.html');
    // if any of the following is invalid, the button should be disabled: email, lastname, birthdate, password, confirm
    // only email
    it('submit is disabled if email is invalid', function () {
        element(by.css('#lastname')).sendKeys('LastName');
        element(by.css('#birthdate')).sendKeys('1/1/1900');
        element(by.css('#password')).sendKeys('Password');
        element(by.css('#confirmPass')).sendKeys('Password');
        expect(element(by.css('#submit')).isEnabled()).toBe(false);
        element(by.css('#email')).sendKeys('validEmail@testing.app');
        expect(element(by.css('#submit')).isEnabled()).toBe(true);
    });
});