const nameInput = document.getElementById("nameInput");
const errorName = document.getElementById("errorName");

const emailInput = document.getElementById("emailInput");
const errorEmail = document.getElementById("errorEmail");

const ageInput = document.getElementById("ageInput");
const errorAge = document.getElementById("errorAge");

const dobInput = document.getElementById("dobInput");
const errorDob = document.getElementById("errorDob");

const genderInput = document.getElementsByName("gender");
const errorGender = document.getElementById("errorGender");

const hobbiesInput = document.getElementsByName("hobbies");
const errorHobbies = document.getElementById("errorHobbies");

const countryInput = document.getElementById("country");
const errorCountry = document.getElementById("errorCountry");

const form = document.querySelector("form");
const outputArea = document.getElementById("outputArea");

const submitError = document.getElementById('submitError')

const emailExistError = document.getElementById("emailExistError")

const handleName = (e) => {
  const data = e.target.value;
  console.log(data);

  if (data.length == 0) {
    errorName.innerHTML = `<p>Name cannot be empty </p>`;
  } else if (data.length <= 2) {
    errorName.innerHTML = `<p>Input must be more than 2 charecters</p>`;
  } else if (data.length > 50) {
    errorName.innerHTML = `<p>Input must be at lower than 50 charecters</p>`;
  } else {
    errorName.innerHTML = ``;
  }
};

nameInput.addEventListener("input", (e) => {
  handleName(e);
});

const handleEmail = (e) => {
  const data = e.target.value;
  console.log(data);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (data.length === 0) {
    errorEmail.innerHTML = `Email is required`;
  } else if (!emailRegex.test(data)) {
    console.log("Enter a valid email address");
    errorEmail.innerHTML = `Enter a valid email address`;
  } else {
    errorEmail.innerHTML = ``;
  }
};

emailInput.addEventListener("input", (e) => {
  handleEmail(e);
});

const handleAge = (e) => {
  let data = e.target.value;

  if (data.length == 0) {
    errorAge.innerHTML = `Age is required`;
    return;
  }

  data = Number(data);

  if (isNaN(data)) {
    console.log("Enter a number");
    errorAge.innerHTML = `Enter a valid number`;
  } else if (data < 1 || data > 120) {
    errorAge.innerHTML = `Age should be between 1-120`;
  } else {
    errorAge.innerHTML = ``;
  }
};

ageInput.addEventListener("input", (e) => {
  handleAge(e);
});

const handleDob = (e) => {
  let data = e.target.value;

  if (data.length == 0) {
    errorDob.innerHTML = `This field is required`;
    return;
  }

  data = new Date(data);
  if (data > new Date()) {
    console.log("Enter valid date");
    errorDob.innerHTML = `You cannot enter a future date`;
  } else {
    errorDob.innerHTML = ``;
  }
};

dobInput.addEventListener("input", (e) => {
  handleDob(e);
});

handleGender = () => {
  let isSelected = false;

  for (let i = 0; i < genderInput.length; i++) {
    if (genderInput[i].checked) {
      isSelected = true;
      break;
    }
  }

  if (!isSelected) {
    errorGender.innerHTML = `<p>Gender details are mandatory`;
    console.log("Gender details are mandatory");
  } else {
    errorGender.innerHTML = ``;
  }
};

for (let i = 0; i < genderInput.length; i++) {
  genderInput[i].addEventListener("input", handleGender);
}

const handleHobbies = () => {
  let isChecked = false;

  for (let i = 0; i < hobbiesInput.length; i++) {
    if (hobbiesInput[i].checked) {
      isChecked = true;
      break;
    }
  }

  if (!isChecked) {
    errorHobbies.innerHTML = `<p>Please select at least one hobby</p>`;
    console.log("No hobbies selected");
  } else {
    errorHobbies.innerHTML = ``;
  }
};

for (let i = 0; i < hobbiesInput.length; i++) {
  hobbiesInput[i].addEventListener("input", handleHobbies);
}

const handleCountry = (e) => {
  const selectedValue = e.target.value;
  console.log(selectedValue);

  if (selectedValue == "") {
    errorCountry.innerHTML = `<p>Please select a country</p>`;
  } else {
    errorCountry.innerHTML = ``;
  }
};

countryInput.addEventListener("input", handleCountry);

let localStorageData = JSON.parse(localStorage.getItem("localStorageData")) || [];

outputArea.value = JSON.stringify(localStorageData, null, 2);

form.addEventListener("submit", (e) => {
  e.preventDefault(); 

  handleName({ target: nameInput });
  handleEmail({ target: emailInput });
  handleAge({ target: ageInput });
  handleDob({ target: dobInput });
  handleGender();
  handleHobbies();
  handleCountry({ target: countryInput });

  const hasError =
    errorName.innerHTML.trim() !== "" ||
    errorEmail.innerHTML.trim() !== "" ||
    errorAge.innerHTML.trim() !== "" ||
    errorDob.innerHTML.trim() !== "" ||
    errorGender.innerHTML.trim() !== "" ||
    errorHobbies.innerHTML.trim() !== "" ||
    errorCountry.innerHTML.trim() !== "";

  if (hasError) {
    console.log("Form contains errors. Please fix them before submitting.");
    submitError.innerHTML=
    `Form contains errors. Please fix them before submitting.`
  } else {
    console.log("Form is valid. Adding data to JSON output...");
    submitError.innerHTML=
    ``

    let selectedGender = "Not selected";
    for (let i = 0; i < genderInput.length; i++) {
      if (genderInput[i].checked) {
        selectedGender = genderInput[i].value;
        break;
      }
    }

    let selectedHobbies = [];
    for (let i = 0; i < hobbiesInput.length; i++) {
      if (hobbiesInput[i].checked) {
        selectedHobbies.push(hobbiesInput[i].value);
      }
    }

    const newEntry = {
      name: nameInput.value,
      email: emailInput.value,
      age: Number(ageInput.value),
      dob: dobInput.value,
      gender: selectedGender,
      hobbies: selectedHobbies,
      country: countryInput.value,
    };

    let flag = false;

    for (let i = 0; i < localStorageData.length; i++) {
      if (newEntry.email == localStorageData[i].email) {
        flag = true;
        emailExistError.innerHTML = 
        `This email ID already exists`
        break
      }
      else{
        emailExistError.innerHTML = 
        ``
      }
    }

    if (!flag) {
      localStorageData.push(newEntry);

      localStorage.setItem("localStorageData", JSON.stringify(localStorageData));
      form.reset();
    }

    outputArea.value = JSON.stringify(localStorageData, null, 2);

  }
});

const theme = document.getElementById('theme')
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  theme.textContent = "Light Mode";
} else {
  document.body.classList.remove('dark-mode');
  theme.textContent = "Dark Mode";
}

theme.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    theme.textContent = "Light Mode";
    localStorage.setItem('theme', 'dark'); 
  } else {
    theme.textContent = "Dark Mode";
    localStorage.setItem('theme', 'light'); 
  }
});
