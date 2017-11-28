var ImageLib = require('imagelib');

var dropdownOptions = [];
var defaultText = "Aguarde...";
var currentValue = -1;
var callbackFunction = function(){};

$.initialize = function(options, newText,callback)
{   
    dropdownOptions = [];
    
    dropdownOptions = options.slice();
    dropdownOptions.splice(0,0,newText);
    
    callbackFunction = (typeof callback == "undefined") ? function(){} : callback;
    
    if (OS_IOS)
    {
        var imageDropdownIcon = ImageLib.createFromFile("images/icon_arrow_down.png");
        var imageViewDropdownIcon = imageDropdownIcon.getViewByWidth(20);
    
        $.viewDropdownIconHolder.add(imageViewDropdownIcon);
        $.labelFieldText.text = newText;
        defaultText = newText;

        dropdownOptions.push('Cancelar');
        
        var cancelPosition = dropdownOptions.length - 1;
        
        optionDialog.setOptions(dropdownOptions);
        optionDialog.setCancel(cancelPosition);       
        
        $.viewContainer.removeEventListener('click', eventFunctioniOS);
        $.viewContainer.addEventListener('click', eventFunctioniOS);
        
        $.viewDropdownIconHolder.removeEventListener('click',eventFunctioniOS);
        $.viewDropdownIconHolder.addEventListener('click',eventFunctioniOS);
        
         
    }
    
    else if (OS_ANDROID)
    {
        
        
        $.pickerColumn.removeAllChildren();
        
        for (var i = 0; i < dropdownOptions.length; i++)
        {
            $.pickerColumn.addRow( Ti.UI.createPickerRow ( {title:dropdownOptions[i], color: "#666666"} ) );
        }
        
        $.picker.removeEventListener('change', eventFunctionAndroid);
        $.picker.addEventListener('change', eventFunctionAndroid);

        $.picker.setSelectedRow(0, 1);
        $.picker.setSelectedRow(0, 0); 
    }
};

//Retorna -1 caso seja o valor padrão
$.getDropdownValue = function()
{
    return currentValue;
};

$.setDropdownValue = function(value)
{
    if (OS_IOS)
    {
        for (var i = 0; i < dropdownOptions.length; i++)
        {
            if (value == dropdownOptions[i])
            {
                currentValue = value;
                $.labelFieldText.text = currentValue;  
                break;
            }
                 
        }
               
    }
    else
    {
        var pickerRow = dropdownOptions.indexOf(value);
        if (pickerRow != -1)
        {
            currentValue = value;
            $.picker.setSelectedRow(0, pickerRow);    
        }    
    }
};

$.getSelectedIndex = function()
{   
    var index = dropdownOptions.indexOf(currentValue);
    return (OS_IOS) ? index : index - 1;
};

$.setVisibility = function(value)
{
    var topValue = (value) ? 10 : 0;
    setTop(topValue);
    
    if (OS_IOS)
    {
        var heightValue = (value) ? Ti.UI.SIZE : 0;
        
        $.viewContainer.setVisible(value);
        $.viewContainer.height = heightValue;
    }
    else if (OS_ANDROID)
    {
        var heightValue = (value) ? 45 : 0;
        
        $.pickerWrapper.setVisible(value);
        $.pickerWrapper.height = heightValue;
    }
};

function setTop(topValue)
{
    if (OS_IOS)
    {
        $.viewContainer.top = topValue;
    }
    else if (OS_ANDROID)
    {
        $.pickerWrapper.top = topValue;
    }
}

$.setLeft = function(left)
{
    if (OS_IOS)
    {
        $.viewContainer.left = left;
    }
    else if (OS_ANDROID)
    {
        $.pickerWrapper.left = left;
    }
};

$.setWidth = function(width)
{
    if (OS_IOS)
    {
        $.viewContainer.width = width;
    }
    else if (OS_ANDROID)
    {
        $.pickerWrapper.width = width;
    }
};

$.setTop = setTop;

/*$.setPickerFont = function(font)
{
    $.pickerColumn.font = font;
}*/

$.resetValue = function()
{
    if (OS_IOS)
    {
        currentValue = defaultText;
        $.labelFieldText.text = currentValue;  
    }
    else if (OS_ANDROID)
    {
        currentValue = dropdownOptions[0];
        $.picker.setSelectedRow(0, 0);  
    }
};


if (OS_ANDROID)
{
    function eventFunctionAndroid(event)
    {
       if (event.rowIndex == 0)
       {
           currentValue = -1;
       }
       else
       {
           currentValue = dropdownOptions[event.rowIndex];
       }

        callbackFunction(currentValue);    
    }   
}

else if (OS_IOS)
{
    var optionDialogSettings = {
      cancel: 0,
      options: ['Cancelar'],
      selectedIndex: 0,
      title: 'Selecione uma opção'
    };

    var optionDialog = Ti.UI.createOptionDialog(optionDialogSettings);


    optionDialog.addEventListener('click', function (event)
    {
        if (event.index != dropdownOptions.length - 1)
        {
            currentValue = (event.index == 0) ? -1 : dropdownOptions[event.index];
            $.labelFieldText.text = dropdownOptions[event.index];
 
            callbackFunction(currentValue);
        }
    });
    
    
    function eventFunctioniOS(event)
    {
        optionDialog.show();    
    }
}


