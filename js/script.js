const advContainer = document.querySelector(".advice-container");
const buttonAdv = document.querySelector(".advice-button")

// On click button
buttonAdv.addEventListener('click', async function () {

    // Render spinner
    renderSpinner(advContainer);

    // fetch data
    const advice = await getJSON(`https://api.adviceslip.com/advice`);

    // get markup
    const markup = getMarkup(advice.slip);

    // render data
    renderAdvice(advContainer, markup);
})


const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
};

const getJSON = async function (url) {
    try {
        const fetchAdv = await fetch(url);
    
        const res = await Promise.race([fetchAdv, timeout(10)]);
    
        const data = await res.json();
    
        if (!res.ok) throw new Error (`${data.message} (${res.status})`);
        return data;
    } catch(err) {
        throw err;
    }
};

const renderSpinner = function (container) {
    container.innerHTML = "";
    const markup = `
      <div class="spinner">
        <svg>
          <use href="./images/icons.svg#icon-loader"></use>
        </svg>
      </div>
    `
    container.insertAdjacentHTML('afterbegin', markup);
};

const getMarkup = function(advice) {
    return `
    <h2 class="advice__id">Advice #${advice.id}</h2>
    <blockquote class="advice__text">"${advice.advice}"</blockquote>
    `
}

const renderAdvice = function(container, markup) {
    container.innerHTML = "";
    container.insertAdjacentHTML('afterbegin', markup);
}