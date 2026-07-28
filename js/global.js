let myVar = "ma variable";
myVar = "variable changée";

const myVar2 = "ma variable 2";

let isTrue = true;
let isFalse = false;


let chiffre1 = 4;
let chiffre2 = 3;

let test = 'test ' + myVar + 'value';
let test2 = `test ${myVar} dzqdqzd `;

// console.log(test2);
/*
if (chiffre1 <= 3) {
  console.log('condition est valide');
} else if (chiffre1 <= 4) {
  console.log('je passe la');
} else {
  console.log('condition pas valide')
}
*/

// tableaux 

let array = ['item 1', 'item 2', 'item 3', 'item 4'];
// console.log(array[3]);

// objets

let obj = {
  title: 'Mon titre',
  description: 'Ma description'
}

// console.log(obj.title, obj.description);

// les boucles, while, for, foreach
/*
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}

array.forEach(item => {
  console.log(item);
})

*/

// fonctions 

/*function myFunction(item, item2) {
  console.log(item, item2);
}*/

const myFunction = (item, item2) => {
  // console.log(item, item2);
}

myFunction('toto', 5);
myFunction('tata', 6);

const calcul = (nb1, nb2) => {
  return nb1 + nb1;
}

let result = calcul(4, 5);
// console.log(result);

// interagir avec le dom // methode, propriete, evement

// selectors
// let header = document.querySelector('.header');
// console.log(header);

// let grids = document.querySelectorAll('.grid');
/*
grids.forEach(grid => {
  grid.classList.add('titi');
  console.log(grid)
});
*/
// evenements les plus courants
/*
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM entièrement chargé et analysé");
});

header.addEventListener('click', (e) => {
  console.log(e);
});

header.addEventListener('mouseenter', (e) => {
  console.log('souris entre');
});*/

// insertion dom et navigation dans le dom

let div = document.createElement('div');
div.classList.add('top');
div.innerHTML = `<span>Top zone</span>`;
// console.log(header.nextElementSibling);

// fin de la théorie 

/* Menu mobile */

function menuMobile() {
  const btn = document.querySelector('.burger');
  const header = document.querySelector('.header');
  const links = document.querySelectorAll('.navbar a');

  btn.addEventListener('click', () => {
    header.classList.toggle('show-nav');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('show-nav');
    });
  });
}

menuMobile();

/* Porfolio */

function tabsFilters() {
  const tabs = document.querySelectorAll('.portfolio-filters a');
  const projets = document.querySelectorAll('.portfolio .card');

  const resetActiveLinks = () => {
    tabs.forEach(elem => {
      elem.classList.remove('active');
    })
  }

  const showProjets = (elem) => {
    console.log(elem);
    projets.forEach(projet => {

      let filter = projet.getAttribute('data-category');

      if (elem === 'all') {
        projet.parentNode.classList.remove('hide');
        return
      }

      console.log('tutu');
      // ne sera pas pris en compte !
      /*if (filter !== elem) {
        projet.parentNode.classList.add('hide');
      } else {
        projet.parentNode.classList.remove('hide');
      }*/

      // option pour les plus motivés - opérateur ternaire
      filter !== elem ? projet.parentNode.classList.add('hide') : projet.parentNode.classList.remove('hide');

    });
  }

  tabs.forEach(elem => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      let filter = elem.getAttribute('data-filter');
      showProjets(filter)
      resetActiveLinks();
      elem.classList.add('active');
    });
  })
}

tabsFilters()

function showProjectDetails() {
  const links = document.querySelectorAll('.card__link');
  const modals = document.querySelectorAll('.modal');
  const btns = document.querySelectorAll('.modal__close');

  const hideModals = () => {
    modals.forEach(modal => {
      modal.classList.remove('show');
    });
  }

  links.forEach(elem => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();

      document.querySelector(`[id=${elem.dataset.id}]`).classList.add('show');
    });
  });

  btns.forEach(btn => {
    btn.addEventListener('click', (event) => {
      hideModals();
    });
  });

}

showProjectDetails();

// effets

const observerIntersectionAnimation = () => {
  const sections = document.querySelectorAll('section');
  const skills = document.querySelectorAll('.skills .bar');

  sections.forEach((section, index) => {
    if (index === 0) return;
    section.style.opacity = "0";
    section.style.transition = "all 1.6s";
  });

  skills.forEach((elem, index) => {

    elem.style.width = "0";
    elem.style.transition = "all 1.6s";
  });

  let sectionObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let elem = entry.target;
        elem.style.opacity = 1;
      }
    });
  });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  let skillsObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let elem = entry.target;
        elem.style.width = elem.dataset.width + '%';
      }
    });
  });

  skills.forEach(skill => {
    skillsObserver.observe(skill);
  });
}

observerIntersectionAnimation();

/* Carte du parcours professionnel */

function initMap() {
  const mapElement = document.getElementById('map');
  if (!mapElement) return;

  const popupElement = document.getElementById('map-popup');
  const popup = new ol.Overlay({
    element: popupElement,
    positioning: 'bottom-center',
    offset: [0, -12],
    stopEvent: false,
  });

  const points = [
    {
      coords: [6.398747372410764, 46.488447808125834],
      employeur: "Commune d'Aubonne Services techniques",
      poste: 'Chargé de projet SIG',
      annees: '2024 -',
    },
    {
      coords: [6.634095069310552, 46.52481826281061],
      employeur: 'Direction générale du territoire et du logement (DGTL)',
      poste: 'Apprentissage + CDD 1 an',
      annees: '2019-2024',
    },
  ];

  const features = points.map(point => {
    const feature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat(point.coords)),
    });
    feature.set('info', point);
    return feature;
  });

  const vectorSource = new ol.source.Vector({ features });

  const vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: new ol.style.Style({
      image: new ol.style.Circle({
        radius: 8,
        fill: new ol.style.Fill({ color: '#e63946' }),
        stroke: new ol.style.Stroke({ color: '#ffffff', width: 2 }),
      }),
    }),
  });

  const map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({ source: new ol.source.OSM() }),
      vectorLayer,
    ],
    overlays: [popup],
    view: new ol.View({
      center: ol.proj.fromLonLat([6.5, 46.505]),
      zoom: 11,
    }),
  });

  map.getView().fit(vectorSource.getExtent(), { padding: [60, 60, 60, 60], maxZoom: 14 });

  map.on('click', (event) => {
    const feature = map.forEachFeatureAtPixel(event.pixel, feat => feat);

    if (feature) {
      const info = feature.get('info');
      popupElement.innerHTML = `<strong>${info.employeur}</strong><br>${info.poste}<br><em>${info.annees}</em>`;
      popup.setPosition(event.coordinate);
    } else {
      popupElement.innerHTML = '';
      popup.setPosition(undefined);
    }
  });

  map.on('pointermove', (event) => {
    const hit = map.hasFeatureAtPixel(event.pixel);
    map.getTargetElement().style.cursor = hit ? 'pointer' : '';
  });
}

initMap();


