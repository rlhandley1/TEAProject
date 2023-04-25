let url = "https://localhost:7012/api/Car"; //fill this link with ours
let requestUrl = "https://localhost:7012/api/carRequest";
const sortSelect = document.getElementById("sortSelect");
const form = document.getElementById("new-car");
const tableBody = document.getElementById("carTableBody");
const adminTableBody = document.getElementById("AdminTableBody");
let cars = [];
let requests = [];
// let sortOption = "high";
let gasCar = [
  {
    // SEDAN
    id: 1,
    img: "https://content.homenetiol.com/2000292/2192701/0x0/stock_images/8/cc_2023HYC02_01_640/cc_2023HYC020029_01_640_S3B.jpg",
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
    img: "https://2020pickuptrucks.com/wp-content/uploads/2021/10/2022-Ford-F-150-Diesel.jpeg",
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
    img: "https://inv.assets.sincrod.com/GM_VIVP/deg01/2023/1NT26/1NT26__0HD/GLY_060_0HD_0ST_1NF_2NF_2ST_3ST_4HT_4ST_5FC_5ST_6X1_7X1_8X2_9X2_A2X_AAB_ABD_AG2_AKO_AL0_AL9_AR9_ASV_AT8_ATH_AXP_AYG_BTV_C59_CAV_CJ2_CTT_CWA_DCP_DM8_DP6_DRZ_EB1_EF7_ENL_EPM_F_F48_FE2_FHO_FXC_HAX_HS1_IOT_J23_J61_K1O_K4C_KA1_KA6_KI3_KI6_KL9_KRV_KSG_KU9_KW7_LGX_M3V_MAH_MCR_MCZ_N38_N57_NC7_NE1_NE8_NUC_PDF_PDG_PPW_PRF_PZ8_QNU_R7X_R9N_RIA_RSR_RTI_SAL_SLM_SUU_T4L_T7E_T7Z_TC2_TDM_TQ5_TSQ_U05_U2K_U80_UD7_UE1_UE4_UEU_UFG_UG1_UGN_UHS_UHX_UKC_UKJ_UQA_URC_USS_UV2_V08_V33_V64_V8D_V92_VHM_VK3_VRG_VRH_VRK_VRL_VRM_VRN_VRR_VRS_VT7_VTI_VV4_VY7_W2D_WMX_WPP_XL8_YM8_ZCD_ZL8_0HDgmds10.jpg",
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
    img: "https://hips.hearstapps.com/hmg-prod/images/2022-cx-30-2-5-s-carbon-edition-01-1641309026.jpg?crop=0.827xw:0.735xh;0.125xw,0.211xh&resize=1200:*",
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
        carVIN: car.carVIN,
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
    vinID: carData.carVIN,
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
    if (!carsData[i].isDeleted) {
      //IMG ROW
      const row = document.createElement("tr");
      const imgCell = document.createElement("td");
      const img = document.createElement("img");
      img.src = carsData[i].carImage;
      img.style.width = "350px";
      img.style.height = "200px";
      imgCell.appendChild(img);
      row.appendChild(imgCell);

      // const carImage = document.getElementById("img");
      // carImage.src = img.src;

      //NAME ROW
      const nameCell = document.createElement("td");
      const name = document.createElement("h2");
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
      // detailsButton.classList.add("btn-outline-primary");
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

        compareButton.addEventListener("click", function (event) {
          event.preventDefault();
          let id = carsData[i].carVIN;
          populateCalculator(id);
          movePage();
          dmodal.style.display = "none";
          dmodal.classList.remove("show");
        });
        const modalID = document.getElementById("detailsModal");
        closeButton(modalID, "#btn-close");
      });

      detailsCell.appendChild(detailsButton);
      row.appendChild(detailsCell);

      //AVAILABILITY MODAL
      const availabilityCell = document.createElement("td");
      const availabilityButton = document.createElement("button");
      // availabilityButton.classList.add("btn-outline-primary");
      availabilityButton.innerText = "Check Availability";

      availabilityButton.addEventListener("click", () => {
        const amodal = document.getElementById("availModal");
        amodal.classList.add("show");
        amodal.style.display = "block";

        const submitRequest = document.getElementById("availSubmit");

        submitRequest.addEventListener("click", async function (e) {
          e.preventDefault();
          const fNameInput = document.getElementById("firstName");
          const lNameInput = document.getElementById("lastName");
          const emailInput = document.getElementById("email");

          const id = carsData[i].vinID;

          const availBody = {
            vinId: id,
            firstName: fNameInput,
            lastName: lNameInput,
            email: emailInput,
          };

          fetch(requestUrl, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(availBody),
          })
            .then((response) => {
              console.log(response);
              return response;
            })
            .catch((error) => {
              console.log(error);
            });

          fNameInput.value = " ";
          lNameInput.value = " ";
          emailInput.value = " ";

          amodal.style.display = "none";
          amodal.classList.remove("show");
        });
        const modalID = document.getElementById("availModal");
        console.log(modalID);
        closeButton(modalID, "#btn-clos");
      });
      availabilityCell.appendChild(availabilityButton);
      row.appendChild(availabilityCell);
      tableBody.appendChild(row);
    }
  }
}

