console.log("Form");
const formData = { email: '', message: '' };
const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';

// 1. Заповнення полів із сховища при завантаженні сторінки
const savedData = localStorage.getItem(localStorageKey);
if (savedData) {
  const parsedData = JSON.parse(savedData);
  // Оновлюємо і об'єкт, і поля форми
  formData.email = parsedData.email || '';
  formData.message = parsedData.message || '';

  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
}

// 2. Відстеження введення даних (Делегування на рівні форми)
form.addEventListener('input', event => {
  formData[event.target.name] = event.target.value.trim();
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
});

// 3. Обробка відправки форми
form.addEventListener('submit', event => {
  event.preventDefault();

  // Перевірка на заповненість полів
  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }

  // Вивід результату, очищення сховища та форми
  console.log(formData);

  localStorage.removeItem(localStorageKey);
  formData.email = '';
  formData.message = '';
  form.reset();
});
