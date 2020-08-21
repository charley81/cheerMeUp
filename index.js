// drag logo animation effect from popmotion
const { styler, spring, listen, pointer, value } = window.popmotion;

const ball = document.querySelector('.logo');
const divStyler = styler(ball);
const ballXY = value({ x: 0, y: 0 }, divStyler.set);

listen(ball, 'mousedown touchstart').start(e => {
  e.preventDefault();
  pointer(ballXY.get()).start(ballXY);
});

listen(document, 'mouseup touchend').start(() => {
  spring({
    from: ballXY.get(),
    velocity: ballXY.getVelocity(),
    to: { x: 0, y: 0 },
    stiffness: 200,
    // mass: 1,
    // damping: 10
  }).start(ballXY);
});

// Fetch dog image
const dogImg = document.querySelector('.dog-img img');
const nextBtn = document.querySelector('.next');
const loading = document.querySelector('.loading');

const URL = 'https://dog.ceo/api/breeds/image/random';

const fetchDog = () => {
  dogImg.src = '';
  loading.style.display = 'block';
  fetch(URL)
    .then(res => res.json())
    .then(data => {
      loading.style.display = 'none';
      dogImg.src = data.message;
    });
};

nextBtn.addEventListener('click', fetchDog);
