let url = "https://localhost:7012/api/Car"; //fill this link with ours

const sortSelect = document.getElementById("sortSelect");
const form = document.getElementById("new-car");
const tableBody = document.getElementById("carTableBody");
const adminTableBody = document.getElementById("AdminTableBody");
let cars = [];

// let sortOption = "high";
let gasCar = [
  {
    // SEDAN
    id: 1,
    carName: "2023 Hyundai Elantra",
    carPrice: 24400,
    range: 409.2,
    horsePower: 147,
    drive: "2wd",
    transmission: "automatic",
    color: "black",
    Mpg: 33,
    seat: 5,
  },
  {
    // TRUCK
    id: 2,
    carName: "2022 FORD F-150 XL",
    carPrice: 38998,
    range: 494.0,
    horsePower: 325,
    drive: "4wd",
    transmission: "automatic",
    color: "Green",
    Mpg: 20,
    seat: 5,
  },
  {
    // SUV
    id: 3,
    carName: "2023 Chevrolet Blazer",
    carPrice: 36495,
    range: 320,
    horsePower: 308,
    drive: "4wd",
    transmission: "automatic",
    color: "Brown",
    Mpg: 20,
    seat: 5,
  },
  {
    // CROSSOVER
    id: 4,
    carName: "2022 Mazda cx-3",
    carPrice: 21790,
    range: 368.3,
    horsePower: 148,
    drive: "2wd",
    transmission: "automatic",
    color: "Grey",
    Mpg: 29,
    seat: 5,
  },
];

//LISTENS FOR A CHANGE ON THE SORT

if (sortSelect) {
  sortSelect.addEventListener("change", () => {
    const selectedOption = sortSelect.value;
    populateTable(selectedOption);
  });
}

function handleOnLoad() {
  const selectedOption = sortSelect.value;
  populateTable(selectedOption);
}

//GETS CARS FROM DATABASE
async function getCars(selectedOption) {
  try {
    cars = [];
    const response = await fetch(url);
    const data = await response.json();

    // Sort the cars based on the selected option
    if (selectedOption === "high") {
      data.sort((a, b) => b.carPrice - a.carPrice);
    } else if (selectedOption === "low") {
      data.sort((a, b) => a.carPrice - b.carPrice);
    }

    data.forEach((car) => {
      carObj = {
        carType: car.carType,
        carImage: car.carImage,
        CarVIN: car.carVIN,
        carName: car.carName,
        carPrice: car.carPrice,
        shortDescrip: car.shortDescrip,
        range: car.carRange,
        horsePower: car.horsePower,
        drive: car.drive,
        transmission: car.transmission,
        color: car.color,
        mpg: car.mpg,
        seat: car.seat,
        isDeleted: car.isDeleted,
      };
      cars.push(carObj);
    });
  } catch (error) {
    console.error(error);
  }

  return cars;
}

//GETS SPECIFIC CAR FOR EDIT/DELETE
async function getCarById(vinID) {
  const response = await fetch(`${url}/${vinID}`);
  const carData = await response.json();
  return {
    carType: carData.carType,
    carImg: carData.carImage,
<<<<<<< HEAD
    vinID: carData.CarVIN,
=======
    vinID: carData.carVIN,
>>>>>>> 3cf5db59b191ec460d96747cce525483e6046603
    carName: carData.carName,
    carPrice: carData.carPrice,
    shortDesc: carData.shortDescrip,
    range: carData.carRange,
    horsePower: carData.horsePower,
    drive: carData.drive,
    transmission: carData.transmission,
    color: carData.color,
    Mpg: carData.mpg,
    seat: carData.seat,
    isDeleted: carData.isDeleted,
  };
}

