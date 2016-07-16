"use strict";

// Test First Name and Last Name 
describe('Name', function () {
    browser.get('http://localhost:8080/#/signup-form.html');
    it('should exist after touching', function () {
        var firstNameInput = element(by.css('#firstname'));
        var lastNameInput = element(by.css('#lastname'));

        firstNameInput.clear();
        element(by.css('#lastname')).click();
        expect(element(by.css('#vfirstname').isDisplayed())).toEqual(true);

        firstNameInput.sendKeys("a");
        expect(element(by.css('#vfirstname').isDisplayed())).toEqual(false);

        lastNameInput.clear();
        element(by.css('#firstname')).click();
        expect(element(by.css('#vlastname').isDisplayed())).toEqual(true);

        lastNameInput.sendKeys("a");
        expect(element(by.css('#vlastname').isDisplayed())).toEqual(false);
    });
});

//Test password and confirm passowrd for match
describe('Password', function(){
    browser.get('http://localhost:8080/#/signup-form.html');
    var password = element(by.css('#password'));
    var confirmPass = element(by.css('#confirmPass'));
    it('password should exist', function() {
        password.sendKeys('temp');
        expect(element(by.css('#passwordAlert')).isDisplayed()).toEqual(false);

        password.clear();
        element(by.css('#firstname')).click();
        expect(element(by.css('#passwordAlert')).isDisplayed()).toEqual(true);

        confirmPass.sendKeys('password');
        expect(element(by.css('#confirmAlert')).isDisplayed()).toEqual(false);

        confirmPass.clear();
        element(by.css('#firstname')).click();
        expect(element(by.css('#confirmAlert')).isDisplayed()).toEqual(true);
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
        confirmPass.sendKeys('passwoord');   
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
        email.clear();
        expect(element(by.css('#emptyEmail')).isDisplayed()).toEqual(false);
        expect(element(by.css('#invalidEmail')).isDisplayed()).toEqual(true);
    });
    // if email is valid, do not display
    it ('no warnings if everything is correct', function() {
        email.sendKeys('validEmail@testing.app');
        email.clear();
        expect(element(by.css('#emptyEmail')).isDisplayed()).toEqual(false);
        expect(element(by.css('#invalidEmail')).isDisplayed()).toEqual(false);
    });
});


describe('Birthdate', function() {
    var birthdate = element(by.css('#birthdate')); 
    it('should be invalid if no date was entered', function() {
        birthdate.click();
        element(by.css('#firstname')).click();
        expect(element(by.css('#birthdateAlert')).isDisplayed()).toEqual(true);
    })
    it('should give invalid error when a user is under 13', function() {
        var check = element(by.css('#errorAge'));
        birthdate.sendKeys('1/1/2014');
        birthdate.clear();
        expect(check.isPresent()).toEqual(true);
    });
    it('should be invalid if date is not in the right format', function() {
        var validDate = element(by.css('#errorDateValid'));
        birthdate.sendKeys("hafjshjhsa");
        birthdate.clear();
        expect(validDate.isPresent()).toEqual(true);
        
        birthdate.sendKeys("2");
        birthdate.clear();
        expect(validDate.isPresent()).toEqual(true);
        
        birthdate.sendKeys("2/2");
        birthdate.clear();
        expect(validDate.isPresent()).toEqual(true);

        birthdate.sendKeys("2/2/2");
        birthdate.clear();
        expect(validDate.isPresent()).toEqual(false);
    });
});

describe('Submit', function () {
    browser.get('http://localhost:8080/#/signup-form.html');
    var email = element(by.css("#email"));
    var firstName = element(by.css("#firstname"));
    var lastName = element(by.css("#lastname"));
    var date = element(by.css("#birthdate"));
    var password = element(by.css("#password"));
    var passConf = element(by.css("#confirmPass"));
    var submitButton = element(by.css("#submit"));
    //check if button isnt enabled when no inputs in any field
    it("should be disabled when form is blank", function() {
		email.clear();
		firstName.clear();
		lastName.clear();
		date.clear();
		password.clear();
		passConf.clear();
		expect(submitButton.isEnabled()).toEqual(false);
	});
    //if any of the error message is being displayed
    //button is expected not to be enabled
    it("should be disabled if any field is invalid, and enabled if otherwise", function(){
        if(element(by.css('#emptyEmail')).isDisplayed()|| element(by.css('#invalidEmail')).isDisplayed() || element(by.css('#vfirstname')).isDisplayed() || element(by.css('#vlastname')).isDisplayed() || element(by.css('#birthdateAlert')).isDisplayed() || element(by.css('#errorDateValid')).isDisplayed() || element(by.css('#errorAge')).isDisplayed() || element(by.css('#passwordAlert')).isDisplayed() || element(by.css('#matchPass')).isDisplayed() || element(by.css('#confirmAlert')).isDisplayed())
            expect(submitButton.isEnabled()).toEqual(false);
        else
            expect(submitButton.isEnabled()).toEqual(true);
    })
});