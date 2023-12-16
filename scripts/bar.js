document.addEventListener('DOMContentLoaded', () => {
  const add = document.querySelector('.add');
  const addContainer = document.querySelector('.add_container');
  const createFlow = document.querySelector('.create_flow');
  const flowConfiguration = document.querySelector('.flow_configuration');
  const appBtn = document.querySelector('.add_btn_app');
  const appConfiguration = document.querySelector('.app_configuration');
  const flowCenter = document.querySelector('.flow_center');
  const flowContainer = document.querySelector('.flow_container');
  const addFlowButton = document.querySelector('.add_flow_active');
  const DeleteFlowButton = document.querySelector('.delete_flow_active');
  const flowInput = document.querySelector('.flow_input');
  let flowCounter = JSON.parse(localStorage.getItem('flowCounter')) || 1;
  let flowAppCounter = JSON.parse(localStorage.getItem('flowAppCounter')) || 1;
  
  if (add && addContainer) {
    add.addEventListener('click', () => {
      addContainer.style.display = addContainer.style.display === "flex" ? "none" : "flex";
    });
  }

  if (DeleteFlowButton && flowConfiguration) {
    DeleteFlowButton.addEventListener('click', () => {
      flowConfiguration.style.display = flowConfiguration.style.display === "flex" ? "none" : "flex";
    });
  }

  if (createFlow) {
    createFlow.addEventListener('click', () => {
      // Loop through a predefined number of configurations
      for (let i = 1; i <= 8; i++) {
        document.querySelectorAll(`.app_configuration_${i}`).forEach(config => {
          if (config.style.display === 'flex') {
            config.style.display = 'none';
          }
        });
      }
  
      // Existing logic for handling createFlow click
      if (flowConfiguration) {
        flowConfiguration.style.display = flowConfiguration.style.display === "flex" ? "none" : "flex";
      }
    });
  }
  

  document.body.addEventListener('click', function(e) {
    if (e.target && e.target.matches('[class^="add_btn_app_"]')) {
      const flowNumber = e.target.className.match(/add_btn_app_(\d+)/)[1];
      toggleAppConfiguration(flowNumber);
    }
    if (e.target && e.target.matches('[class^="delete_app_active_"]')) {
      const flowNumber = e.target.className.match(/delete_app_active_(\d+)/)[1];
      const targetAppConfiguration = document.querySelector(`.app_configuration_${flowNumber}`);
      if (targetAppConfiguration) {
        targetAppConfiguration.style.display = 'none';
      }
    }
    
    if (e.target && e.target.matches('[class^="add_app_active_"]')) {
      // Получаем номер flow из класса кнопки
      const flowNumber = e.target.className.match(/add_app_active_(\d+)/)[1];
      
      // Получаем данные из соответствующих полей ввода
      const nameInput = document.querySelector(`.app_input_name_${flowNumber}`);
      const urlInput = document.querySelector(`.app_input_url_${flowNumber}`);
      
      if (nameInput && urlInput) {
        const name = nameInput.value.trim();
        const url = urlInput.value.trim();
        
        // Создаем новый app в соответствующем контейнере
        if (name && url) {
          addApp(name, url, flowNumber);
          // Очистка полей ввода
          nameInput.value = '';
          urlInput.value = '';
        }
      }
    }
  });

  // Функция для добавления нового сайта
  function getFaviconUrl(url) {
    try {
      var hostname = new URL(url).hostname;
      return `https://api.faviconkit.com/${hostname}/64`;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  
  // Функция для добавления нового сайта
  function addApp(name, url, flowNumber, saveToLocalStorage = true) {
    const appContainer = document.querySelector(`.app_container_${flowNumber}`);
    if (appContainer) {
      const appDiv = document.createElement('div');
      appDiv.className = 'app';
  
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
  
      const img = document.createElement('img');
      // Использование функции getFaviconUrl для установки src изображения
      const faviconUrl = getFaviconUrl(url);
      if (faviconUrl) {
        img.src = faviconUrl;
      }
      
      link.appendChild(img);
  
      const appValueDiv = document.createElement('div');
      appValueDiv.className = 'app_value';
      appValueDiv.textContent = name;
      appValueDiv.style.display = 'none'; // Скрыть текст по умолчанию
      link.appendChild(appValueDiv);
  
      appDiv.appendChild(link);
  
      // Добавление кнопки удаления
      const deleteButton = document.createElement('button');
      deleteButton.className = `delete_button_app_${flowNumber}`;
      deleteButton.style.display = 'none'; // Скрыть кнопку по умолчанию
      deleteButton.onclick = function() { deleteApp(appDiv, name, url, flowNumber); };
  
      // Создание элемента img и добавление его в кнопку
      const deleteImage = document.createElement('img');
      deleteImage.src = 'img/delete_app_img.png'; // Укажите правильный путь к вашему изображению
      deleteButton.appendChild(deleteImage);
  
      appDiv.appendChild(deleteButton);
      appContainer.appendChild(appDiv);
  
      // Обработчики событий для показа/скрытия кнопки удаления и текста app_value, применяемые к appDiv
      appDiv.addEventListener('mouseover', function() {
        deleteButton.style.display = 'flex';
        appValueDiv.style.display = 'flex';
      });
      appDiv.addEventListener('mouseout', function() {
        deleteButton.style.display = 'none';
        appValueDiv.style.display = 'none';
      });
  
      if (saveToLocalStorage) {
        saveAppDataToLocalStorage(name, url, flowNumber);
      }
    }
  }
  
  
  function deleteApp(appElement, name, url, flowNumber) {
    // Удалить элемент app из DOM
    appElement.remove();
  
    // Обновить данные в локальном хранилище
    let flowsData = JSON.parse(localStorage.getItem('flowsData')) || {};
    if (flowsData[`flow_app_${flowNumber}`]) {
      flowsData[`flow_app_${flowNumber}`] = flowsData[`flow_app_${flowNumber}`].filter(app => app.name !== name || app.url !== url);
      localStorage.setItem('flowsData', JSON.stringify(flowsData));
    }
  }

  function saveAppDataToLocalStorage(name, url, flowNumber) {
    // Получаем текущие данные из локального хранилища или создаем новый объект, если данных нет
    let flowsData = JSON.parse(localStorage.getItem('flowsData')) || {};
    
    // Добавляем данные о новом сайте в соответствующий flow
    if (!flowsData[`flow_app_${flowNumber}`]) {
      flowsData[`flow_app_${flowNumber}`] = [];
    }
    flowsData[`flow_app_${flowNumber}`].push({ name, url });

    // Сохраняем обновленные данные обратно в локальное хранилище
    localStorage.setItem('flowsData', JSON.stringify(flowsData));
  }

  function handleAddButtonAppClick(button) {
    // Логика обработки события для кнопки add_btn_app
    // Например, показать или скрыть конфигурацию приложения
    appConfiguration.style.display = appConfiguration.style.display === "flex" ? "none" : "flex";
  }
  
  function createFlowElement(text, counter) {
    const flowDiv = document.createElement('div');
    flowDiv.className = `flow_${counter}`; // Используем переданный счетчик для класса flow
  
    const flowContent = document.createElement('p');
    flowContent.textContent = text;
    flowDiv.appendChild(flowContent);
  
    // Create a div to hold the buttons
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'edit_buttons';
  
    // Create and append the buttons to the buttonsDiv
    // Обратите внимание, что теперь мы передаем counter в createButton для создания уникального класса
    const editButton = createButton('Edit', 'edit_btn_app', counter);
    const deleteButton = createButton('Delete', 'delete_btn_app', counter);
    const addButton = createButton('Add', `add_btn_app_${counter}`, counter); // Уникальный класс для кнопки Add
    addButton.onclick = function() { toggleAppConfiguration(counter); };
    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(deleteButton);
    buttonsDiv.appendChild(addButton);
  
    // Append the buttonsDiv to the flowDiv
    flowDiv.appendChild(buttonsDiv);
  
    return flowDiv;
  }
  function toggleAppConfiguration(counter) {
    if (flowConfiguration && flowConfiguration.style.display === "flex") {
      flowConfiguration.style.display = "none";
    }
    // Находим все дивы конфигурации и скрываем их
    const allAppConfigurations = document.querySelectorAll(`.app_configuration`);
    allAppConfigurations.forEach(div => {
      div.style.display = 'none';
    });
  
    // Отображаем нужный див конфигурации
    const targetAppConfiguration = document.querySelector(`.app_configuration_${counter}`);
    if (targetAppConfiguration) {
      targetAppConfiguration.style.display = 'flex';
    }
  }

  // Функция для удаления flow и соответствующего flow_app
  function deleteFlow(flowNumber) {
    flowNumber = parseInt(flowNumber, 10);
  
    // Удаление элементов из DOM.
    const flowDiv = document.querySelector(`.flow_${flowNumber}`);
    const flowAppDiv = document.querySelector(`.flow_app_${flowNumber}`);
    if (flowDiv) flowDiv.remove();
    if (flowAppDiv) {
      const lineElement = flowNumber === 1 ? flowAppDiv.nextElementSibling : flowAppDiv.previousElementSibling;
      if (lineElement && lineElement.classList.contains('line_horizontal')) {
        lineElement.remove();
      }
      flowAppDiv.remove();
    }
  
    // Обновление локального хранилища.
    let flows = JSON.parse(localStorage.getItem('flows')) || [];
    let flowsData = JSON.parse(localStorage.getItem('flowsData')) || {};
  
    // Удаление данных текущего flow.
    if (flowsData[`flow_app_${flowNumber}`]) {
      delete flowsData[`flow_app_${flowNumber}`];
    }
  
    // Обновление индексов для последующих flow_app_N.
    for (let i = flowNumber + 1; flowsData[`flow_app_${i}`]; i++) {
      flowsData[`flow_app_${i - 1}`] = flowsData[`flow_app_${i}`];
      delete flowsData[`flow_app_${i}`];
    }
  
    // Обновление массива flows.
    const flowIndex = flows.indexOf(flowDiv.querySelector('p').textContent);
    if (flowIndex !== -1) {
      flows.splice(flowIndex, 1);
    }
  
    // Сохранение обновленных данных в локальное хранилище.
    localStorage.setItem('flows', JSON.stringify(flows));
    localStorage.setItem('flowsData', JSON.stringify(flowsData));
  
    // Перезагрузка данных из локального хранилища.
    loadFlowsFromLocalStorage();
    loadAppsFromLocalStorage();
  }
  
  
  
  // Функция для редактирования текста в flow
  function editFlowText(flowNumber) {
    const flowDiv = document.querySelector(`.flow_${flowNumber}`);
    const flowContent = flowDiv.querySelector('p'); // Получаем тег <p> внутри flowDiv
    const appNameDiv = document.querySelector(`.flow_app_${flowNumber} .app_name p`); // Получаем тег <p> внутри app_name
    if (flowDiv && appNameDiv) {
      const currentText = flowContent.textContent;
      const newText = prompt("Edit text:", currentText);
  
      if (newText !== null && newText !== currentText) {
        flowContent.textContent = newText; // Обновляем текст в flowDiv
        appNameDiv.textContent = newText; // Обновляем текст в appNameDiv
  
        // Обновляем данные в localStorage
        updateFlowInLocalStorage(flowNumber, newText);
      }
    }
  }
  
  function updateFlowInLocalStorage(flowNumber, newText) {
    let flows = JSON.parse(localStorage.getItem('flows')) || [];
    if (flowNumber > 0 && flowNumber <= flows.length) {
      flows[flowNumber - 1] = newText; // Обновляем текст в массиве flows
      localStorage.setItem('flows', JSON.stringify(flows));
    }
  }

  // Функция для создания кнопок с изображениями вместо текста
  function createButton(action, className, counter) {
    const button = document.createElement('button');
    button.className = className;

    let imgPath;
    switch(action) {
      case 'Edit':
        imgPath = 'img/edit_flow_img.png'; // путь к изображению для кнопки редактирования
        break;
      case 'Delete':
        imgPath = 'img/delete_flow_img.png'; // путь к изображению для кнопки удаления
        break;
      case 'Add':
        imgPath = 'img/add_flow_img.png'; // путь к изображению для кнопки добавления
        break;
      default:
        imgPath = ''; // или какой-то путь по умолчанию
    }

    const img = document.createElement('img');
    img.src = imgPath;
    button.appendChild(img);

    // Добавление обработчиков событий для кнопок
    if (className.includes('delete_btn_app')) {
      button.addEventListener('click', () => deleteFlow(counter));
    } else if (className.includes('edit_btn_app')) {
      button.addEventListener('click', () => editFlowText(counter));
    } else if (className.includes('add_btn_app')) {
      button.onclick = function() { toggleAppConfiguration(counter); };
    }

    return button;
  }

  function addFlow(text) {
    const flowDiv = createFlowElement(text, flowCounter);
    flowCenter.appendChild(flowDiv);
    addFlowToContainer(text, flowAppCounter);
    saveFlowToLocalStorage(text, flowAppCounter); // Используем flowAppCounter как аргумент
    flowCounter++;
    flowAppCounter++;
  }

  function addFlowToContainer(text, counter) {
    // Создание и добавление элемента line, если это не первый flow
    if (counter > 1) {
      const lineDiv = document.createElement('div');
      lineDiv.className = 'line_horizontal';
      flowContainer.appendChild(lineDiv);
    }
  
    const flowContainerDiv = document.createElement('div');
    flowContainerDiv.className = `flow_app_${counter}`;
  
    const appNameDiv = document.createElement('div');
    appNameDiv.className = 'app_name';
  
    // Создание и добавление тега <p> внутри div app_name
    const appNameParagraph = document.createElement('p');
    appNameParagraph.textContent = text;
    appNameDiv.appendChild(appNameParagraph);
  
    const appContainerDiv = document.createElement('div');
    appContainerDiv.className = `app_container_${counter}`;
  
    flowContainerDiv.appendChild(appContainerDiv);
    flowContainerDiv.appendChild(appNameDiv);
    flowContainer.appendChild(flowContainerDiv);
  }
  
  
  

  function saveFlowToLocalStorage(flowName, flowNumber) {
    let flows = JSON.parse(localStorage.getItem('flows')) || [];
    flows.push(flowName);
    localStorage.setItem('flows', JSON.stringify(flows));
  
    // Получаем текущие данные или создаём новый объект
    let flowsData = JSON.parse(localStorage.getItem('flowsData')) || {};
    if (!flowsData[`flow_app_${flowNumber}`]) {
      flowsData[`flow_app_${flowNumber}`] = [];
    }
    // Так как saveFlowToLocalStorage вызывается до добавления приложений,
    // мы не добавляем сюда данные приложения
    localStorage.setItem('flowsData', JSON.stringify(flowsData));
  
    localStorage.setItem('flowCounter', JSON.stringify(flowCounter));
    localStorage.setItem('flowAppCounter', JSON.stringify(flowAppCounter));
  }

  function loadFlowsFromLocalStorage() {
    let flows = JSON.parse(localStorage.getItem('flows')) || [];
    // Очищаем flowCenter и flowContainer перед загрузкой
    flowCenter.innerHTML = '';
    flowContainer.innerHTML = '';
  
    flows.forEach((flowName, index) => {
      const flowDiv = createFlowElement(flowName, index + 1);
      flowCenter.appendChild(flowDiv);
      addFlowToContainer(flowName, index + 1);
    });
    // Обновляем счетчики после загрузки
    flowCounter = flows.length + 1;
    flowAppCounter = flows.length + 1;
  }
  
  function loadAppsFromLocalStorage() {
    let flowsData = JSON.parse(localStorage.getItem('flowsData')) || {};
  
    Object.keys(flowsData).forEach(flowKey => {
      let flowNumber = flowKey.split('_')[2];
      const appContainer = document.querySelector(`.app_container_${flowNumber}`);
      if (appContainer) {
        appContainer.innerHTML = ''; // Clear the container before populating it.
        flowsData[flowKey].forEach(appData => {
          addApp(appData.name, appData.url, flowNumber, false); // Load each app into its container.
        });
      }
    });
  }
  
  loadFlowsFromLocalStorage();
  loadAppsFromLocalStorage();
  window.onbeforeunload = () => {
    localStorage.setItem('flowCounter', JSON.stringify(flowCounter));
    localStorage.setItem('flowAppCounter', JSON.stringify(flowAppCounter));
  };
  if (addFlowButton && flowInput) {
    addFlowButton.addEventListener('click', () => {
      const text = flowInput.value.trim();
      if (text) {
        addFlow(text);
        flowInput.value = '';
      }
    });
  }
});
