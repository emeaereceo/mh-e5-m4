const btn_xhr = document.getElementById("cargar-xhr");
const btn_fetch = document.getElementById("cargar-fetch");
const contenedor = document.getElementById("resultado");

const url = "https://jsonplaceholder.typicode.com/users";

function renderizarUsuarios(usuarios) {
  contenedor.innerHTML = "";
  usuarios.forEach((usuario) => {
    contenedor.innerHTML += `<p>${usuario.id} - ${usuario.name}</p>`;
  });
}

btn_xhr.addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);

  xhr.onload = () => {
    if (xhr.status === 200) {
      const usuarios = JSON.parse(xhr.responseText);
      renderizarUsuarios(usuarios);
    } else {
      console.log("error");
    }
  };

  xhr.onerror = () => {
    console.log("error", xhr.status);
  };

  xhr.send();
});

btn_fetch.addEventListener("click", () => {
  fetch(url)
    .then((res) => {
      // console.log(res);
      if (!res.ok) throw new Error(res.status);
      return res.json();
    })
    .then((usuarios) => {
      renderizarUsuarios(usuarios);
    })
    .catch((error) => {
      console.log(error.message);
    });
});