//POPULATE HOME PAGE
async function populateTable(selectedOption) {
  tableBody.innerHTML = " ";

  const carsData = await getCars(selectedOption);
  console.log(carsData);

  for (let i = 0; i < carsData.length; i++) {
    if (carsData[i].isDeleted) {
      //IMG ROW
      const row = document.createElement("tr");
      const imgCell = document.createElement("td");
      const img = document.createElement("img");
      img.src = carsData[i].carImage;
      img.style.width = "420px";
      img.style.height = "250px";
      imgCell.appendChild(img);
      row.appendChild(imgCell);

      //NAME ROW
      const nameCell = document.createElement("td");
      const name = document.createElement("h1");
      name.textContent = carsData[i].carName;
      name.style.fontWeight = "bold";
      nameCell.appendChild(name);
      row.appendChild(nameCell);

      //DESCRIPTION ROW
      const descCell = document.createElement("td");
      const desc = document.createElement("p");
      desc.textContent = carsData[i].shortDescrip;
      descCell.appendChild(desc);
      row.appendChild(descCell);

      //PRICE
      const priceCell = document.createElement("td");
      const price = document.createElement("h2");
      price.textContent = "$" + carsData[i].carPrice;
      price.style.fontWeight = "bold";
      price.style.textAlign = "center";
      priceCell.appendChild(price);
      row.appendChild(priceCell);

      //DETAILS MODAL
      const detailsCell = document.createElement("td");
      const detailsButton = document.createElement("button");
      detailsButton.classList.add("btn-outline-primary");
      detailsButton.innerText = "View Details";
      detailsButton.addEventListener("click", () => {
        const dmodal = document.getElementById("detailsModal");

        const nameVal = document.getElementById("carName");
        nameVal.textContent = carsData[i].carName;
        const priceVal = document.getElementById("carPrice");
        priceVal.textContent = carsData[i].carPrice;
        const mpgVal = document.getElementById("Mpg");
        mpgVal.textContent = carsData[i].mpg;
        const rangeVal = document.getElementById("range");
        rangeVal.textContent = carsData[i].range;
        const horsePowerVal = document.getElementById("horsePower");
        horsePowerVal.textContent = carsData[i].horsePower;
        const driveVal = document.getElementById("drive");
        driveVal.textContent = carsData[i].drive;
        const transmissionVal = document.getElementById("transmission");
        transmissionVal.textContent = carsData[i].transmission;
        const colorVal = document.getElementById("color");
        colorVal.textContent = carsData[i].color;
        const seatVal = document.getElementById("seat");
        seatVal.textContent = carsData[i].seat;

        dmodal.classList.add("show");
        dmodal.style.display = "block";

        //PLACE COMPARE EVENT LISTENER HERE WHEN READY
        const compareButton = document.getElementById("compareButton");
<<<<<<< HEAD
=======

>>>>>>> 3cf5db59b191ec460d96747cce525483e6046603
        compareButton.addEventListener("click", () => {
          const eCar = carsData[i].vinID;
          // GONNA NEED A VARIABLE FOR TYPE OF CAR TO BE ABLE TO COMPARE TO GAS CAR
          dmodal.style.display = "none";
          dmodal.classList.remove("show");
        });
<<<<<<< HEAD

        const modalID = document.getElementById("detailsModal")
        closeButton(modalID)

=======
        const modalID = document.getElementById("detailsModal")
        closeButton(modalID)
>>>>>>> 3cf5db59b191ec460d96747cce525483e6046603
      });

      detailsCell.appendChild(detailsButton);
      row.appendChild(detailsCell);

      //AVAILABILITY MODAL
      const availabilityCell = document.createElement("td");
      const availabilityButton = document.createElement("button");
      availabilityButton.classList.add("btn-outline-primary");
      availabilityButton.innerText = "Check Availability";

      availabilityButton.addEventListener("click", () => {
<<<<<<< HEAD
        const amodal = document.getElementById("availModal");
        amodal.classList.add("show");
        amodal.style.display = "block";

        const submitRequest = document.getElementById("availSubmit");
        submitRequest.addEventListener("click", () => {
          const fNameInput = document.getElementById("firstName");
          const lNameInput = document.getElementById("lastName");
          const emailInput = document.getElementById("email");

          const id = carsData[i].vinID;

          amodal.style.display = "none";
          amodal.classList.remove("show");
          //CUSTOMER PUT FOR CAR REQUEST HERE
        
        });
        const modalID = document.getElementById("availModal")
        closeButton(modalID)

=======
       
        const amodal = document.getElementById("availModal");
        amodal.classList.add("show");
        amodal.style.display = "block";
        

        const submitRequest = document.getElementById("availSubmit");
        submitRequest.addEventListener("submit", async function(e) {
          e.preventDefault();
          const carId = await getCarById(vinID)
          const request = {
            car: carId,
            fNameInput: document.getElementById("firstName").value,
            lNameInput: document.getElementById("lastName").value,
            emailInput: document.getElementById("email").value
          }

          //CUSTOMER PUT FOR CAR REQUEST HERE
          fetch(`${requestUrl}/${request.car}`, {
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
            body: JSON.stringify(request),
          }).catch((error) => {
            debugger;
            console.log(error);
          });

          amodal.style.display = "none";
          amodal.classList.remove("show");

        });
      const modalID = document.getElementById("availModal")
      closeButton(modalID)
>>>>>>> 3cf5db59b191ec460d96747cce525483e6046603
      });
      availabilityCell.appendChild(availabilityButton);
      row.appendChild(availabilityCell);

      tableBody.appendChild(row);
    }
  }
<<<<<<< HEAD
}

