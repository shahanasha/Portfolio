var form = document.querySelector("#form")
form.addEventListener('submit' , function(e) {
    e.preventDefault(); 
    var emailRes;
    var res = validate();
    console.log(res);
    if(res) {
      emailRes =  sendEmail();
    }
    if(emailRes) {
      sheetSubmission();
    }
})


function validate() {
    var name = document.querySelector('#name').value;
    var email = document.querySelector('#email').value;
    var message = document.querySelector('.message').value;
    var err = document.querySelector('.error');
    var text ;
    // var nameFormat = (/^[A-Za-z]*\s{1}[A-Za-z]*$/);
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
     if(email.match(mailformat) === null) {
        text = "Please enter a valid email";
        err.textContent = text ;
        err.style.height = '4rem';
        return false;
    }
    else if(message.length < 5 ) {
        text = "Please enter a valid message";
        err.textContent = text ;
        err.style.height = '4rem';
        return false;
    }
    
    return true;
}

function sendEmail() {

  console.log("mail")
    const formData = new FormData(form) // got formdata
    // console.log(formData);
    // const FirstName = formData.get('fname');
    // const Email = formData.get('email');
    const message = formData.get('message');
    const body = 
    `Hi Shahana ,
     ${message}`;
    // created body string 
    
    const uri = `mailto:shahanasha2001@gmail.com?body=${encodeURIComponent(body)}`;
    // created final uri to redirect to
    window.location.href = uri;
    return true;
}

function sheetSubmission() {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbx1Pv6nxABsCe-_PbBvkUipU99gjSJncnC9p5yPUAfqs_R6CNLkxIdAVzjjJkUJaiCJ5A/exec';
  const submitButton = document.querySelector(".submit-btn");
  submitButton.disabled = true
//    e.preventDefault()
  let requestBody = new FormData(form)
  fetch(scriptURL, { method: 'POST', body: requestBody})
    .then(response => {
    alert('Success!', response)
      submitButton.disabled = false;
    })
    .catch(error => {
      alert('Error!', error.message)
        submitButton.disabled = false;
    })
}
