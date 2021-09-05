((d) => {
  const $btn_hamburger = d.querySelector(".btn-hamburguer");

  const $menu = d.getElementById("menu");
  $btn_hamburger.addEventListener("click", (e) => {
    $btn_hamburger.firstElementChild.classList.toggle("none");
    $btn_hamburger.lastElementChild.classList.toggle("none");
    $menu.classList.toggle("is-active");
  });

  d.addEventListener("click", (e) => {
    if (!e.target.matches(".menu>a")) {
      return;
    }

    $menu.classList.remove("is-active");
    $btn_hamburger.firstElementChild.classList.remove("none");
    $btn_hamburger.lastElementChild.classList.add("none");
  });
})(document);

((d) => {
  const $contact_form = d.querySelector(".contact-form"); //seleccionar el formulario
  const $loader = d.querySelector(".loader");
  const $response_text = d.querySelector(".status-text");
  let msg = "";
  let seEnvio = false;
  $contact_form.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch(`https://formsubmit.co/ajax/${$contact_form.email.value}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: new FormData($contact_form),
    })
      .then((response) =>
        response.ok ? response.json() : new Promise.reject(response)
      )
      .then((data) => {
        $loader.classList.remove("none");

        $response_text.classList.add("success");
        msg = data.message;
        seEnvio = true;
      })
      .catch((error) => {
        $response_text.classList.add("error");
        seEnvio = false;
        msg = error.message;
      })
      .finally(() => {
        setTimeout(() => {
          $loader.classList.add("none");
          if (seEnvio) {
            location.hash = "#agradecimiento";
          }
        }, 3000);

        setTimeout(() => {
          location.hash = "#cerrar";
        }, 4000);
      });
  });
})(document);