function closeButton(modalID) {
  const closeButton = modalID.querySelector("#btn-close");

  // Remove any existing event listeners
  closeButton.removeEventListener("click", closeModal);

  // Add a new event listener to close the modal
  closeButton.addEventListener("click", closeModal);

  function closeModal() {
    modalID.classList.remove("show");
    modalID.style.display = "none";
  }
}


//ADD CAR IN ADMIN
async function addNewCar(event) {
  // form.addEventListener("submit", async function (e) {
  event.preventDefault();

  const newCar = {
    carImage: document.getElementById("car-img").value,
    carType: document.getElementById("car-type").value, //ADD A DROP DOWN SELECTION TO THE CAR FORM TO CHOOSE BETWEEN THE 4 TYPES
    carName: document.getElementById("car-name").value,
    shortDescrip: document.getElementById("short-desc").value,
    carPrice: document.getElementById("car-price").value,
    range: document.getElementById("travel-range").value,
    horsePower: document.getElementById("horse-power").value,
    drive: document.getElementById("drive").value,
    transmission: document.getElementById("transmission").value,
    mpg: document.getElementById("mpg").value,
    color: document.getElementById("car-color").value,
    seat: document.getElementById("car-seat").value,
  };
  cars.unshift(newCar);
  console.log(newCar);
  addCar(newCar);
  // blankFields();
}

//ADD CAR TO DATABASE
async function addCar(newCar) {
=======
}
function closeButton(modalID) {
  const closeButton = modalID.querySelector("#btn-close");
  closeButton.addEventListener("click", () => {
    modalID.classList.remove("show");
    modalID.style.display = "none";
  });
}


//ADD CAR IN ADMIN
async function addNewCar(event) {
  // form.addEventListener("submit", async function (e) {
  event.preventDefault();
  let fourWDRadio = document.getElementById("drive");
  let drive = "2wd";
  if (fourWDRadio.checked) {
    drive = "4wd";
  } else {
    drive = "2wd";
  }
  let autotransmission = document.getElementById("transmission");
  let transmission = "manual";
  if (autotransmission.checked) {
    transmission = "automatic";
  } else {
    transmission = "manual";
  }

  const newCar = {
    carVIN: 1,
    carImage: document.getElementById("car-img").value,
    carType: document.getElementById("car-type").value, //ADD A DROP DOWN SELECTION TO THE CAR FORM TO CHOOSE BETWEEN THE 4 TYPES
    carName: document.getElementById("car-name").value,
    shortDescrip: document.getElementById("short-desc").value,
    carPrice: parseInt(document.getElementById("car-price").value),
    carRange: parseInt(document.getElementById("travel-range").value),
    horsePower: parseInt(document.getElementById("horse-power").value),
    drive: drive,
    transmission: transmission,
    mpg: parseInt(document.getElementById("mpg").value),
    color: document.getElementById("car-color").value,
    seat: parseInt(document.getElementById("car-seat").value),
    isDeleted: false,
  };
  cars.unshift(newCar);
  // console.log(newCar);
  await addCar(newCar).then(
    setTimeout(() => {
      location.reload();
    }, 5000)
  );
  // addCar(newCar);
  // blankFields();
}

