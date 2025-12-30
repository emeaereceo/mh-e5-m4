const contenedor = document.getElementById("resultado");
const btnXHR = document.getElementById("cargar-xhr");
const btnFetch = document.getElementById("cargar-fetch");

const url = "https://jsonplaceholder.typicode.com/users";

function mostrarLoader() {
  const loader = document.getElementById("loader");
  loader.classList.remove("d-none");
}

function ocultarLoader() {
  const loader = document.getElementById("loader");
  loader.classList.add("d-none");
}

function limpiarResultado() {
  contenedor.innerHTML = "";
}

function crearUserCard(usuario) {
  // Columna responsive
  const col = document.createElement("div");
  col.className = "col-12 col-md-6 col-xl-3";

  // Card principal
  const card = document.createElement("div");
  card.className = "user-card  rounded-3 shadow h-100";

  // Imagen
  const imgWrapper = document.createElement("div");
  imgWrapper.className = "user-img";

  const img = document.createElement("img");
  img.src = `https://i.pravatar.cc/400?u=${usuario.id}`;
  img.alt = usuario.name;
  img.className = "img-fluid w-100";

  imgWrapper.appendChild(img);

  // Info
  const info = document.createElement("div");
  info.className = "user-info";

  const nombre = document.createElement("h5");
  nombre.textContent = usuario.name;

  const email = document.createElement("p");
  email.textContent = usuario.email;

  info.append(nombre, email);

  // Armar estructura
  card.append(imgWrapper, info);
  col.appendChild(card);

  return col;
}

function renderizarUsuarios(usuarios) {
  const fragmento = document.createDocumentFragment();

  usuarios.forEach((usuario) => {
    const card = crearUserCard(usuario);
    fragmento.appendChild(card);
  });

  contenedor.appendChild(fragmento);
}

function manejarError(error) {
  console.error("Error:", error);
  contenedor.textContent = "Ocurrió un error al cargar los datos.";
}

// XHR
btnXHR.addEventListener("click", () => {
  limpiarResultado();
  mostrarLoader();

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);

  xhr.onload = () => {
    ocultarLoader();
    if (xhr.status === 200) {
      console.log(xhr.responseText);
      const usuarios = JSON.parse(xhr.responseText);
      renderizarUsuarios(usuarios);
    } else {
      manejarError(xhr.status);
    }
  };

  xhr.onerror = () => {
    ocultarLoader();
    manejarError("Error de red");
  };

  xhr.send();
});

// Fetch
btnFetch.addEventListener("click", () => {
  limpiarResultado();
  mostrarLoader();

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      if (!res.ok) throw new Error(res.status);
      return res.json();
    })
    .then((usuarios) => {
      ocultarLoader();
      renderizarUsuarios(usuarios);
    })
    .catch(manejarError);
});
