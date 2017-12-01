# Dropdown Field

Single ropdown picker for Android and iOS.

## Overview

This widget looks exactly like a dropdown picker. The images below show the design of the widget on iOS (since on Android it is pretty much a default dropdown picker)

<img src="https://s7.postimg.org/t1b7pb5kb/Captura_de_Tela_2017-12-01_a_s_14.30.28.png" width="350"/>

When clicked, an option dialog opens up and the user is able to select an option from the list.

<img src="https://s7.postimg.org/u3le7v3t7/Captura_de_Tela_2017-12-01_a_s_14.30.37.png" width="350"/>

Check it out! Your option is now selected!

<img src="https://s7.postimg.org/j406w95ob/Captura_de_Tela_2017-12-01_a_s_14.30.43.png" width="350"/>

## Use it on your app!

##### Alloy
```
<Widget id="myDropdownField" src="dropdownField"/>
```

##### Controller
```
/* Params:
* an array with all available options
* default text to show on the field to be presented on the screen (the one similar to the picker)
* callback function to be called when an option is selected (optional argument)
*/
$.myDropdownField.initialize(optionsArray,dropdownDefaultText, function(selectedOption)
{
    console.log(selectedOption);
}); 
```

The widget comes with many other functions such as **setTop**, **setWidth**, **setLeft**,**getDropdownValue**,**setDropdownValue**, **getSelectedIndex**, **resetValue**, and **setVisibility**.

Some libraries from https://github.com/rafbel/titanium_libraries are required.