//ADD CAR TO DATABASE
async function addCar(newCar) {
  newCar.carVIN = -1;
  debugger;
>>>>>>> 3cf5db59b191ec460d96747cce525483e6046603
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCar),
<<<<<<< HEAD
  })
    .then((response) => {
      console.log(response);
      return response;
=======
  }).catch((error) => {
    debugger;
    console.log(error);
  });

  // fetch(url, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(newCar),
  // })
  //   .then((response) => {
  //     console.log(response);
  //     return response;
  //   })
  //   .then()
  //   .catch((error) => {
  //     console.log(error);
  //   });
}

//POPULATES THE ADMIN TABLE
async function populateAdmin() {
  let sortOption = "low";
  if (adminTableBody) {
    adminTableBody.innerHTML = " ";
  }
  const carsData = await getCars(sortOption);
  console.log(carsData);

  for (let i = 0; i < carsData.length; i++) {
    if (!carsData[i].isDeleted) {
      const row = document.createElement("tr");

      const name = document.createElement("input");
      name.value = carsData[i].carName;
      const desc = document.createElement("textarea");
      desc.value = carsData[i].shortDescrip;
      const price = document.createElement("input");
      price.value = carsData[i].carPrice;
      const mpg = document.createElement("input");
      mpg.value = carsData[i].mpg;
      const range = document.createElement("input");
      range.value = carsData[i].range;
      const horsePower = document.createElement("input");
      horsePower.value = carsData[i].horsePower;
      const drive = document.createElement("input");
      drive.value = carsData[i].drive;
      const transmission = document.createElement("input");
      transmission.value = carsData[i].transmission;
      const color = document.createElement("input");
      color.value = carsData[i].color;
      const seat = document.createElement("input");
      seat.value = carsData[i].seat;

      const imgCell = document.createElement("td");
      const img = document.createElement("img");
      img.src = carsData[i].carImage;
      imgCell.appendChild(img);
      row.appendChild(imgCell);

      const nameCell = document.createElement("td");
      const nameLabel = document.createElement("label");
      nameLabel.innerText = "Name:";
      const descLabel = document.createElement("label");
      descLabel.innerText = "Description:";
      nameCell.appendChild(nameLabel);
      nameCell.appendChild(name);
      nameCell.appendChild(descLabel);
      nameCell.appendChild(desc);
      row.appendChild(nameCell);

      const priceCell = document.createElement("td");
      const priceLabel = document.createElement("label");
      priceLabel.innerText = "Price:";
      const mpgLabel = document.createElement("label");
      mpgLabel.innerText = "MPG:";
      priceCell.appendChild(priceLabel);
      priceCell.appendChild(price);
      priceCell.appendChild(mpgLabel);
      priceCell.appendChild(mpg);
      row.appendChild(priceCell);

      const rangeCell = document.createElement("td");
      const rangeLabel = document.createElement("label");
      rangeLabel.innerText = "Range:";
      const hpLabel = document.createElement("label");
      hpLabel.innerText = "Horse Power:";
      rangeCell.appendChild(rangeLabel);
      rangeCell.appendChild(range);
      rangeCell.appendChild(hpLabel);
      rangeCell.appendChild(horsePower);
      row.appendChild(rangeCell);

      const driveCell = document.createElement("td");
      const driveLabel = document.createElement("label");
      driveLabel.innerText = "Drive:";
      const transLabel = document.createElement("label");
      transLabel.innerText = "Transmission:";
      driveCell.appendChild(driveLabel);
      driveCell.appendChild(drive);
      driveCell.appendChild(transLabel);
      driveCell.appendChild(transmission);
      row.appendChild(driveCell);

      const colorCell = document.createElement("td");
      const colorLabel = document.createElement("label");
      colorLabel.innerText = "Color:";
      const seatLabel = document.createElement("label");
      seatLabel.innerText = "Seats:";
      colorCell.appendChild(colorLabel);
      colorCell.appendChild(color);
      colorCell.appendChild(seatLabel);
      colorCell.appendChild(seat);
      row.appendChild(colorCell);

      const saveCell = document.createElement("td");
      const saveButton = document.createElement("button");
      saveButton.classList.add("btn-outline-primary");
      saveButton.innerText = "Save";
      saveButton.addEventListener("click", () => {
        const updatedCar = {
          carName: name.innerText,
          shortDescrip: desc.innerText,
          carRange: range.innerText,
          horsePower: horsePower.innerText,
          drive: drive.innerText,
          transmission: transmission.innerText,
          color: color.innerText,
          mpg: mpg.innerText,
          seat: seat.innerText,
          carPrice: price.innerText,
          carImage: img.src,
          carVIN: carsData[i].vinID,
          isDeleted: false,
        };
        editCar(updatedCar.vinID).then(
          setTimeout(() => {
            location.reload();
          }, 3000)
        );
      });
      saveCell.appendChild(saveButton);

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("btn-outline-danger");
      deleteButton.innerText = "Delete";
      deleteButton.addEventListener("click", () => {
        deleteCar(carsData[i].vinID).then(
          setTimeout(() => {
            location.reload();
          }, 3000)
        );
      });
      saveCell.appendChild(deleteButton);
      row.appendChild(saveCell);

      adminTableBody.appendChild(row);
    }
  }

  form.addEventListener("submit", addNewCar);
}

