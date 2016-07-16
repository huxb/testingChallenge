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
    var password = element(by.css('#password'));
    var confirmPass = element(by.css('#confirmPass'));
    it('password should exist', function() {
        password.sendKeys('temp');
        password.clear();
        element(by.css('#firstname')).click();
        expect(element(by.css('#passwordAlert')).isDisplayed()).toBe(true);

        password.sendKeys('password');
        expect(element(by.css('#passwordAlert')).isDisplayed()).toBe(false);

        confirmPass.clear();
        element(by.css('#firstname')).click();
        expect(element(by.css('#confirmAlert')).isDisplayed()).toBe(true);

        confirmPass.sendKeys('password');
        expect(element(by.css('#confirmAlert')).isDisplayed()).toBe(false);
    });

    it('password should match', function() {
        password.clear();
        confirmPass.clear();
        password.sendKeys('password');
        confirmPass.sendKeys('password');   
        expect(element(by.css('#matchPass')).isDisplayed()).toEqual(false);

        password.clear();
        confirmPass.clear();
        password.sendKeys('password');
        confirmPass.sendKeys('passwordNotValid');   
        expect(element(by.css('#matchPass')).isDisplayed()).toEqual(true);
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
        element(by.css('#password')).sendKeys('password');
        element(by.css('#confirmPass')).sendKeys('password');
        expect(check.isPresent()).toEqual(true);
    });
    it('should be invalid if date is not in the right format', function() {
        var birthdate = element(by.css('#birthdate')); 
        var validDate = element(by.css('#errorDateValid'));
        birthdate.sendKeys("hafjshjhsa");
        element(by.css('#password')).sendKeys('password');
        element(by.css('#confirmPass')).sendKeys('password');
        expect(validDate.isPresent()).toEqual(true);
    });
});

-describe('Submit', function () {
 -    browser.get('http://localhost:8080/#/signup-form.html');
 -    // if any of the following is invalid, the button should be disabled: email, lastname, birthdate, password, confirm
 -    // only email
    it("should be disabled when form is blank", function() {
		var submitButton = element(by.css("#submit"));
		var email = element(by.css("#email"));
		var lName = element(by.css("#lName"));
		var date = element(by.css("#birthdate"));
		var password = element(by.css("#password"));
		var passConf = element(by.css("#passwordConf"));
		email.clear();
		lName.clear();
		date.clear();
		password.clear();
		passConf.clear();
		expect(submitButton.isEnabled()).toEqual(false);
	});
 -    it('submit is disabled if email is invalid', function () {
 -        element(by.css('#lastname')).sendKeys('LastName');
 -        element(by.css('#birthdate')).sendKeys('1/1/1900');
 -        element(by.css('#password')).sendKeys('Password');
 -        element(by.css('#confirmPass')).sendKeys('Password');
 -        expect(element(by.css('#submit')).isEnabled()).toBe(false);
 -        element(by.css('#email')).sendKeys('validEmail@testing.app');
 -        expect(element(by.css('#submit')).isEnabled()).toBe(true);
 -    });