function closeButton(modalID, bID) {
  const closeButton = modalID.querySelector(bID);
  console.log(bID);

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
}

//ADD CAR TO DATABASE
async function addCar(newCar) {
  newCar.carVIN = -1;
  debugger;
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCar),
  }).catch((error) => {
    debugger;
    console.log(error);
  });
}
//REDIRECT TO CALCULATOR
function movePage() {
  window.location.href = "calculator.html";
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
      row.style.width = "90%";
      

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
      saveButton.classList.add("btn-outline-primary");
      saveButton.style.marginRight = "15px";
      saveButton.innerText = "Save";
      saveButton.addEventListener("click", () => {
        const updatedCar = {
          ...carsData[i],
          carName: name.value,
          shortDescrip: desc.value,
          carRange: range.value,
          horsePower: horsePower.value,
          drive: drive.value,
          transmission: transmission.value,
          color: color.value,
          mpg: mpg.value,
          seat: seat.value,
          carPrice: price.value,
        };
        editCar(updatedCar, carsData[i].carVIN).then(
          setTimeout(() => {
            location.reload();
          }, 3000)
        );
      });
      saveCell.appendChild(saveButton);

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("btn-outline-danger");
      deleteButton.style.marginRight = "8px";
      deleteButton.innerText = "Delete";
      deleteButton.addEventListener("click", () => {
        deleteCar(carsData[i].carVIN).then(() => {
          setTimeout(() => {
            location.reload();
          }, 3000);
        });
      });
      saveCell.appendChild(deleteButton);
      row.appendChild(saveCell);

      adminTableBody.appendChild(row);
    }
  }
  form.addEventListener("submit", addNewCar);
}

//EDIT CAR
async function editCar(updatedCar, id) {
  let car = 0;

  for (var i = 0; i < cars.length; i++) {
    if (cars[i].carVIN == id) {
      car = {
        ...updatedCar,
      };
      console.log(updatedCar);
    }
  }
  await fetch(url + "/" + id, {
    method: "PUT",
    headers: {
      accept: "*/*",
      "content-type": "application/json",
    },
    body: JSON.stringify(car),
  });
}
//DELETE CAR
async function deleteCar(id) {
  let car = 0;
  for (var i = 0; i < cars.length; i++) {
    if (cars[i].carVIN == id) {
      car = {
        ...cars[i],
        isDeleted: !cars[i].isDeleted,
      };
      console.log(car);
    }
  }
  await fetch(url + "/" + id, {
    method: "PUT",
    headers: {
      accept: "*/*",
      "content-type": "application/json",
    },
    body: JSON.stringify(car),
  });
}

async function populateCalculator(carVIN) {
  let gasCarForElectricCar;
  let electricCar = 0;
  for (var i = 0; i < cars.length; i++) {
    if (cars[i].carVIN == carVIN) {
      electricCar = {
        ...cars[i],
      };
    }
  }

  if (electricCar.carType === "SUV") {
    gasCarForElectricCar = gasCar.find((car) => gasCar.id === 3); // SUV gas car
  } else if (electricCar.carType === "Crossover") {
    gasCarForElectricCar = gasCar.find((car) => gasCar.id === 4); // Crossover gas car
  } else if (electricCar.carType === "Truck") {
    gasCarForElectricCar = gasCar.find((car) => gasCar.id === 2); // Truck gas car
  } else if (electricCar.carType === "Sedan") {
    gasCarForElectricCar = gasCar.find((car) => gasCar.id === 1); // Sedan gas car
  }

  let gasTable = document.getElementById("gasTable");
  gasTable.innerHTML = "";

  // const row = document.createElement("tr");
  // const imgCell = document.createElement("td");
  // const gImg = document.createElement("img");
  // gImg.src = gasCar[i].img;
  // gImg.style.width = "420px";
  // gImg.style.height = "250px";
  // imgCell.appendChild(gImg);
  // row.appendChild(imgCell);

  // const nameCell = document.createElement("td");
  // const name = document.createElement("h1");
  // name.textContent = gasCar[i].carName;
  // name.style.fontWeight = "bold";
  // nameCell.appendChild(name);
  // row.appendChild(nameCell);

  // gasTable.appendChild(row)
}