//EDIT A CAR
async function editCar(id) {
  const car = await getCarById(id);
  const type = "edit";

  if (!car) {
    console.error(`Car with ID ${id} not found`);
    return;
  }
  const index = cars.findIndex((car) => car.vinID === id);
  if (index >= 0) {
    cars[index].carType
    cars[index].carImage;
    cars[index].carName;
    cars[index].carPrice;
    cars[index].shortDescrip;
    cars[index].carRange;
    cars[index].horsePower;
    cars[index].drive;
    cars[index].transmission;
    cars[index].color;
    cars[index].mpg;
    cars[index].seat;
  }

  const updateImg = document.getElementById("Aimg");
  const updateName = document.getElementById("Aname");
  const updateShortDesc = document.getElementById("Ashort-desc");
  const updatePrice = document.getElementById("Aprice");
  const updateRange = document.getElementById("Arange");
  const updateHorsepower = document.getElementById("Ahorse-power");
  const updateDrive = document.getElementById("Adrive");
  const updateTrans = document.getElementById("Atransmission");
  const updateMpg = document.getElementById("Ampg");
  const updateColor = document.getElementById("Acar-color");
  const updateSeat = document.getElementById("Acar-seat");

  const updatedCar = {
    ...car,
    carImage: updateImg.value,
    carName: updateName.value,
    carPrice: updatePrice.value,
    shortDescrip: updateShortDesc.value,
    carRange: updateRange.value,
    horsePower: updateHorsepower.value,
    drive: updateDrive.value,
    transmission: updateTrans.value,
    color: updateColor.value,
    mpg: updateMpg.value,
    seat: updateSeat.value,
  };
  await updateCar(id, updatedCar, type);
}

//UPDATES THE CAR MODIFICATIONS
async function updateCar(id, car, type) {
  let updateObj = car;
  if (type === "edit") {
    updateObj = { ...car };
  } else if (type === "delete") {
    updateObj = { ...car, isDeleted: true };
  }

  fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateObj),
  })
    .then((response) => {
      console.log(response);
>>>>>>> 3cf5db59b191ec460d96747cce525483e6046603
    })
    .catch((error) => {
      console.log(error);
    });
}

