pGenerator
=========
Feel free to use this plugin for your projects

Visit the official page for an working demo @ https://accountspassword.com/password-generator-jquery-plugin

How to
=========
The pGenerator can be used as:

    $('#password-generator-button').pGenerator({
        'bind': 'click',
        'passwordElement': '#password-input',
        'displayElement': '#display-password',
        'passwordLength': 16,
        'uppercase': true,
        'lowercase': true,
        'numbers':   true,
        'specialChars': true,
        'onPasswordGenerated': function(generatedPassword) { }
    });
    
License
=========
    
Released under MIT license - Feel free to copy, modify and redistribute this plugin
