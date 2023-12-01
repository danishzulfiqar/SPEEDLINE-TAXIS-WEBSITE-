///////////////////// NEW VIA INPUT //////////////////////

function addVia() {
    const optionValue = document.getElementById('via-number').value;
    const container = document.getElementById('via-input');
    
    container.innerHTML = '';
  
    for (let i = 0; i < optionValue; i++) {
      const newViaInput = document.createElement('input');
      newViaInput.type = 'text';
      newViaInput.placeholder = 'Enter ' + [i+1] + ' Stop Location';
      newViaInput.classList.add('form-control', 'via-input1');
      newViaInput.id = 'via' + (i + 1);
      newViaInput.style.marginBottom = '20px';
  
      container.appendChild(newViaInput);
  
      const autocomplete = new google.maps.places.Autocomplete(newViaInput);
    }
  }
  
  ///////////////////////////// FORM ////////////////////////////////////////////
  
  
  let viaString = '';
  
  function submit_click() {
    const name = document.getElementById('name').value;
    const pickup = document.getElementById('pickup').value;
    const dropoff = document.getElementById('dropoff').value;
    const fleet = document.getElementById('fleetOptions').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const payment = document.getElementById('paymentmethode').value;
  
    // const viaNumber = document.getElementById('via-number').value;
    // let viaValues = [];
  
    // for (let i = 1; i <= viaNumber; i++) {
    //   const viaInput = document.getElementById('via' + i);
    //   if (viaInput) {
    //     viaValues.push(viaInput.value);
    //   }  
    // }
    // console.log('Via Values:', viaValues);
  
    const viaNumber = document.getElementById('via-number').value;
    let viaValues = [];
  
    for (let i = 1; i <= viaNumber; i++) {
      const viaInput = document.getElementById('via' + i);
      if (viaInput) {
        viaValues.push(viaInput.value);
      }
    }
  
  
    document.getElementById('confirmed-name').textContent = name;
    document.getElementById('confirmed-pickup').textContent = pickup;
    // document.getElementById('confirmed-via').textContent = viaValues;
  
    const viaList = document.getElementById('confirmed-via');
    viaList.innerHTML = ''; // Clear the previous content
  
    viaValues.forEach(value => {
      const listItem = document.createElement('li');
      listItem.textContent = value;
      viaList.appendChild(listItem);
  
      viaString = viaString + `${value} : `;
    });
  
  
  
    document.getElementById('confirmed-dropoff').textContent = dropoff;
    document.getElementById('confirmed-fleet').textContent = fleet;
    document.getElementById('confirmed-phone').textContent = phone;
    document.getElementById('confirmed-date').textContent = date;
    document.getElementById('confirmed-time').textContent = time;
    document.getElementById('confirmed-Payment-Methode').textContent = payment;
  
    if (name === '' || pickup === '' || dropoff === '' || fleet === '' || phone === '' || date === '' || time === '' || payment === '') {
      alert('Please fill in all the required fields.');
      return;
    }
  
    document.getElementById('confirmed-name').textContent = name;
  
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('confirmation-form').style.display = 'block';
  }
  
  function confirmBooking() {
    document.getElementById('confirmation-form').style.display = 'none';
    document.getElementById('form-container').style.display = 'block';
  }
  
  document.getElementById('booking-form').style.display = 'block';
  document.getElementById('confirmation-form').style.display = 'none';
  
  
  //////////////////////////////////// Search Inputs ///////////////////////////
  
  function initMap() {
    var pickup = new google.maps.places.SearchBox(document.getElementById('pickup'));
    var dropoff = new google.maps.places.SearchBox(document.getElementById('dropoff'));
  
  }
  
  
  /////////////////////////////////////////////////////////////////////////////
  
  function confirm_form() {
  
    ////// enter your mail
    const recepient = ""
  
    const name = document.getElementById('name').value;
    const pickup = document.getElementById('pickup').value;
    const dropoff = document.getElementById('dropoff').value;
    const phone = document.getElementById('phone').value;
    const fleet = document.getElementById('fleetOptions').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const paymentMethod = document.getElementById('paymentmethode').value;
    const via = viaString;
  
    const formData = new URLSearchParams();
    formData.append('name', name);
    formData.append('pickup', pickup);
    formData.append('via', via);
    formData.append('dropoff', dropoff);
    formData.append('phone', phone);
    formData.append('fleet', fleet);
    formData.append('date', date);
    formData.append('time', time);
    formData.append('paymentMethod', paymentMethod);
    formData.append('recepient', recepient);
  
  
  
    axios.post('https://nodemailerapp.vercel.app/sendemail', formData)
        .then(response => {
            console.log('Server response:', response.data);
            alert('Your Request has been Submitted')
            window.location.href = "index.html";
        })
        .catch(error => {
            alert("Error booking!! try again");
            window.location.href = "form.html"
            console.error('Error:', error.message);
        });
  }
  
  
  
  
  // function addVia(){
  //   const container = document.getElementById('via-input');
  //   container.innerHTML = '';
  
  //   const optionValue = document.getElementById('via-number').value;
  
  //   for (let i = 0; i < optionValue; i++) {
  
  //     alert(i)
  //     const container = document.getElementById('via-input');
  
  //     const newViaInput = document.createElement('input');
  //     newViaInput.type = 'text';
  //     newViaInput.placeholder = 'Enter Stop if any.';
  //     newViaInput.classList.add('form-control', 'via-input1');
  //     newViaInput.id = 'via' + (i + 1);
  
  //     container.appendChild(newViaInput);
      
  //   }
  // }
  
  