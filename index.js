const percentInput = document.querySelector('#percentInput');
const weightInput = document.querySelector('#weightInput');
const calculusBody = document.querySelector('#calculusBody');
const currentWeight = document.querySelector('#currentWeight');
const warningMessage = document.querySelector('#warningMessage');
const percentNodesArr = [];
const percentArr = [];

const addPercent = () => {
  percentInput.addEventListener('keydown', evt => {
    let percent = parseInt(percentInput.value);
    let weight = parseInt(currentWeight.innerHTML);
    if (evt.key.toLowerCase() === 'enter' && percent) {
      if (percent <= 0) {
        insertWarningMessage('Ingreso un porcentaje invalido.');
        setTimeout(() => {
          removeWarningMessage();
        }, 3000);

        return;
      }

      if (percentArr.includes(percent)) {
        insertWarningMessage('Ingreso un porcentaje existente.');
        setTimeout(() => {
          removeWarningMessage();
        }, 3000);

        return;
      }

      removeWarningMessage();

      let weightCalculated = weight ? calculatePercent(percent, weight) : 0;

      let tr = buildItem(percent, weightCalculated);

      percentInput.value = '';
      percentNodesArr.push(tr);
      percentArr.push(tr.percent);
      let list = sortItems();

      calculusBody.innerHTML = '';
      calculusBody.append(...list);
    }
  });
};

const addWeight = () => {
  weightInput.addEventListener('keydown', evt => {
    if (evt.key.toLowerCase() === 'enter' && weightInput.value > 0) {
      let valuesActive = document.querySelectorAll('.valueOnPercent');
      let weight = parseInt(weightInput.value);

      if (valuesActive.length > 0) {
        for (let node of [...valuesActive]) {
          let percent = node.parentElement.parentElement.percent;

          let total = calculatePercent(percent, weight);

          node.innerHTML = `${total} KG`;
        }
      } else {
        insertWarningMessage(`Ingrese algun porcentaje!`);
      }

      currentWeight.innerHTML = `${weight} KG`;

      weightInput.value = '';
    }
  });
};

const calculatePercent = (percent, weight) => {
  return parseInt(weight * (percent / 100));
};

const deleteItem = node => {
  let index = percentArr.indexOf(node.parentElement.parentElement.percent);
  if (index > -1) {
    percentArr.splice(index, 1);
    percentNodesArr.splice(index, 1);
  }

  node.parentElement.parentElement.remove();
};

const insertWarningMessage = message => {
  warningMessage.innerHTML = message;
};

const removeWarningMessage = () => {
  warningMessage.innerHTML = '';
};

const buildItem = (percent, weightCalculated) => {
  let tr = document.createElement('tr');
  tr.className = 'animate__animated animate__zoomIn';
  let buttonTd = document.createElement('td');
  let percentTd = document.createElement('td');
  let arrowTd = document.createElement('td');
  let kgTd = document.createElement('td');

  buttonTd.innerHTML = `<button id="${percent}" class="deleteBtn" onclick="deleteItem(this)">X</button>`;
  percentTd.innerHTML = `${percent}%`;
  arrowTd.innerHTML = `→`;
  kgTd.innerHTML = `<span class="valueOnPercent">${weightCalculated} KG</span>`;

  tr.append(buttonTd, percentTd, arrowTd, kgTd);

  tr.percent = parseInt(percent);

  return tr;
};

const sortItems = () => {
  return percentNodesArr.sort((itemA, itemB) => {
    return itemA.percent - itemB.percent;
  });
};

addPercent();
addWeight();