<<<<<<< HEAD
//POPULATES THE ADMIN TABLE
async function populateAdmin() {
  let sortOption = "low";
  if (adminTableBody) {
    adminTableBody.innerHTML = " ";
  }
  const carsData = await getCars(sortOption);
  console.log(carsData);

  for (let i = 0; i < carsData.length; i++) {
    if (carsData[i].isDeleted) {
      const row = document.createElement("tr");
      row.style.width = "95%"

      const name = document.createElement("input");
      name.value = carsData[i].carName;
      const desc = document.createElement("textarea");
      desc.value = carsData[i].shortDescrip;
      const price = document.createElement("input");
      price.value = carsData[i].carPrice;
      const mpg = document.createElement("input");
      mpg.value = carsData[i].mpg;
      const range = document.createElement("input");
      range.value = carsData[i].range;
      const horsePower = document.createElement("input");
      horsePower.value = carsData[i].horsePower;
      const drive = document.createElement("input");
      drive.value = carsData[i].drive;
      const transmission = document.createElement("input");
      transmission.value = carsData[i].transmission;
      const color = document.createElement("input");
      color.value = carsData[i].color;
      const seat = document.createElement("input");
      seat.value = carsData[i].seat;

      const imgCell = document.createElement("td");
      const img = document.createElement("img");
      img.src = carsData[i].carImage;
      img.style.width = "200px";
      img.style.height = "150px";
      imgCell.appendChild(img);
      row.appendChild(imgCell);

      const nameCell = document.createElement("td");
      const nameLabel = document.createElement("label");
      nameLabel.innerText = "Name:";
      const descLabel = document.createElement("label");
      descLabel.innerText = "Description:";
      nameCell.appendChild(nameLabel);
      nameCell.appendChild(name);
      nameCell.appendChild(descLabel);
      nameCell.appendChild(desc);
      row.appendChild(nameCell);

      const priceCell = document.createElement("td");
      const priceLabel = document.createElement("label");
      priceLabel.innerText = "Price:";
      const mpgLabel = document.createElement("label");
      mpgLabel.innerText = "MPG:";
      priceCell.appendChild(priceLabel);
      priceCell.appendChild(price);
      priceCell.appendChild(mpgLabel);
      priceCell.appendChild(mpg);
      row.appendChild(priceCell);

      const rangeCell = document.createElement("td");
      const rangeLabel = document.createElement("label");
      rangeLabel.innerText = "Range:";
      const hpLabel = document.createElement("label");
      hpLabel.innerText = "Horse Power:";
      rangeCell.appendChild(rangeLabel);
      rangeCell.appendChild(range);
      rangeCell.appendChild(hpLabel);
      rangeCell.appendChild(horsePower);
      row.appendChild(rangeCell);

      const driveCell = document.createElement("td");
      const driveLabel = document.createElement("label");
      driveLabel.innerText = "Drive:";
      const transLabel = document.createElement("label");
      transLabel.innerText = "Transmission:";
      driveCell.appendChild(driveLabel);
      driveCell.appendChild(drive);
      driveCell.appendChild(transLabel);
      driveCell.appendChild(transmission);
      row.appendChild(driveCell);

      const colorCell = document.createElement("td");
      const colorLabel = document.createElement("label");
      colorLabel.innerText = "Color:";
      const seatLabel = document.createElement("label");
      seatLabel.innerText = "Seats:";
      colorCell.appendChild(colorLabel);
      colorCell.appendChild(color);
      colorCell.appendChild(seatLabel);
      colorCell.appendChild(seat);
      row.appendChild(colorCell);

      const saveCell = document.createElement("td");
      const saveButton = document.createElement("button");
      saveButton.classList.add("btn-primary");
      saveButton.style.marginRight = "12px"
      saveButton.innerText = "Save";
      saveButton.addEventListener("click", () => {
        const updatedCar = {
          carName: name.innerText,
          shortDescrip: desc.innerText,
          carRange: range.innerText,
          horsePower: horsePower.innerText,
          drive: drive.innerText,
          transmission: transmission.innerText,
          color: color.innerText,
          mpg: mpg.innerText,
          seat: seat.innerText,
          carPrice: price.innerText,
          carImage: img.src,
          CarVIN: carsData[i].vinID,
          isDeleted: false,
        };
        editCar(updatedCar.vinID).then(
          setTimeout(() => {
            location.reload();
          }, 3000)
        );
      });
      saveCell.appendChild(saveButton);

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("btn-outline-danger");
      deleteButton.innerHTML = 'Delete';
      deleteButton.style.marginRight = "5px"
      deleteButton.addEventListener("click", () => {
        deleteCar(carsData[i].vinID).then(
          setTimeout(() => {
            location.reload();
          }, 3000)
        );
      });
      saveCell.appendChild(deleteButton);
      row.appendChild(saveCell);

      adminTableBody.appendChild(row);
    }
  }

  form.addEventListener("submit", addNewCar);
}

