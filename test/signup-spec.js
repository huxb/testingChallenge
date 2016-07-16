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
        var check = element(by.css('#birthdate'));
        birthdate.sendKeys('1/1/2014');
        expect(check.isPresent()).toEqual(true);
    });
});