const addSearchApp = document.querySelector('.add_search_app');
const searchAppConfiguration = document.querySelector('.search_app_configuration');
  
if (addSearchApp && searchAppConfiguration) {
addSearchApp.addEventListener('click', () => {
    searchAppConfiguration.style.display = searchAppConfiguration.style.display === "flex" ? "none" : "flex";
});
}

// Получаем элементы checkbox и соответствующие div элементы
let checkbox1 = document.querySelector('.search_app_configuration_container_chekkbox_1');
let searchApp1 = document.querySelector('.search_app_1');
let checkbox2 = document.querySelector('.search_app_configuration_container_chekkbox_2');
let searchApp2 = document.querySelector('.search_app_2');
let checkbox3 = document.querySelector('.search_app_configuration_container_chekkbox_3');
let searchApp3 = document.querySelector('.search_app_3');

// Функция для проверки состояния checkbox и изменения видимости div
function toggleDivVisibility(checkbox, div, storageKey) {
    if (checkbox.checked) {
        div.style.display = 'flex';
        localStorage.setItem(storageKey, 'true');
    } else {
        div.style.display = 'none';
        localStorage.setItem(storageKey, 'false');
    }
}

// Функция для восстановления состояния checkbox из localStorage и обновления div
function restoreCheckboxState(checkbox, div, storageKey, defaultChecked = false) {
    let storedState = localStorage.getItem(storageKey);
    if (storedState === null && defaultChecked) {
        checkbox.checked = true;
    } else {
        checkbox.checked = storedState === 'true';
    }
    toggleDivVisibility(checkbox, div, storageKey);
}

// Добавляем обработчики событий для всех checkbox
checkbox1.addEventListener('change', () => toggleDivVisibility(checkbox1, searchApp1, 'checkbox1State'));
checkbox2.addEventListener('change', () => toggleDivVisibility(checkbox2, searchApp2, 'checkbox2State'));
checkbox3.addEventListener('change', () => toggleDivVisibility(checkbox3, searchApp3, 'checkbox3State'));

// Восстанавливаем состояние всех checkbox и div при загрузке страницы
// Для checkbox1 устанавливаем defaultChecked в true
restoreCheckboxState(checkbox1, searchApp1, 'checkbox1State', true);
restoreCheckboxState(checkbox2, searchApp2, 'checkbox2State');
restoreCheckboxState(checkbox3, searchApp3, 'checkbox3State');


document.addEventListener('DOMContentLoaded', function() {
    let searchInput = document.querySelector('.search_main_input');
    let searchHistory = document.querySelector('.search_history');
    let searchImg = document.querySelector('.search_img');
    let searchApp1 = document.querySelector('.search_app_1');
    let searchApp2 = document.querySelector('.search_app_2');
    let searchApp3 = document.querySelector('.search_app_3');

    // Функция для создания и добавления div и p элементов
    function createHistoryElement(query, prepend = false) {
        let div = document.createElement('div');
        div.className = 'vertical_search_line';

        let p = document.createElement('p');
        p.textContent = query;
        p.addEventListener('click', function() {
            performSearch(query, 'google');
        });

        if (prepend) {
            if (searchHistory.children.length > 0) {
                searchHistory.insertBefore(div, searchHistory.firstChild);
                searchHistory.insertBefore(p, div);
            } else {
                searchHistory.appendChild(p);
            }
        } else {
            if (searchHistory.children.length > 0) {
                searchHistory.appendChild(div);
            }
            searchHistory.appendChild(p);
        }
    }

    function addToSearchHistory(query) {
        let history = JSON.parse(localStorage.getItem('searchHistory')) || [];

        if (!history.includes(query)) {
            createHistoryElement(query, true);
            history.push(query);

            // Удаляем самый старый элемент, если длина истории достигла 10
            if (history.length > 10) {
                history.shift(); // Удаляем первый элемент из массива
            }

            localStorage.setItem('searchHistory', JSON.stringify(history));
        }
    }

    function restoreSearchHistory() {
        let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
        history.reverse().forEach(query => createHistoryElement(query));
    }

    function performSearch(query, searchEngine) {
        if (query.trim() !== '') {
            addToSearchHistory(query);
            let url;
            switch (searchEngine) {
                case 'google':
                    url = 'https://www.google.com/search?q=';
                    break;
                case 'bing':
                    url = 'https://www.bing.com/search?q=';
                    break;
                case 'yahoo':
                    url = 'https://search.yahoo.com/search?p=';
                    break;
            }
            window.open(url + encodeURIComponent(query), '_blank');
        }
    }

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(searchInput.value, 'google');
        }
    });

    searchImg.addEventListener('click', function() {
        performSearch(searchInput.value, 'google');
    });

    searchApp1.addEventListener('click', function() {
        performSearch(searchInput.value, 'google');
    });

    searchApp2.addEventListener('click', function() {
        performSearch(searchInput.value, 'bing');
    });

    searchApp3.addEventListener('click', function() {
        performSearch(searchInput.value, 'yahoo');
    });

    restoreSearchHistory();
});