//EDIT A CAR
async function editCar(id) {
  const car = await getCarById(id);
  const type = "edit";

  if (!car) {
    console.error(`Car with ID ${id} not found`);
    return;
  }
  const index = cars.findIndex((car) => car.vinID === id);
  if (index >= 0) {
    cars[index].carImg;
    cars[index].carName;
    cars[index].carPrice;
    cars[index].shortDesc;
    cars[index].range;
    cars[index].horsePower;
    cars[index].drive;
    cars[index].transmission;
    cars[index].color;
    cars[index].Mpg;
    cars[index].seat;
  }

  const updateImg = document.getElementById("Aimg");
  const updateName = document.getElementById("Aname");
  const updateShortDesc = document.getElementById("Ashort-desc");
  const updatePrice = document.getElementById("Aprice");
  const updateRange = document.getElementById("Arange");
  const updateHorsepower = document.getElementById("Ahorse-power");
  const updateDrive = document.getElementById("Adrive");
  const updateTrans = document.getElementById("Atransmission");
  const updateMpg = document.getElementById("Ampg");
  const updateColor = document.getElementById("Acar-color");
  const updateSeat = document.getElementById("Acar-seat");

  const updatedCar = {
    ...car,
    carImg: updateImg.value,
    carName: updateName.value,
    carPrice: updatePrice.value,
    shortDesc: updateShortDesc.value,
    range: updateRange.value,
    horsePower: updateHorsepower.value,
    drive: updateDrive.value,
    transmission: updateTrans.value,
    color: updateColor.value,
    Mpg: updateMpg.value,
    seat: updateSeat.value,
  };
  await updateCar(id, updatedCar, type);
}

//UPDATES THE CAR MODIFICATIONS
async function updateCar(id, car, type) {
  let updateObj = car;
  if (type === "edit") {
    updateObj = { ...car };
  } else if (type === "delete") {
    updateObj = { ...car, isDeleted: true };
  }

  fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateObj),
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

//DELETE A CAR
async function deleteCar(id) {
  const car = await getCarById(id);
  const type = "delete";

  if (!car) {
    console.error(`Car with ID ${id} not found`);
    return;
  }

  const index = cars.findIndex((car) => car.vinID === id);
  if (index >= 0) {
    cars[index].isDeleted = true;
  }
  const updatedCar = {
    ...car,
    isDeleted: true,
  };

  await updateCar(id, updatedCar, type);
}
=======
//DELETE A CAR
async function deleteCar(id) {
  const car = await getCarById(id);
  const type = "delete";

  if (!car) {
    console.error(`Car with ID ${id} not found`);
    return;
  }

  const index = cars.findIndex((car) => car.vinID === id);
  if (index >= 0) {
    cars[index].isDeleted = true;
  }
  const updatedCar = {
    ...car,
    isDeleted: true,
  };

  await updateCar(id, updatedCar, type);
}
>>>>>>> 3cf5db59b191ec460d96747cce525483e6046603
