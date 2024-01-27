//This will contain a list that would be sorted and displayed when the user picks a data category from the add data page
//If the user for example picks vitals the following below will take place
// Vitals will be  main Category
// 1. Blood Pressure (When The use clicks blood pressure the program will go retrieve the units for blood presure bps and contraints for that category such as minimum values, characters allowed, and Max length of characters allowed)
// 2. Heart Rate(units:( bpm, bps), 999 bpm, Numbers: True, decimal places: 4, )
// 3. Temperature(units: (°F,°C, K ), max: 999, min: 0, Numbers: True, decimal places: 4, )
// 4. Respiratory Rate (units: (bpm, bps), max: 999, min: 0, Numbers: True, decimal places: 4, )
// 5. Oxygen Saturation(units: (%), max: 100, min: 0, Numbers: True, decimal places: 4, )
// 6. Add New Data category(user is asked to enter the name of the category and the units for that category if the category is unitless thy can turn it into a text field/Dairy entry)
// 
//
//
// ID, CategoryName, SubCategoryName, Units, Default Unit, Maximum Value, InputType (Number, Text), Decimal Places, System DateTime
//e.g 1, const defaultValue = [ {id: 1, CategoryName: 'Vitals', SubCategory: 'Blood Pressure', Units: 'mmHg',DefaultUnit:'mmHg',MaxValue: 999,InputType: 'Number', DP: 4,SYSDT: 2021-04-01 12:00:00}, {id: 1, CategoryName: ''....}}
//When Vitals in the (DataCategory.js) is clicked the subcategorieNames will be retrieved from the Datalist.js and displayed in (SelectData.js)
//When the user clicks on a subcategory an input modal will pop up. 
//If the user for example chose Blood Pressure a subcategoryName(found under vitals)
//The user will be asked to input numbers only and the decimal places will be limited to 4
//The program will ensure there's a number limit of 999.9999 if the user tried puting beyond that the input box will not accept the new inputs unless the user deletes or backspaces to the limit.
//The program will also ensure that the user does not input negative numbers and will run checks on the inputType to ensure that the user does not input text or special characters where numbers are required
//When the user has entered the correct values the save&exit and add more will change colour indicating that the user can now save the data or add more data. The cancel button will be always available to the user.
//Data will be formatted in a string and saved in a list or in a local file in the phone (use a secure file format of your choice)
// String format: DataID, CategoryName, SubCategoryName, Unit, Inputed Value, InputType (Number), System DateTime