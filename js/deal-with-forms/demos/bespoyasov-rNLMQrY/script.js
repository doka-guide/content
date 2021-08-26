function toggleLoader() {
  const loader = document.getElementById("loader");
  loader.classList.toggle("hidden");
}

function onSuccess(formNode) {
  alert("Your application successfully sent!");
  formNode.classList.toggle("hidden");
}

function onError(error) {
  alert(error.message);
}

function serializeForm(formNode) {
  const data = new FormData(formNode);
  return data;
}

function checkValidity(event) {
  const formNode = event.target.form;
  const isValid = formNode.checkValidity();
  formNode.querySelector("button").disabled = !isValid;
}

async function sendData(data) {
  return await fetch("/api/apply/", {
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    body: data,
  });
  
  // Чтобы проверить, как работает 
  // обработка ответа, можно использовать 
  // поддельный ответ от сервера:
  
  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve({
  //       status: 400,
  //       error: {
  //         message: 'Something went wrong!'
  //       }
  //     })
  //   })
  // })
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const data = serializeForm(event.target);

  toggleLoader();
  const { status, error } = await sendData(data);
  toggleLoader();

  if (status === 200) onSuccess(event.target);
  else onError(error);
}

const applicantForm = document.getElementById("marsOnce");
applicantForm.addEventListener("submit", handleFormSubmit);
applicantForm.addEventListener("input", checkValidity);

applicantForm.querySelector('button').disabled = true