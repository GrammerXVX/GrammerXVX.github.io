let parameter = decodeURIComponent(localStorage.getItem('parameter'));
let It = 0;
let interimSelection = [];
let detailElement = document.createElement('span');
function handleButtonClick(detail) {
    if (interimSelection.includes(detail)) {
        return;
    }
    const photoContainer = document.getElementById('photo-container');
    const buttonsContainer = document.getElementById('buttons-container');

    photoContainer.innerHTML = '';
    //buttonsContainer.innerHTML = '';
    

    if (detail === undefined) {
        createButtons();
        return;
    }

    if (detailElement.innerText.includes('Выбрана деталь:') && interimSelection.length >= 1) {
        detailElement.innerText = detailElement.innerText + ", " + detail;

    }
    else {
        detailElement = document.createElement('span');
        detailElement.innerText = 'Выбрана деталь:' + detail;
    }
    interimSelection.push(detail);
    photoContainer.appendChild(detailElement);
    IndexStack.push(detail);

    It = It + 1;

    //createButtons();
}

function handleBackButtonClick() {
    if (It <= 0) {
        It = 0;
        return;
    }
    It = It - 1;
    if (IndexStack.length >= 1) {
        const photoContainer = document.getElementById('photo-container');
        const buttonsContainer = document.getElementById('buttons-container');

        photoContainer.innerHTML = '';
        buttonsContainer.innerHTML = '';

        IndexStack.pop();

        const detailElement = document.createElement('span');

        if (IndexStack[IndexStack.length - 1] !== undefined) {
            detailElement.innerText = `Выбрана деталь: ${IndexStack[IndexStack.length - 1]}`;
            photoContainer.appendChild(detailElement);
        }
        else {
            photoContainer.innerHTML = '';
        }
        createButtons();
    }
}
function handleUnselectedClick(detail) {
    const existingText = detailElement.innerText;
    const colonIndex = existingText.indexOf(':');
    if (colonIndex !== -1) {
        const details = existingText.substring(colonIndex + 1).trim().split(',').map(item => item.trim());
        const updatedDetails = details.filter(item => item !== detail);
        const updatedText = 'Выбрана деталь:' + updatedDetails.join(', ');
        detailElement.innerText = updatedText;
        const index = interimSelection.indexOf(detail);
        if (index !== -1) {
            interimSelection.splice(index, 1);
        }
    }
}

function createButtons() {

    const buttonsContainer = document.getElementById('buttons-container');
    const backButton = document.getElementById('back-button');
    localData.forEach(button => {
        if (button.specialNote == Iteratot[It].Data) {
            const buttonWrapper = document.createElement('div'); // Обертка для кнопки и описания
            const buttonElement = document.createElement('div');
            const descriptionElement = document.createElement('div');
            const buttonSelect = document.createElement('div');
            buttonSelect.innerText = 'Выбрать';
            buttonSelect.classList.add('btn-select');

            if (interimSelection.includes(button.name)) {
                buttonSelect.innerText = 'Выбрано';
                buttonSelect.classList.add('btn-selected');
            }

            buttonWrapper.addEventListener('click', () => {
                if (buttonSelect.innerText == 'Выбрано') {
                    buttonSelect.classList.remove('btn-selected');
                    buttonSelect.innerText = 'Выбрать';
                    handleUnselectedClick(button.name);
                    buttonWrapper.classList.remove('btn-color-fixx');
                } else {
                    buttonWrapper.classList.add('btn-color-fixx');
                    buttonSelect.classList.add('btn-selected');
                    buttonSelect.innerText = 'Выбрано';
                    handleButtonClick(button.name);

                }

            });
            buttonElement.innerText = button.name;
            buttonElement.classList.add('has-text');

            buttonWrapper.classList.add('btn');
            if (button.description.includes('-')) {
                const descriptionList = document.createElement('ul');
                descriptionElement.classList.add('description');
                descriptionList.classList.add('list-description'); // Добавляем класс стиля списка
                const descriptionItems = button.description.split('-').map(item => item.trim());
                descriptionItems.forEach(item => {
                    if (item.trim() !== '') { // Проверяем, что элемент списка не пустой
                        const descriptionItem = document.createElement('li');
                        descriptionItem.innerText = item;
                        descriptionList.appendChild(descriptionItem);
                    }
                });
                descriptionElement.appendChild(descriptionList);
            } else {
                descriptionElement.classList.add('description');
                descriptionElement.classList.add('description-text');
                descriptionElement.innerText = button.description;
            }
            //buttonWrapper.addEventListener('click', () => handleButtonClick(button.name));
            buttonWrapper.addEventListener('mouseenter', () => {
                const heightWrapper = buttonWrapper.offsetHeight * 0.30 + 10;
                let descriptionHeight = descriptionElement.offsetHeight;

                const listElement = descriptionElement.querySelector('ul'); // Поиск дочернего элемента списка

                if (listElement) {
                    // Если найден дочерний элемент списка, использовать его высоту
                    descriptionHeight = listElement.offsetHeight + 15;
                }

                buttonWrapper.style.height = (descriptionHeight + heightWrapper) + 'px';
                if (interimSelection.includes(button.name))
                    buttonSelect.classList.add('btn-selected-hover');
                else
                    buttonSelect.classList.add('btn-select-hover');
                buttonWrapper.classList.add('btn-color-change');

                //buttonWrapper.classList.forEach(x=>alert(x));
            });

            buttonWrapper.addEventListener('mouseleave', () => {
                buttonWrapper.style.height = '50px';
                buttonWrapper.classList.remove('btn-color-change');
                buttonSelect.classList.remove('btn-select-hover');
                buttonSelect.classList.remove('btn-selected-hover');
            });



            buttonWrapper.appendChild(buttonSelect);
            buttonWrapper.appendChild(buttonElement);
            buttonWrapper.appendChild(descriptionElement);
            buttonsContainer.appendChild(buttonWrapper);
        }
    });
    backButton.addEventListener('click', handleBackButtonClick);

}
createButtons();