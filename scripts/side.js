const sideEdit = document.querySelector('.side_edit');
const sideEditContainer = document.querySelector('.side_edit_configuration');
const showSide = document.querySelector('.show_side');
const sideAppSettings = document.querySelector('.side_app_settings');
const sideSettingsConfiguration = document.querySelector('.side_settings_configuration');
const sideContainer = document.querySelector('.side_container');

if (sideEdit && sideEditContainer) {
  sideEdit.addEventListener('click', () => {
    sideEditContainer.style.display = sideEditContainer.style.display === "flex" ? "none" : "flex";
    sideSettingsConfiguration.style.display = sideSettingsConfiguration.style.display === "none" ? "none" : "none";
    sideContainer.style.alignItems = 'flex-start';
  });
}
if (showSide && sideEditContainer) {
  showSide.addEventListener('click', () => {
    sideEditContainer.style.display = sideEditContainer.style.display === "none" ? "none" : "none";
    sideSettingsConfiguration.style.display = sideSettingsConfiguration.style.display === "none" ? "none" : "none";
  });
}
if (sideAppSettings && sideSettingsConfiguration) {
  sideAppSettings.addEventListener('click', () => {
    sideSettingsConfiguration.style.display = sideSettingsConfiguration.style.display === "flex" ? "none" : "flex";
    sideEditContainer.style.display = sideEditContainer.style.display === "none" ? "none" : "none";
    sideContainer.style.alignItems = 'flex-end';
  });
}

document.addEventListener('DOMContentLoaded', function() {
    var sideDiv = document.getElementById('side');
    var sideDivPosition = document.getElementById('side');
    sideDiv.style.right = '-90px'; // Начальное положение
    sideDivPosition.style.position = 'absolute'; // Начальное положение
  
    document.querySelector('.show_side').addEventListener('click', function() {
      sideDiv.style.right = (sideDiv.style.right === '0px') ? '-90px' : '0px';
    });
    document.body.style.overflow = 'hidden';
});

document.querySelector('.show_side').addEventListener('click', function() {
    var img = document.querySelector('.show_side_img');
    var isRotated = img.style.transform === 'rotate(180deg)';
    img.style.transform = isRotated ? 'rotate(0deg)' : 'rotate(180deg)';
});

document.addEventListener('DOMContentLoaded', function() {
  // Функция для переключения видимости div и сохранения состояния в localStorage
  function toggleDivVisibility(checkboxClass, divClass) {
      let checkbox = document.querySelector('.' + checkboxClass);
      let div = document.querySelector('.' + divClass);

      // Переключение видимости и сохранение состояния
      div.style.display = checkbox.checked ? 'flex' : 'none';
      localStorage.setItem(checkboxClass, checkbox.checked);
  }

  // Функция для восстановления состояния чекбокса из localStorage
  function restoreCheckboxState(checkboxClass) {
      let checkbox = document.querySelector('.' + checkboxClass);
      let savedState = localStorage.getItem(checkboxClass);

      // Установка состояния чекбокса исходя из сохраненных данных или по умолчанию
      if (savedState !== null) {
          checkbox.checked = (savedState === 'true');
      } else {
          // Активация определенных чекбоксов по умолчанию
          checkbox.checked = ['side_configuration_container_chekkbox_1', 'side_configuration_container_chekkbox_2', 'side_configuration_container_chekkbox_4', 'side_configuration_container_chekkbox_5', 'side_configuration_container_chekkbox_6', 'side_configuration_container_chekkbox_7'].includes(checkboxClass);
      }
  }

  // Установка обработчиков и восстановление состояний для каждой пары чекбокс/див
  let i = 1;
  while (document.querySelector('.side_configuration_container_chekkbox_' + i)) {
      let checkboxClass = 'side_configuration_container_chekkbox_' + i;
      let divClass = 'side_app_' + i;

      // Восстанавливаем состояние чекбокса
      restoreCheckboxState(checkboxClass);

      // Добавляем обработчик события изменения состояния чекбокса
      document.querySelector('.' + checkboxClass).addEventListener('change', function() {
          toggleDivVisibility(checkboxClass, divClass);
      });

      // Устанавливаем начальное состояние видимости
      toggleDivVisibility(checkboxClass, divClass);

      i++;
  }
});

// Функция для смены фонового изображения
function changeBackground(imageFile) {
  document.body.style.backgroundImage = `url('styles/backgrounds/${imageFile}')`;
  // Сохраняем выбор в localStorage
  localStorage.setItem('backgroundImage', imageFile);
}

// Восстановление фона при загрузке страницы
function restoreBackground() {
  const savedImage = localStorage.getItem('backgroundImage');
  if (savedImage) {
    document.body.style.backgroundImage = `url('styles/backgrounds/${savedImage}')`;
  }
}

// Добавление обработчиков событий
document.getElementById('side_wallpaper_1').addEventListener('click', function() {
  changeBackground('background1.png');
});
document.getElementById('side_wallpaper_2').addEventListener('click', function() {
  changeBackground('background2.png');
});
document.getElementById('side_wallpaper_3').addEventListener('click', function() {
  changeBackground('background3.png');
});

// ... добавьте обработчики для остальных изображений

// Вызов функции восстановления при загрузке страницы
document.addEventListener('DOMContentLoaded', restoreBackground);


// Добавьте аналогичные обработчики для остальных изображений


// Находим элемент с классом 'scrollable'
const scrollable = document.querySelector('.side_wallpaper_box');

// Добавляем обработчик события 'wheel' к этому элементу
scrollable.addEventListener('wheel', function(event) {
  // Проверяем, что прокрутка идет вертикально (deltaY)
  if (event.deltaY) {
    // Отменяем стандартное поведение прокрутки
    event.preventDefault();

    // Добавляем значение deltaY к scrollLeft для горизонтальной прокрутки
    this.scrollLeft += event.deltaY;
  }
});
