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
  
  
  
  //////////////////////////////////// Search Inputs ///////////////////////////
  
  function initMap() {
    var pickup = new google.maps.places.SearchBox(document.getElementById('pickup'));
    var dropoff = new google.maps.places.SearchBox(document.getElementById('dropoff'));
  
  }
  
  /////////////////////////////////////////////////////////////////////////////


  function calculateDistance() {
    const pickup = document.getElementById('pickup').value;
    const dropoff = document.getElementById('dropoff').value;
    const viaValues = [];

    console.log('hello'+ pickup)

    // Retrieve via points' values
    const viaNumber = document.getElementById('via-number').value;
    for (let i = 1; i <= viaNumber; i++) {
        const viaInput = document.getElementById('via' + i);
        if (viaInput) {
            viaValues.push({
                location: viaInput.value,
                stopover: true // Indicates the waypoint
            });
        }
    }

    const directionsService = new google.maps.DirectionsService();
    const request = {
        origin: pickup,
        destination: dropoff,
        waypoints: viaValues, 
        optimizeWaypoints: true, // Try to reorder the waypoints for the shortest route
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function (result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            const distance = result.routes[0].legs.reduce((total, leg) => total + leg.distance.value, 0);
            const formattedDistance = (distance / 1000).toFixed(2); //meters to kilometers
            const miles = formattedDistance * 0.621371; // kilometers to miles

            const inputTime = document.getElementById('time').value;
            const [hours, minutes] = inputTime.split(':').map(Number);

            switch (document.getElementById('fleetOptions').value) {
              case 'Up to 4 people--2 large bags':
                if(hours >= 23 || hours < 7){
                  const Price = Math.round(miles * 2);
                  const finalPrice = ((Price/2) + Price) + '£';
                  document.getElementById('confirmed-price').textContent = finalPrice;
                }
                else{
                  const finalPrice = Math.round(miles * 2) + '£'
                  document.getElementById('confirmed-price').textContent = finalPrice;
                }
                break;
            
              case 'Up to 6 people--3 large bags':
                if(hours >= 23 || hours < 7){
                  const Price = Math.round(miles * 3);
                  const finalPrice = ((Price/2) + Price) + '£';
                  document.getElementById('confirmed-price').textContent = finalPrice;
                }
                else{
                  const finalPrice = Math.round((miles * 3)) + '£';
                  document.getElementById('confirmed-price').textContent = finalPrice;
                }
                break;
            
              case 'Up to 8 people--4 large bags':
                if(hours >= 23 || hours < 7){
                  const Price = Math.round(miles * 3.7);
                  const finalPrice = ((Price/2) + Price) + '£';
                  document.getElementById('confirmed-price').textContent = finalPrice;
                }
                else{
                  const finalPrice = Math.round((miles * 3.7)) + '£';
                  document.getElementById('confirmed-price').textContent = finalPrice;
                }
                break;
            
                default:
                break;
            }
            
        } else {
            // Handle error case if needed
            console.error('Directions request failed due to ' + status);
        }
    });
}


  
