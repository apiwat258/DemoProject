// Function to collect sub-checkbox values
//function collectSubCheckboxes() {
    //const subCheckboxes = document.querySelectorAll('input[name="abnormal_characteristics[]"]:checked');
    //const values = Array.from(subCheckboxes).map(cb => cb.value);
    //return values;
//}

// Function to handle form submission and prepare data
//async function handleFormSubmission(event) {
    //event.preventDefault(); // Prevent the default form submission

   // const formData = new FormData(event.target);
    //const data = Object.fromEntries(formData);

    // Collect sub-checkbox values
    //const abnormalCharacteristics = collectSubCheckboxes();
    //console.log('Received data:', data);
    
    // Set the abnormal_characteristics property directly as an array
    //if (abnormalCharacteristics.length > 0) {
        //data['abnormal_characteristics'] = abnormalCharacteristics; // Assign the array directly
    //} else {
        //delete data['abnormal_characteristics']; // Remove it if no characteristics are selected
    //}

    //try {
        //const response = await fetch('/submit', {
            //method: 'POST',
            //headers: {
                //'Content-Type': 'application/json'
            //},
           // body: JSON.stringify(data)
       // });

       /// const result = await response.json();
        //if (response.ok) {
        //    alert(result.message);
       // } else {
        //    alert('Error: ' + result.message);
        //}
  //  } catch (error) {
    //    console.error('Error submitting form:', error);
   // }
//}