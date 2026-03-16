<!-- Script página inicial -->
<script>
document.addEventListener("DOMContentLoaded", () => {

  const intro = document.getElementById("intro");
  const poster = document.getElementById("poster");
  const video = document.getElementById("introVideo");
  const site = document.getElementById("siteContent");

  const music = document.getElementById("bg-music");
  const audioBtn = document.getElementById("audio-toggle");
  const muteLine = document.getElementById("mute-line");

  /* Bloquear scroll */
  document.documentElement.classList.add("no-scroll");
  document.body.classList.add("no-scroll");

  let videoStarted = false;

  /* Função iniciar intro */
  function startIntro(e) {
    e.preventDefault(); // garante interação válida no mobile

    // Pré-carregar vídeo
    video.load();

    // Esperar até o primeiro frame estar pronto
    video.addEventListener("loadeddata", () => {
      poster.style.opacity = "0";  // esconde o poster
      video.style.opacity = "1";   // mostra vídeo

      video.play()
        .then(() => {
          videoStarted = true;
        })
        .catch(err => console.log("Falha ao iniciar vídeo:", err));
    }, { once: true });
  }

  /* Usar pointerdown para desktop e mobile */
  intro.addEventListener("pointerdown", startIntro, { once: true });

  /* Quando o vídeo termina */
  video.addEventListener("ended", () => {
    if (!videoStarted) return;

    intro.style.opacity = "0";

    setTimeout(() => {
      intro.style.display = "none";
      site.style.opacity = "1";

      /* Desbloquear scroll */
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");

      /* Começar música */
      music.volume = 0;
      music.play().catch(() => {});

      /* Fade-in música */
      let vol = 0;
      const fade = setInterval(() => {
        if (vol < 0.6) {
          vol += 0.02;
          music.volume = vol;
        } else {
          clearInterval(fade);
        }
      }, 120);

    }, 800);
  });

  /* Botão de áudio */
  audioBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play().catch(() => {});
      muteLine.style.display = "none";
    } else {
      music.pause();
      muteLine.style.display = "block";
    }
  });

});
</script>



<!-- Countdown Script -->
 
<script>
const weddingDate = new Date("July 24, 2027 12:00:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
}

updateCountdown();
setInterval(updateCountdown, 1000);
</script>

<!-- Função mudar de idioma Script -->

<script>
const btnPT = document.getElementById("btn-pt");
const btnFR = document.getElementById("btn-fr");

// Pega língua salva ou padrão
const lang = localStorage.getItem("lang") || "pt";
activateButton(lang);
setLanguage(lang);

function setLanguage(lang){
  document.querySelectorAll("[data-pt]").forEach(el => {
      el.textContent = el.dataset[lang];
  });

  // Atualiza placeholders
  document.querySelectorAll("[data-pt-placeholder]").forEach(el => {
    const placeholder = el.dataset[lang + "Placeholder"];
    if(placeholder) el.placeholder = placeholder;
  });
}

function activateButton(lang){
  window.lang2 = lang; // para outros scripts, como calendário

  if(lang === "pt"){
      btnPT.classList.add("bg-sage-dark","text-white");
      btnPT.classList.remove("text-sage-dark","hover:bg-sage/10");

      btnFR.classList.remove("bg-sage-dark","text-white");
      btnFR.classList.add("text-sage-dark","hover:bg-sage/10");
  } else if(lang === "fr"){
      btnFR.classList.add("bg-sage-dark","text-white");
      btnFR.classList.remove("text-sage-dark","hover:bg-sage/10");

      btnPT.classList.remove("bg-sage-dark","text-white");
      btnPT.classList.add("text-sage-dark","hover:bg-sage/10");
  }
}

// Clique nos botões salva no localStorage e muda a língua
btnPT.addEventListener("click", () => {
    localStorage.setItem("lang", "pt");
    setLanguage("pt");
    activateButton("pt");
});

btnFR.addEventListener("click", () => {
    localStorage.setItem("lang", "fr");
    setLanguage("fr");
    activateButton("fr");
});
</script>
 
<!-- Adicionar campos ao resposta  --> 
 
<script>
    const adultFields = document.getElementById('adult-fields');
    const childFields = document.getElementById('child-fields');
    const adultCountEl = document.getElementById('adult-count');
    const childCountEl = document.getElementById('child-count');
    const adultMinus = document.getElementById('adult-minus');
    const adultPlus = document.getElementById('adult-plus');
    const childMinus = document.getElementById('child-minus');
    const childPlus = document.getElementById('child-plus');
    const childControls = document.getElementById('child-controls');

    let adultCount = 1;
    let childCount = 1;

    function renderAdults(language = lang2) {
	  adultFields.innerHTML = '';

	  for (let i = 1; i <= adultCount; i++) {

		let phoneField = '';

		if (i === 1) {
		  phoneField = `
			<input type="tel" name="tel_${i}" 
			  data-pt-placeholder="Telemóvel"
			  data-fr-placeholder="Téléphone"
			  placeholder="${language === 'pt' ? 'Telemóvel' : 'Téléphone'}"
			  class="flex h-10 w-full rounded-md border px-3 py-2 text-base text-sage-dark placeholder:text-sage-dark/50 focus:border-[#c5a46d]"
			  required>
		  `;
		}

		adultFields.innerHTML += `
		  <div class="p-4 bg-[#c5a46d]/5 rounded-lg space-y-4 mt-2">
			<label class="text-sm text-sage-dark font-medium">
			  ${language === 'pt' ? `Pessoa ${i}` : `Personne ${i}`}
			</label>

			<input type="text" name="nome_adulto_${i}" 
			  data-pt-placeholder="Nome"
			  data-fr-placeholder="Nom"
			  placeholder="${language === 'pt' ? 'Nome' : 'Nom'}"
			  class="flex h-10 w-full rounded-md border px-3 py-2 text-base text-sage-dark placeholder:text-sage-dark/50 focus:border-[#c5a46d]"
			  required>

			${phoneField}

			<input type="text" name="alergias_adulto_${i}" 
			  data-pt-placeholder="Restrições alimentares, Alergias, etc."
			  data-fr-placeholder="Restrictions alimentaires, Allergies, etc."
			  placeholder="${language === 'pt' ? 'Restrições alimentares, Alergias, etc.' : 'Restrictions alimentaires, Allergies, etc.'}"
			  class="flex h-10 w-full rounded-md border px-3 py-2 text-base text-sage-dark placeholder:text-sage-dark/50 focus:border-[#c5a46d]">
		  </div>
		`;
	  }
	}

	function renderChildren(language = lang2) {
	  childFields.innerHTML = '';
	  for (let i = 1; i <= childCount; i++) {
		childFields.innerHTML += `
		  <div class="p-4 bg-[#c5a46d]/5 rounded-lg space-y-4 mt-2">
			<label class="text-sm text-sage-dark font-medium">
			  ${language === 'pt' ? `Criança ${i}` : `Enfant ${i}`}
			</label>
			<input type="text" name="nome_crianca_${i}" 
				   data-pt-placeholder="Nome"
				   data-fr-placeholder="Nom"
				   placeholder="${language === 'pt' ? 'Nome' : 'Nom'}"
				   class="flex h-10 w-full rounded-md border px-3 py-2 text-base text-sage-dark placeholder:text-sage-dark/50 focus:border-[#c5a46d]" required>
			<input type="number" name="idade_crianca_${i}" 
				   data-pt-placeholder="Idade"
				   data-fr-placeholder="Âge"
				   placeholder="${language === 'pt' ? 'Idade' : 'Âge'}"
				   class="flex h-10 w-full rounded-md border px-3 py-2 text-base text-sage-dark placeholder:text-sage-dark/50 focus:border-[#c5a46d]" required>
			<input type="text" name="alergias_crianca_${i}" 
				   data-pt-placeholder="Restrições alimentares, Alergias, etc."
				   data-fr-placeholder="Restrictions alimentaires, Allergies, etc."
				   placeholder="${language === 'pt' ? 'Restrições alimentares, Alergias, etc.' : 'Restrictions alimentaires, Allergies, etc.'}"
				   class="flex h-10 w-full rounded-md border px-3 py-2 text-base text-sage-dark placeholder:text-sage-dark/50 focus:border-[#c5a46d]">
		  </div>
		`;
	  }
	}

    adultMinus.addEventListener('click', () => {
      if(adultCount > 1) adultCount--;
      adultCountEl.textContent = adultCount;
      renderAdults();
    });

    adultPlus.addEventListener('click', () => {
      adultCount++;
      adultCountEl.textContent = adultCount;
      renderAdults();
    });

    childMinus.addEventListener('click', () => {
      if(childCount > 1) childCount--;
      childCountEl.textContent = childCount;
      renderChildren();
    });

    childPlus.addEventListener('click', () => {
      childCount++;
      childCountEl.textContent = childCount;
      renderChildren();
    });

    document.querySelectorAll('input[name="tem_criancas"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        if(e.target.value === 'yes') {
          childControls.style.display = 'block';
          renderChildren();
        } else {
          childControls.style.display = 'none';
          childFields.innerHTML = '';
          childCount = 1;
          childCountEl.textContent = 1;
        }
      });
    });

    // Inicial render
    renderAdults();
	
const form = document.getElementById("rsvp-form");
const submitBtn = document.getElementById("submit-btn");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  // Obtém o idioma atual do teu sistema
  const lang = window.lang2 || "pt";
  const sendingText = lang === "fr" ? "Envoi en cours" : "Enviando";

  // Bloqueia o botão e inicia animação de pontos
  let dots = 0;
  submitBtn.disabled = true;

  // Salva o texto original para fallback
  const originalText = submitBtn.dataset[lang] || submitBtn.textContent;
  submitBtn.textContent = sendingText;

  const interval = setInterval(() => {
    dots = (dots + 1) % 4;
    submitBtn.textContent = sendingText + ".".repeat(dots);
  }, 500);

  // Envia o formulário
  const formData = new FormData(this);

  fetch("https://script.google.com/macros/s/AKfycbwMaBgCa8maAXAUPJeRvc3_y9VbzDfo_cX-bbhkAvhiyYXcxcu39dJ01IwF3HOCask/exec", {
    method: "POST",
    body: formData
  })
	.then(() => {
	  clearInterval(interval);
	  // Redireciona para a página de obrigado
	  window.location.href = "obrigado.html#rsvp-confirmation";
	})
  .catch(() => {
    clearInterval(interval);
    submitBtn.disabled = false;
    submitBtn.textContent = originalText; // restaura texto original
    alert(lang === "fr" ? "Erreur lors de l'envoi de la réponse." : "Erro ao enviar resposta.");
  });
});
  </script>
