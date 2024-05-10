const saveToLocalStorage = (imgSrc, modNum) => {
  const localStorageImage = document.getElementById(`image_storage_mod_${modNum}`);
  if (localStorageImage) {
    const parentElement = localStorageImage.parentNode;
    parentElement.removeChild(localStorageImage);
  }

  const localImage = document.createElement('img');
  localImage.src = imgSrc;
  localImage.id = `image_storage_mod_${modNum}`;

  const localStorageImageBlock = document.getElementById('image_storage');
  localStorageImageBlock.appendChild(localImage);
}

const insertImageToBlock = (file) => {
  if (!file) return;

  const imageStorage = document.getElementById('image_storage');
  while (imageStorage.firstChild) {
    imageStorage.removeChild(imageStorage.firstChild);
  }

  var reader = new FileReader();
  reader.onload = function(e) {
      var img = document.createElement('img');
      img.src = e.target.result;
      img.id = "main_img_src";

      var mainImgBlock = document.getElementById('main_img');
      mainImgBlock.innerHTML = '';
      mainImgBlock.appendChild(img);
      saveToLocalStorage(e.target.result, 1);
  };
  reader.readAsDataURL(file);
}

const moduleMod2Controller = (file) => {
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      var canvasWidth = image.width;
      var canvasHeight = image.height;

      var combinedCanvas = document.createElement('canvas');
      combinedCanvas.width = canvasWidth;
      combinedCanvas.height = canvasHeight;
      var ctx = combinedCanvas.getContext('2d');

      ctx.drawImage(image, 0, 0);

      var lineWidth = 20;
      var lineX = canvasWidth / 2 - lineWidth / 2;
      ctx.fillStyle = 'white';
      ctx.fillRect(lineX, 0, lineWidth, canvasHeight);

      var combinedImageDataUrl = combinedCanvas.toDataURL('image/png');

      var img = document.createElement('img');
      img.src = combinedImageDataUrl;
      img.id = "main_img_src";

      var globalImageBlock = document.getElementById('main_img');
      globalImageBlock.innerHTML = '';
      globalImageBlock.appendChild(img);

      saveToLocalStorage(combinedImageDataUrl, 2);
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

const moduleMod3Controller = (file) => {
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      var canvasWidth = image.width;
      var canvasHeight = image.height;

      var combinedCanvas = document.createElement('canvas');
      combinedCanvas.width = canvasWidth;
      combinedCanvas.height = canvasHeight;
      var ctx = combinedCanvas.getContext('2d');

      ctx.drawImage(image, 0, 0);

      var lineHeight = 20;
      var lineY = canvasHeight / 2 - lineHeight / 2;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, lineY, canvasWidth, lineHeight);

      var combinedImageDataUrl = combinedCanvas.toDataURL('image/png');

      var img = document.createElement('img');
      img.src = combinedImageDataUrl;
      img.id = "main_img_src";

      var globalImageBlock = document.getElementById('main_img');
      globalImageBlock.innerHTML = '';
      globalImageBlock.appendChild(img);

      saveToLocalStorage(combinedImageDataUrl, 3);
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

const moduleMod4Controller = (file) => {
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      var canvasWidth = image.width;
      var canvasHeight = image.height;

      var canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      var ctx = canvas.getContext('2d');

      ctx.drawImage(image, 60, 0, canvasWidth - 60, canvasHeight / 2, 0, 0, canvasWidth - 60, canvasHeight / 2);
      ctx.drawImage(image, 0, canvasHeight / 2, canvasWidth, canvasHeight / 2, 80, canvasHeight / 2, canvasWidth - 20, canvasHeight / 2);

      ctx.beginPath();
      ctx.moveTo(0, canvasHeight / 2);
      ctx.lineTo(canvasWidth, canvasHeight / 2);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      var img = document.getElementById('main_img_src');
      img.src = canvas.toDataURL('image/png');
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

const moduleMod5Controller = (file) => {
if (!file) return;

var reader = new FileReader();
reader.onload = function(e) {
  var image = new Image();
  image.onload = function() {
    var canvasWidth = image.width;
    var canvasHeight = image.height;

    var canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight + 60;
    var ctx = canvas.getContext('2d');

    ctx.drawImage(image, 0, 60, canvasWidth / 2, canvasHeight - 60, 0, 0, canvasWidth / 2, canvasHeight - 60);
    ctx.drawImage(image, canvasWidth / 2, 0, canvasWidth / 2, canvasHeight - 60, canvasWidth / 2, 60, canvasWidth / 2, canvasHeight - 60);

    ctx.beginPath();
    ctx.moveTo(canvasWidth / 2, 0);
    ctx.lineTo(canvasWidth / 2, canvasHeight);
    ctx.lineWidth = 20;
    ctx.strokeStyle = 'white';
    ctx.stroke();

    var img = document.getElementById('main_img_src');
    img.src = canvas.toDataURL('image/png');
  };
  image.src = e.target.result;
};
reader.readAsDataURL(file);
}

const moduleMod6Controller = (file) => {
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      var canvasWidth = image.width;
      var canvasHeight = image.height;

      var canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      var ctx = canvas.getContext('2d');

      // Рисуем левую часть с отступами сверху и снизу
      var topMargin = 250;
      var bottomMargin = 60;
      var partHeight = (canvasHeight - topMargin - bottomMargin) / 2;

      ctx.drawImage(image, 0, topMargin, canvasWidth / 3, partHeight, 0, topMargin, canvasWidth / 3, partHeight);
      // Рисуем вертикальную линию между первой и второй частью
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 3, topMargin);
      ctx.lineTo(canvasWidth / 3, canvasHeight - bottomMargin);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем среднюю часть
      ctx.drawImage(image, canvasWidth / 3, 0, canvasWidth / 3, canvasHeight, canvasWidth / 3, 0, canvasWidth / 3, canvasHeight);
      // Рисуем вертикальную линию между второй и третьей частью
      ctx.beginPath();
      ctx.moveTo(2 * canvasWidth / 3, 0);
      ctx.lineTo(2 * canvasWidth / 3, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем правую часть с такими же отступами сверху и снизу
      ctx.drawImage(image, 2 * canvasWidth / 3, topMargin, canvasWidth / 3, partHeight, 2 * canvasWidth / 3, topMargin, canvasWidth / 3, partHeight);

      var img = document.getElementById('main_img_src');
      img.src = canvas.toDataURL('image/png');
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

const moduleMod7Controller = (file) => {
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      var canvasWidth = image.width;
      var canvasHeight = image.height;

      var canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      var ctx = canvas.getContext('2d');

      // Рисуем левую часть без отступов
      ctx.drawImage(image, 0, 0, canvasWidth / 3, canvasHeight, 0, 0, canvasWidth / 3, canvasHeight);

      // Рисуем среднюю часть с отступами сверху и снизу
      var topMargin = 150;
      var bottomMargin = 150;
      var partHeight = canvasHeight - topMargin - bottomMargin;
      ctx.drawImage(image, canvasWidth / 3, topMargin, canvasWidth / 3, partHeight, canvasWidth / 3, topMargin, canvasWidth / 3, partHeight);

      // Рисуем правую часть без отступов
      ctx.drawImage(image, 2 * canvasWidth / 3, 0, canvasWidth / 3, canvasHeight, 2 * canvasWidth / 3, 0, canvasWidth / 3, canvasHeight);

      // Рисуем вертикальные линии между блоками
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 3, 0);
      ctx.lineTo(canvasWidth / 3, canvasHeight);
      ctx.moveTo(2 * canvasWidth / 3, 0);
      ctx.lineTo(2 * canvasWidth / 3, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      var img = document.getElementById('main_img_src');
      img.src = canvas.toDataURL('image/png');
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

const moduleMod8Controller = (file) => {
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      var canvasWidth = image.width;
      var canvasHeight = image.height;

      var canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      var ctx = canvas.getContext('2d');

      // Рисуем левую часть с отступами
      var bottomMarginLeft = 0; // Уменьшаем отступ снизу до нуля
      var partHeightLeft = canvasHeight / 2; // Высота левого блока равна половине высоты холста
      var topMarginLeft = canvasHeight - partHeightLeft; // Устанавливаем верхний отступ так, чтобы левый блок был внизу
      ctx.drawImage(image, 0, topMarginLeft, canvasWidth / 3, partHeightLeft, 0, topMarginLeft, canvasWidth / 3, partHeightLeft);

      // Рисуем вертикальную линию между первой и второй частью
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 3, topMarginLeft);
      ctx.lineTo(canvasWidth / 3, canvasHeight - bottomMarginLeft);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем среднюю часть без изменений
      ctx.drawImage(image, canvasWidth / 3, 0, canvasWidth / 3, canvasHeight, canvasWidth / 3, 0, canvasWidth / 3, canvasHeight);

      // Рисуем вертикальную линию между второй и третьей частью
      ctx.beginPath();
      ctx.moveTo(2 * canvasWidth / 3, 0);
      ctx.lineTo(2 * canvasWidth / 3, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем правую часть с отступами
      var topMarginRight = 0; // Уменьшаем верхний отступ до нуля
      var partHeightRight = canvasHeight / 2; // Высота правого блока равна половине высоты холста
      var bottomMarginRight = canvasHeight - partHeightRight; // Устанавливаем нижний отступ так, чтобы правый блок был внизу
      ctx.drawImage(image, 2 * canvasWidth / 3, topMarginRight, canvasWidth / 3, partHeightRight, 2 * canvasWidth / 3, topMarginRight, canvasWidth / 3, partHeightRight);

      var img = document.getElementById('main_img_src');
      img.src = canvas.toDataURL('image/png');
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

const moduleMod9Controller = (file) => {
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      var canvasWidth = image.width;
      var canvasHeight = image.height;

      var canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      var ctx = canvas.getContext('2d');

      // Рисуем левую часть с отступами
      var topMarginLeft = 0; // Уменьшаем верхний отступ до нуля
      var partHeightLeft = canvasHeight / 2; // Высота левого блока равна половине высоты холста
      var bottomMarginLeft = canvasHeight - partHeightLeft; // Устанавливаем нижний отступ так, чтобы левый блок был внизу
      ctx.drawImage(image, 0, topMarginLeft, canvasWidth / 3, partHeightLeft, 0, topMarginLeft, canvasWidth / 3, partHeightLeft);

      // Рисуем вертикальную линию между первой и второй частью
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 3, topMarginLeft);
      ctx.lineTo(canvasWidth / 3, canvasHeight - bottomMarginLeft);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем среднюю часть без изменений
      ctx.drawImage(image, canvasWidth / 3, 0, canvasWidth / 3, canvasHeight, canvasWidth / 3, 0, canvasWidth / 3, canvasHeight);

      // Рисуем вертикальную линию между второй и третьей частью
      ctx.beginPath();
      ctx.moveTo(2 * canvasWidth / 3, 0);
      ctx.lineTo(2 * canvasWidth / 3, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем правую часть с отступами
      var bottomMarginRight = 0; // Уменьшаем отступ снизу до нуля
      var partHeightRight = canvasHeight / 2; // Высота правого блока равна половине высоты холста
      var topMarginRight = canvasHeight - partHeightRight; // Устанавливаем верхний отступ так, чтобы правый блок был внизу
      ctx.drawImage(image, 2 * canvasWidth / 3, topMarginRight, canvasWidth / 3, partHeightRight, 2 * canvasWidth / 3, topMarginRight, canvasWidth / 3, partHeightRight);

      var img = document.getElementById('main_img_src');
      img.src = canvas.toDataURL('image/png');
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

const moduleMod10Controller = (file) => {
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      var canvasWidth = image.width;
      var canvasHeight = image.height;

      var canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      var ctx = canvas.getContext('2d');

      // Рисуем левую часть
      ctx.drawImage(image, 0, 0, canvasWidth / 3, canvasHeight, 0, 0, canvasWidth / 3, canvasHeight);

      // Рисуем вертикальную линию между первой и второй частью
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 3, 0);
      ctx.lineTo(canvasWidth / 3, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем среднюю часть
      ctx.drawImage(image, canvasWidth / 3, 0, canvasWidth / 3, canvasHeight, canvasWidth / 3, 0, canvasWidth / 3, canvasHeight);

      // Рисуем вертикальную линию между второй и третьей частью
      ctx.beginPath();
      ctx.moveTo(2 * canvasWidth / 3, 0);
      ctx.lineTo(2 * canvasWidth / 3, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем правую часть
      ctx.drawImage(image, 2 * canvasWidth / 3, 0, canvasWidth / 3, canvasHeight, 2 * canvasWidth / 3, 0, canvasWidth / 3, canvasHeight);

      var img = document.getElementById('main_img_src');
      img.src = canvas.toDataURL('image/png');
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

const moduleMod11Controller = (file) => {
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      var canvasWidth = image.width;
      var canvasHeight = image.height;

      var canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      var ctx = canvas.getContext('2d');

      // Размер отступа сверху для первого блока
      var topMarginFirstBlock = 350;

      // Рисуем левую часть (с отступом сверху для первого блока)
      ctx.drawImage(image, 0, topMarginFirstBlock, canvasWidth / 3, canvasHeight, 0, topMarginFirstBlock, canvasWidth / 3, canvasHeight);

      // Рисуем вертикальную линию между первой и второй частью
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 3, topMarginFirstBlock);
      ctx.lineTo(canvasWidth / 3, canvasHeight + topMarginFirstBlock);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем вторую часть с небольшим отступом сверху и снизу
      var topMarginSecondBlock = 250;
      var bottomMarginSecondBlock = 50; // Отступ снизу
      ctx.drawImage(image, canvasWidth / 3, topMarginSecondBlock, canvasWidth / 3, canvasHeight - bottomMarginSecondBlock - topMarginSecondBlock, canvasWidth / 3, topMarginSecondBlock, canvasWidth / 3, canvasHeight - bottomMarginSecondBlock - topMarginSecondBlock);

      // Рисуем вертикальную линию между второй и третьей частью
      ctx.beginPath();
      ctx.moveTo(2 * canvasWidth / 3, topMarginSecondBlock);
      ctx.lineTo(2 * canvasWidth / 3, canvasHeight + topMarginSecondBlock);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем правую часть с небольшим отступом сверху и снизу
      var topMarginThirdBlock = 100;
      var bottomMarginThirdBlock = 150; // Отступ снизу
      ctx.drawImage(image, 2 * canvasWidth / 3, topMarginThirdBlock, canvasWidth / 3, canvasHeight - bottomMarginThirdBlock - topMarginThirdBlock, 2 * canvasWidth / 3, topMarginThirdBlock, canvasWidth / 3, canvasHeight - bottomMarginThirdBlock - topMarginThirdBlock);

      var img = document.getElementById('main_img_src');
      img.src = canvas.toDataURL('image/png');
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

const moduleMod12Controller = (file) => {
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      var canvasWidth = image.width;
      var canvasHeight = image.height;

      var canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      var ctx = canvas.getContext('2d');

      // Вычисляем высоту каждой полоски
      var stripHeight = canvasHeight / 3;

      // Рисуем верхнюю полоску
      ctx.drawImage(image, 0, 0, canvasWidth, stripHeight, 0, 0, canvasWidth, stripHeight);

      // Рисуем горизонтальную линию между первой и второй полоской
      ctx.beginPath();
      ctx.moveTo(0, stripHeight);
      ctx.lineTo(canvasWidth, stripHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем среднюю полоску
      ctx.drawImage(image, 0, stripHeight, canvasWidth, stripHeight, 0, stripHeight, canvasWidth, stripHeight);

      // Рисуем горизонтальную линию между второй и третьей полоской
      ctx.beginPath();
      ctx.moveTo(0, 2 * stripHeight);
      ctx.lineTo(canvasWidth, 2 * stripHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем нижнюю полоску
      ctx.drawImage(image, 0, 2 * stripHeight, canvasWidth, stripHeight, 0, 2 * stripHeight, canvasWidth, stripHeight);

      var img = document.getElementById('main_img_src');
      img.src = canvas.toDataURL('image/png');
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

const moduleMod13Controller = (file) => {
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      var canvasWidth = image.width;
      var canvasHeight = image.height;

      var canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      var ctx = canvas.getContext('2d');

      // Вычисляем высоту каждой полоски
      var stripHeight = canvasHeight / 3;

      // Отступы для первой и третьей полосок
      var rightMarginFirstStrip = 250;
      var leftMarginThirdStrip = 250;

      // Рисуем верхнюю полоску с отступом справа
      ctx.drawImage(image, rightMarginFirstStrip, 0, canvasWidth - rightMarginFirstStrip, stripHeight, 0, 0, canvasWidth - rightMarginFirstStrip, stripHeight);

      // Рисуем горизонтальную линию между первой и второй полоской
      ctx.beginPath();
      ctx.moveTo(0, stripHeight);
      ctx.lineTo(canvasWidth, stripHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем среднюю полоску без изменений
      ctx.drawImage(image, 0, stripHeight, canvasWidth, stripHeight, 0, stripHeight, canvasWidth, stripHeight);

      // Рисуем горизонтальную линию между второй и третьей полоской
      ctx.beginPath();
      ctx.moveTo(0, 2 * stripHeight);
      ctx.lineTo(canvasWidth, 2 * stripHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем нижнюю полоску с отступом слева
      ctx.drawImage(image, 0, 2 * stripHeight, canvasWidth - leftMarginThirdStrip, stripHeight, leftMarginThirdStrip, 2 * stripHeight, canvasWidth - leftMarginThirdStrip, stripHeight);

      var img = document.getElementById('main_img_src');
      img.src = canvas.toDataURL('image/png');
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

const moduleMod14Controller = (file) => {
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      var canvasWidth = image.width;
      var canvasHeight = image.height;

      var canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      var ctx = canvas.getContext('2d');

      // Вычисляем высоту каждой полоски
      var stripHeight = canvasHeight / 3;

      // Отступы для первой и третьей полосок
      var leftMarginFirstStrip = 250;
      var rightMarginThirdStrip = 250;

      // Рисуем верхнюю полоску с отступом слева
      ctx.drawImage(image, 0, 0, canvasWidth - leftMarginFirstStrip, stripHeight, leftMarginFirstStrip, 0, canvasWidth - leftMarginFirstStrip, stripHeight);

      // Рисуем горизонтальную линию между первой и второй полоской
      ctx.beginPath();
      ctx.moveTo(0, stripHeight);
      ctx.lineTo(canvasWidth, stripHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем среднюю полоску без изменений
      ctx.drawImage(image, 0, stripHeight, canvasWidth, stripHeight, 0, stripHeight, canvasWidth, stripHeight);

      // Рисуем горизонтальную линию между второй и третьей полоской
      ctx.beginPath();
      ctx.moveTo(0, 2 * stripHeight);
      ctx.lineTo(canvasWidth, 2 * stripHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем нижнюю полоску с отступом справа
      ctx.drawImage(image, rightMarginThirdStrip, 2 * stripHeight, canvasWidth - rightMarginThirdStrip, stripHeight, 0, 2 * stripHeight, canvasWidth - rightMarginThirdStrip, stripHeight);

      var img = document.getElementById('main_img_src');
      img.src = canvas.toDataURL('image/png');
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

const moduleMod15Controller = (file) => {
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      var canvasWidth = image.width;
      var canvasHeight = image.height;

      var canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      var ctx = canvas.getContext('2d');

      // Размеры отступов сверху и снизу для каждого блока
      var topMarginFirstBlock = 0; // Верхний отступ для первого блока
      var topMarginSecondBlock = 100;
      var topMarginThirdBlock = 150; // Верхний отступ для третьего блока
      var topMarginFourthBlock = 250; // Верхний отступ для четвертого блока

      var bottomMarginFirstBlock = 300;
      var bottomMarginSecondBlock = 200;
      var bottomMarginThirdBlock = 100;
      var bottomMarginFourthBlock = 0;

      // Рисуем первую часть с отступом сверху и снизу
      ctx.drawImage(image, 0, topMarginFirstBlock, canvasWidth / 4, canvasHeight - bottomMarginFirstBlock - topMarginFirstBlock, 0, topMarginFirstBlock, canvasWidth / 4, canvasHeight - bottomMarginFirstBlock - topMarginFirstBlock);

      // Рисуем вертикальную линию между первой и второй частью
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 4, 0);
      ctx.lineTo(canvasWidth / 4, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем вторую часть с отступом снизу и сверху
      ctx.drawImage(image, canvasWidth / 4, topMarginSecondBlock, canvasWidth / 4, canvasHeight - bottomMarginSecondBlock - topMarginSecondBlock, canvasWidth / 4, topMarginSecondBlock, canvasWidth / 4, canvasHeight - bottomMarginSecondBlock - topMarginSecondBlock);

      // Рисуем вертикальную линию между второй и третьей частью
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 2, 0);
      ctx.lineTo(canvasWidth / 2, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем третью часть с отступом сверху и снизу
      ctx.drawImage(image, canvasWidth / 2, topMarginThirdBlock, canvasWidth / 4, canvasHeight - bottomMarginThirdBlock - topMarginThirdBlock, canvasWidth / 2, topMarginThirdBlock, canvasWidth / 4, canvasHeight - bottomMarginThirdBlock - topMarginThirdBlock);

      // Рисуем вертикальную линию между третьей и четвертой частью
      ctx.beginPath();
      ctx.moveTo(3 * canvasWidth / 4, 0);
      ctx.lineTo(3 * canvasWidth / 4, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем четвертую часть с отступом сверху и снизу
      ctx.drawImage(image, 3 * canvasWidth / 4, topMarginFourthBlock, canvasWidth / 4, canvasHeight - bottomMarginFourthBlock - topMarginFourthBlock, 3 * canvasWidth / 4, topMarginFourthBlock, canvasWidth / 4, canvasHeight - bottomMarginFourthBlock - topMarginFourthBlock);

      var img = document.getElementById('main_img_src');
      img.src = canvas.toDataURL('image/png');
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

const moduleMod16Controller = (file) => {
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      var canvasWidth = image.width;
      var canvasHeight = image.height;

      var canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      var ctx = canvas.getContext('2d');

      // Размеры отступов сверху и снизу для каждого блока
      var topMarginFirstBlock = 150; // Верхний отступ для первого блока
      var topMarginSecondBlock = 0;
      var topMarginThirdBlock = 0; // Верхний отступ для третьего блока
      var topMarginFourthBlock = 150; // Верхний отступ для четвертого блока

      var bottomMarginFirstBlock = 150;
      var bottomMarginSecondBlock = 0;
      var bottomMarginThirdBlock = 0;
      var bottomMarginFourthBlock = 150;

      // Рисуем первую часть с отступом сверху и снизу
      ctx.drawImage(image, 0, topMarginFirstBlock, canvasWidth / 4, canvasHeight - bottomMarginFirstBlock - topMarginFirstBlock, 0, topMarginFirstBlock, canvasWidth / 4, canvasHeight - bottomMarginFirstBlock - topMarginFirstBlock);

      // Рисуем вертикальную линию между первой и второй частью
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 4, 0);
      ctx.lineTo(canvasWidth / 4, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем вторую часть с отступом снизу и сверху
      ctx.drawImage(image, canvasWidth / 4, topMarginSecondBlock, canvasWidth / 4, canvasHeight - bottomMarginSecondBlock - topMarginSecondBlock, canvasWidth / 4, topMarginSecondBlock, canvasWidth / 4, canvasHeight - bottomMarginSecondBlock - topMarginSecondBlock);

      // Рисуем вертикальную линию между второй и третьей частью
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 2, 0);
      ctx.lineTo(canvasWidth / 2, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем третью часть с отступом сверху и снизу
      ctx.drawImage(image, canvasWidth / 2, topMarginThirdBlock, canvasWidth / 4, canvasHeight - bottomMarginThirdBlock - topMarginThirdBlock, canvasWidth / 2, topMarginThirdBlock, canvasWidth / 4, canvasHeight - bottomMarginThirdBlock - topMarginThirdBlock);

      // Рисуем вертикальную линию между третьей и четвертой частью
      ctx.beginPath();
      ctx.moveTo(3 * canvasWidth / 4, 0);
      ctx.lineTo(3 * canvasWidth / 4, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем четвертую часть с отступом сверху и снизу
      ctx.drawImage(image, 3 * canvasWidth / 4, topMarginFourthBlock, canvasWidth / 4, canvasHeight - bottomMarginFourthBlock - topMarginFourthBlock, 3 * canvasWidth / 4, topMarginFourthBlock, canvasWidth / 4, canvasHeight - bottomMarginFourthBlock - topMarginFourthBlock);

      var img = document.getElementById('main_img_src');
      img.src = canvas.toDataURL('image/png');
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

const moduleMod17Controller = (file) => {
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      var canvasWidth = image.width;
      var canvasHeight = image.height;

      var canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      var ctx = canvas.getContext('2d');

      // Размеры отступов сверху и снизу для каждого блока
      var topMarginFirstBlock = 150; // Верхний отступ для первого блока
      var topMarginSecondBlock = 0;
      var topMarginThirdBlock = 200; // Верхний отступ для третьего блока
      var topMarginFourthBlock = 300; // Верхний отступ для четвертого блока

      var bottomMarginFirstBlock = 350;
      var bottomMarginSecondBlock = 200;
      var bottomMarginThirdBlock = 0;
      var bottomMarginFourthBlock = 150;

      // Рисуем первую часть с отступом сверху и снизу
      ctx.drawImage(image, 0, topMarginFirstBlock, canvasWidth / 4, canvasHeight - bottomMarginFirstBlock - topMarginFirstBlock, 0, topMarginFirstBlock, canvasWidth / 4, canvasHeight - bottomMarginFirstBlock - topMarginFirstBlock);

      // Рисуем вертикальную линию между первой и второй частью
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 4, 0);
      ctx.lineTo(canvasWidth / 4, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем вторую часть с отступом снизу и сверху
      ctx.drawImage(image, canvasWidth / 4, topMarginSecondBlock, canvasWidth / 4, canvasHeight - bottomMarginSecondBlock - topMarginSecondBlock, canvasWidth / 4, topMarginSecondBlock, canvasWidth / 4, canvasHeight - bottomMarginSecondBlock - topMarginSecondBlock);

      // Рисуем вертикальную линию между второй и третьей частью
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 2, 0);
      ctx.lineTo(canvasWidth / 2, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем третью часть с отступом сверху и снизу
      ctx.drawImage(image, canvasWidth / 2, topMarginThirdBlock, canvasWidth / 4, canvasHeight - bottomMarginThirdBlock - topMarginThirdBlock, canvasWidth / 2, topMarginThirdBlock, canvasWidth / 4, canvasHeight - bottomMarginThirdBlock - topMarginThirdBlock);

      // Рисуем вертикальную линию между третьей и четвертой частью
      ctx.beginPath();
      ctx.moveTo(3 * canvasWidth / 4, 0);
      ctx.lineTo(3 * canvasWidth / 4, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем четвертую часть с отступом сверху и снизу
      ctx.drawImage(image, 3 * canvasWidth / 4, topMarginFourthBlock, canvasWidth / 4, canvasHeight - bottomMarginFourthBlock - topMarginFourthBlock, 3 * canvasWidth / 4, topMarginFourthBlock, canvasWidth / 4, canvasHeight - bottomMarginFourthBlock - topMarginFourthBlock);

      var img = document.getElementById('main_img_src');
      img.src = canvas.toDataURL('image/png');
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

const moduleMod18Controller = (file) => {
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      var canvasWidth = image.width;
      var canvasHeight = image.height;

      var canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      var ctx = canvas.getContext('2d');

      // Размеры отступов сверху и снизу для каждого блока
      var topMarginFirstBlock = 250; // Верхний отступ для первого блока
      var topMarginSecondBlock = 150;
      var topMarginThirdBlock = 50; // Верхний отступ для третьего блока
      var topMarginFourthBlock = 100; // Верхний отступ для четвертого блока

      var bottomMarginFirstBlock = 250;
      var bottomMarginSecondBlock = 150;
      var bottomMarginThirdBlock = 50;
      var bottomMarginFourthBlock = 100;

      // Рисуем первую часть с отступом сверху и снизу
      ctx.drawImage(image, 0, topMarginFirstBlock, canvasWidth / 4, canvasHeight - bottomMarginFirstBlock - topMarginFirstBlock, 0, topMarginFirstBlock, canvasWidth / 4, canvasHeight - bottomMarginFirstBlock - topMarginFirstBlock);

      // Рисуем вертикальную линию между первой и второй частью
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 4, 0);
      ctx.lineTo(canvasWidth / 4, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем вторую часть с отступом снизу и сверху
      ctx.drawImage(image, canvasWidth / 4, topMarginSecondBlock, canvasWidth / 4, canvasHeight - bottomMarginSecondBlock - topMarginSecondBlock, canvasWidth / 4, topMarginSecondBlock, canvasWidth / 4, canvasHeight - bottomMarginSecondBlock - topMarginSecondBlock);

      // Рисуем вертикальную линию между второй и третьей частью
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 2, 0);
      ctx.lineTo(canvasWidth / 2, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем третью часть с отступом сверху и снизу
      ctx.drawImage(image, canvasWidth / 2, topMarginThirdBlock, canvasWidth / 4, canvasHeight - bottomMarginThirdBlock - topMarginThirdBlock, canvasWidth / 2, topMarginThirdBlock, canvasWidth / 4, canvasHeight - bottomMarginThirdBlock - topMarginThirdBlock);

      // Рисуем вертикальную линию между третьей и четвертой частью
      ctx.beginPath();
      ctx.moveTo(3 * canvasWidth / 4, 0);
      ctx.lineTo(3 * canvasWidth / 4, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем четвертую часть с отступом сверху и снизу
      ctx.drawImage(image, 3 * canvasWidth / 4, topMarginFourthBlock, canvasWidth / 4, canvasHeight - bottomMarginFourthBlock - topMarginFourthBlock, 3 * canvasWidth / 4, topMarginFourthBlock, canvasWidth / 4, canvasHeight - bottomMarginFourthBlock - topMarginFourthBlock);

      var img = document.getElementById('main_img_src');
      img.src = canvas.toDataURL('image/png');
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

const moduleMod19Controller = (file) => {
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      var canvasWidth = image.width;
      var canvasHeight = image.height;

      var canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      var ctx = canvas.getContext('2d');

      // Рисуем верхнюю часть
      ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight / 2, 0, 0, canvasWidth, canvasHeight / 2);

      // Рисуем горизонтальную линию посередине
      ctx.beginPath();
      ctx.moveTo(0, canvasHeight / 2);
      ctx.lineTo(canvasWidth, canvasHeight / 2);
      ctx.lineWidth = 20; // Измените толщину линии по вашему желанию
      ctx.strokeStyle = 'white'; // Измените цвет линии по вашему желанию
      ctx.stroke();

      // Рисуем нижнюю часть
      ctx.drawImage(image, 0, canvasHeight / 2, canvasWidth, canvasHeight / 2, 0, canvasHeight / 2, canvasWidth, canvasHeight / 2);

      // Рисуем вертикальную линию посередине
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 2, 0);
      ctx.lineTo(canvasWidth / 2, canvasHeight);
      ctx.lineWidth = 20; // Измените толщину линии по вашему желанию
      ctx.strokeStyle = 'white'; // Измените цвет линии по вашему желанию
      ctx.stroke();

      var img = document.getElementById('main_img_src');
      img.src = canvas.toDataURL('image/png');
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

const moduleMod20Controller = (file) => {
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      var canvasWidth = image.width;
      var canvasHeight = image.height;

      var canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      var ctx = canvas.getContext('2d');

      // Верхние отступы для каждого блока
      var topMarginFirstBlock = 250;
      var topMarginSecondBlock = 150;
      var topMarginThirdBlock = 50;
      var topMarginFourthBlock = 150;
      var topMarginFifthBlock = 250;

      // Нижние отступы для каждого блока
      var bottomMarginFirstBlock = 250;
      var bottomMarginSecondBlock = 150;
      var bottomMarginThirdBlock = 50;
      var bottomMarginFourthBlock = 150;
      var bottomMarginFifthBlock = 250;

      // Рисуем левую часть с отступами
      ctx.drawImage(image, 0, topMarginFirstBlock, canvasWidth / 5, canvasHeight - topMarginFirstBlock - bottomMarginFirstBlock, 0, topMarginFirstBlock, canvasWidth / 5, canvasHeight - topMarginFirstBlock - bottomMarginFirstBlock);

      // Рисуем вертикальную линию между первой и второй частью
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 5, 0);
      ctx.lineTo(canvasWidth / 5, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем вторую часть с отступами
      ctx.drawImage(image, canvasWidth / 5, topMarginSecondBlock, canvasWidth / 5, canvasHeight - topMarginSecondBlock - bottomMarginSecondBlock, canvasWidth / 5, topMarginSecondBlock, canvasWidth / 5, canvasHeight - topMarginSecondBlock - bottomMarginSecondBlock);

      // Рисуем вертикальную линию между второй и третьей частью
      ctx.beginPath();
      ctx.moveTo(2 * canvasWidth / 5, 0);
      ctx.lineTo(2 * canvasWidth / 5, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем третью часть с отступами
      ctx.drawImage(image, 2 * canvasWidth / 5, topMarginThirdBlock, canvasWidth / 5, canvasHeight - topMarginThirdBlock - bottomMarginThirdBlock, 2 * canvasWidth / 5, topMarginThirdBlock, canvasWidth / 5, canvasHeight - topMarginThirdBlock - bottomMarginThirdBlock);

      // Рисуем вертикальную линию между третьей и четвертой частью
      ctx.beginPath();
      ctx.moveTo(3 * canvasWidth / 5, 0);
      ctx.lineTo(3 * canvasWidth / 5, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем четвертую часть с отступами
      ctx.drawImage(image, 3 * canvasWidth / 5, topMarginFourthBlock, canvasWidth / 5, canvasHeight - topMarginFourthBlock - bottomMarginFourthBlock, 3 * canvasWidth / 5, topMarginFourthBlock, canvasWidth / 5, canvasHeight - topMarginFourthBlock - bottomMarginFourthBlock);

      // Рисуем вертикальную линию между четвертой и пятой частью
      ctx.beginPath();
      ctx.moveTo(4 * canvasWidth / 5, 0);
      ctx.lineTo(4 * canvasWidth / 5, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем пятую часть с отступами
      ctx.drawImage(image, 4 * canvasWidth / 5, topMarginFifthBlock, canvasWidth / 5, canvasHeight - topMarginFifthBlock - bottomMarginFifthBlock, 4 * canvasWidth / 5, topMarginFifthBlock, canvasWidth / 5, canvasHeight - topMarginFifthBlock - bottomMarginFifthBlock);

      var img = document.getElementById('main_img_src');
      img.src = canvas.toDataURL('image/png');
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

const moduleMod21Controller = (file) => {
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      var canvasWidth = image.width;
      var canvasHeight = image.height;

      var canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      var ctx = canvas.getContext('2d');

      // Верхние отступы для каждого блока
      var topMarginFirstBlock = 0;
      var topMarginSecondBlock = 0;
      var topMarginThirdBlock = 0;
      var topMarginFourthBlock = 0;
      var topMarginFifthBlock = 0;

      // Нижние отступы для каждого блока
      var bottomMarginFirstBlock = 0;
      var bottomMarginSecondBlock = 0;
      var bottomMarginThirdBlock = 0;
      var bottomMarginFourthBlock = 0;
      var bottomMarginFifthBlock = 0;

      // Рисуем левую часть с отступами
      ctx.drawImage(image, 0, topMarginFirstBlock, canvasWidth / 5, canvasHeight - topMarginFirstBlock - bottomMarginFirstBlock, 0, topMarginFirstBlock, canvasWidth / 5, canvasHeight - topMarginFirstBlock - bottomMarginFirstBlock);

      // Рисуем вертикальную линию между первой и второй частью
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 5, 0);
      ctx.lineTo(canvasWidth / 5, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем вторую часть с отступами
      ctx.drawImage(image, canvasWidth / 5, topMarginSecondBlock, canvasWidth / 5, canvasHeight - topMarginSecondBlock - bottomMarginSecondBlock, canvasWidth / 5, topMarginSecondBlock, canvasWidth / 5, canvasHeight - topMarginSecondBlock - bottomMarginSecondBlock);

      // Рисуем вертикальную линию между второй и третьей частью
      ctx.beginPath();
      ctx.moveTo(2 * canvasWidth / 5, 0);
      ctx.lineTo(2 * canvasWidth / 5, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем третью часть с отступами
      ctx.drawImage(image, 2 * canvasWidth / 5, topMarginThirdBlock, canvasWidth / 5, canvasHeight - topMarginThirdBlock - bottomMarginThirdBlock, 2 * canvasWidth / 5, topMarginThirdBlock, canvasWidth / 5, canvasHeight - topMarginThirdBlock - bottomMarginThirdBlock);

      // Рисуем вертикальную линию между третьей и четвертой частью
      ctx.beginPath();
      ctx.moveTo(3 * canvasWidth / 5, 0);
      ctx.lineTo(3 * canvasWidth / 5, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем четвертую часть с отступами
      ctx.drawImage(image, 3 * canvasWidth / 5, topMarginFourthBlock, canvasWidth / 5, canvasHeight - topMarginFourthBlock - bottomMarginFourthBlock, 3 * canvasWidth / 5, topMarginFourthBlock, canvasWidth / 5, canvasHeight - topMarginFourthBlock - bottomMarginFourthBlock);

      // Рисуем вертикальную линию между четвертой и пятой частью
      ctx.beginPath();
      ctx.moveTo(4 * canvasWidth / 5, 0);
      ctx.lineTo(4 * canvasWidth / 5, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем пятую часть с отступами
      ctx.drawImage(image, 4 * canvasWidth / 5, topMarginFifthBlock, canvasWidth / 5, canvasHeight - topMarginFifthBlock - bottomMarginFifthBlock, 4 * canvasWidth / 5, topMarginFifthBlock, canvasWidth / 5, canvasHeight - topMarginFifthBlock - bottomMarginFifthBlock);

      var img = document.getElementById('main_img_src');
      img.src = canvas.toDataURL('image/png');
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

const moduleMod22Controller = (file) => {
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      var canvasWidth = image.width;
      var canvasHeight = image.height;

      var canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      var ctx = canvas.getContext('2d');

      // Верхние отступы для каждого блока
      var topMarginFirstBlock = 0;
      var topMarginSecondBlock = 100;
      var topMarginThirdBlock = 200;
      var topMarginFourthBlock = 100;
      var topMarginFifthBlock = 0;

      // Нижние отступы для каждого блока
      var bottomMarginFirstBlock = 0;
      var bottomMarginSecondBlock = 100;
      var bottomMarginThirdBlock = 200;
      var bottomMarginFourthBlock = 100;
      var bottomMarginFifthBlock = 0;

      // Рисуем левую часть с отступами
      ctx.drawImage(image, 0, topMarginFirstBlock, canvasWidth / 5, canvasHeight - topMarginFirstBlock - bottomMarginFirstBlock, 0, topMarginFirstBlock, canvasWidth / 5, canvasHeight - topMarginFirstBlock - bottomMarginFirstBlock);

      // Рисуем вертикальную линию между первой и второй частью
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 5, 0);
      ctx.lineTo(canvasWidth / 5, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем вторую часть с отступами
      ctx.drawImage(image, canvasWidth / 5, topMarginSecondBlock, canvasWidth / 5, canvasHeight - topMarginSecondBlock - bottomMarginSecondBlock, canvasWidth / 5, topMarginSecondBlock, canvasWidth / 5, canvasHeight - topMarginSecondBlock - bottomMarginSecondBlock);

      // Рисуем вертикальную линию между второй и третьей частью
      ctx.beginPath();
      ctx.moveTo(2 * canvasWidth / 5, 0);
      ctx.lineTo(2 * canvasWidth / 5, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем третью часть с отступами
      ctx.drawImage(image, 2 * canvasWidth / 5, topMarginThirdBlock, canvasWidth / 5, canvasHeight - topMarginThirdBlock - bottomMarginThirdBlock, 2 * canvasWidth / 5, topMarginThirdBlock, canvasWidth / 5, canvasHeight - topMarginThirdBlock - bottomMarginThirdBlock);

      // Рисуем вертикальную линию между третьей и четвертой частью
      ctx.beginPath();
      ctx.moveTo(3 * canvasWidth / 5, 0);
      ctx.lineTo(3 * canvasWidth / 5, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем четвертую часть с отступами
      ctx.drawImage(image, 3 * canvasWidth / 5, topMarginFourthBlock, canvasWidth / 5, canvasHeight - topMarginFourthBlock - bottomMarginFourthBlock, 3 * canvasWidth / 5, topMarginFourthBlock, canvasWidth / 5, canvasHeight - topMarginFourthBlock - bottomMarginFourthBlock);

      // Рисуем вертикальную линию между четвертой и пятой частью
      ctx.beginPath();
      ctx.moveTo(4 * canvasWidth / 5, 0);
      ctx.lineTo(4 * canvasWidth / 5, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем пятую часть с отступами
      ctx.drawImage(image, 4 * canvasWidth / 5, topMarginFifthBlock, canvasWidth / 5, canvasHeight - topMarginFifthBlock - bottomMarginFifthBlock, 4 * canvasWidth / 5, topMarginFifthBlock, canvasWidth / 5, canvasHeight - topMarginFifthBlock - bottomMarginFifthBlock);

      var img = document.getElementById('main_img_src');
      img.src = canvas.toDataURL('image/png');
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

const moduleMod23Controller = (file) => {
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      var canvasWidth = image.width;
      var canvasHeight = image.height;

      var canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      var ctx = canvas.getContext('2d');

      // Верхние отступы для каждого блока
      var topMarginFirstBlock = 0;
      var topMarginSecondBlock = 0;
      var topMarginThirdBlock = 0;
      var topMarginFourthBlock = 150;
      var topMarginFifthBlock = 250;

      // Нижние отступы для каждого блока
      var bottomMarginFirstBlock = 250;
      var bottomMarginSecondBlock = 150;
      var bottomMarginThirdBlock = 0;
      var bottomMarginFourthBlock = 0;
      var bottomMarginFifthBlock = 0;

      // Рисуем левую часть с отступами
      ctx.drawImage(image, 0, topMarginFirstBlock, canvasWidth / 5, canvasHeight - topMarginFirstBlock - bottomMarginFirstBlock, 0, topMarginFirstBlock, canvasWidth / 5, canvasHeight - topMarginFirstBlock - bottomMarginFirstBlock);

      // Рисуем вертикальную линию между первой и второй частью
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 5, 0);
      ctx.lineTo(canvasWidth / 5, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем вторую часть с отступами
      ctx.drawImage(image, canvasWidth / 5, topMarginSecondBlock, canvasWidth / 5, canvasHeight - topMarginSecondBlock - bottomMarginSecondBlock, canvasWidth / 5, topMarginSecondBlock, canvasWidth / 5, canvasHeight - topMarginSecondBlock - bottomMarginSecondBlock);

      // Рисуем вертикальную линию между второй и третьей частью
      ctx.beginPath();
      ctx.moveTo(2 * canvasWidth / 5, 0);
      ctx.lineTo(2 * canvasWidth / 5, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем третью часть с отступами
      ctx.drawImage(image, 2 * canvasWidth / 5, topMarginThirdBlock, canvasWidth / 5, canvasHeight - topMarginThirdBlock - bottomMarginThirdBlock, 2 * canvasWidth / 5, topMarginThirdBlock, canvasWidth / 5, canvasHeight - topMarginThirdBlock - bottomMarginThirdBlock);

      // Рисуем вертикальную линию между третьей и четвертой частью
      ctx.beginPath();
      ctx.moveTo(3 * canvasWidth / 5, 0);
      ctx.lineTo(3 * canvasWidth / 5, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем четвертую часть с отступами
      ctx.drawImage(image, 3 * canvasWidth / 5, topMarginFourthBlock, canvasWidth / 5, canvasHeight - topMarginFourthBlock - bottomMarginFourthBlock, 3 * canvasWidth / 5, topMarginFourthBlock, canvasWidth / 5, canvasHeight - topMarginFourthBlock - bottomMarginFourthBlock);

      // Рисуем вертикальную линию между четвертой и пятой частью
      ctx.beginPath();
      ctx.moveTo(4 * canvasWidth / 5, 0);
      ctx.lineTo(4 * canvasWidth / 5, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем пятую часть с отступами
      ctx.drawImage(image, 4 * canvasWidth / 5, topMarginFifthBlock, canvasWidth / 5, canvasHeight - topMarginFifthBlock - bottomMarginFifthBlock, 4 * canvasWidth / 5, topMarginFifthBlock, canvasWidth / 5, canvasHeight - topMarginFifthBlock - bottomMarginFifthBlock);

      var img = document.getElementById('main_img_src');
      img.src = canvas.toDataURL('image/png');
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

const moduleMod24Controller = (file) => {
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      var canvasWidth = image.width;
      var canvasHeight = image.height;

      var canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      var ctx = canvas.getContext('2d');

      // Верхние отступы для каждого блока
      var topMarginFirstBlock = 350;
      var topMarginSecondBlock = 250;
      var topMarginThirdBlock = 150;
      var topMarginFourthBlock = 250;
      var topMarginFifthBlock = 350;

      // Нижние отступы для каждого блока
      var bottomMarginFirstBlock = 0;
      var bottomMarginSecondBlock = 0;
      var bottomMarginThirdBlock = 0;
      var bottomMarginFourthBlock = 0;
      var bottomMarginFifthBlock = 0;

      // Рисуем левую часть с отступами
      ctx.drawImage(image, 0, topMarginFirstBlock, canvasWidth / 5, canvasHeight - topMarginFirstBlock - bottomMarginFirstBlock, 0, topMarginFirstBlock, canvasWidth / 5, canvasHeight - topMarginFirstBlock - bottomMarginFirstBlock);

      // Рисуем вертикальную линию между первой и второй частью
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 5, 0);
      ctx.lineTo(canvasWidth / 5, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем вторую часть с отступами
      ctx.drawImage(image, canvasWidth / 5, topMarginSecondBlock, canvasWidth / 5, canvasHeight - topMarginSecondBlock - bottomMarginSecondBlock, canvasWidth / 5, topMarginSecondBlock, canvasWidth / 5, canvasHeight - topMarginSecondBlock - bottomMarginSecondBlock);

      // Рисуем вертикальную линию между второй и третьей частью
      ctx.beginPath();
      ctx.moveTo(2 * canvasWidth / 5, 0);
      ctx.lineTo(2 * canvasWidth / 5, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем третью часть с отступами
      ctx.drawImage(image, 2 * canvasWidth / 5, topMarginThirdBlock, canvasWidth / 5, canvasHeight - topMarginThirdBlock - bottomMarginThirdBlock, 2 * canvasWidth / 5, topMarginThirdBlock, canvasWidth / 5, canvasHeight - topMarginThirdBlock - bottomMarginThirdBlock);

      // Рисуем вертикальную линию между третьей и четвертой частью
      ctx.beginPath();
      ctx.moveTo(3 * canvasWidth / 5, 0);
      ctx.lineTo(3 * canvasWidth / 5, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем четвертую часть с отступами
      ctx.drawImage(image, 3 * canvasWidth / 5, topMarginFourthBlock, canvasWidth / 5, canvasHeight - topMarginFourthBlock - bottomMarginFourthBlock, 3 * canvasWidth / 5, topMarginFourthBlock, canvasWidth / 5, canvasHeight - topMarginFourthBlock - bottomMarginFourthBlock);

      // Рисуем вертикальную линию между четвертой и пятой частью
      ctx.beginPath();
      ctx.moveTo(4 * canvasWidth / 5, 0);
      ctx.lineTo(4 * canvasWidth / 5, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем пятую часть с отступами
      ctx.drawImage(image, 4 * canvasWidth / 5, topMarginFifthBlock, canvasWidth / 5, canvasHeight - topMarginFifthBlock - bottomMarginFifthBlock, 4 * canvasWidth / 5, topMarginFifthBlock, canvasWidth / 5, canvasHeight - topMarginFifthBlock - bottomMarginFifthBlock);

      var img = document.getElementById('main_img_src');
      img.src = canvas.toDataURL('image/png');
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

const moduleMod25Controller = (file) => {
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      var canvasWidth = image.width;
      var canvasHeight = image.height;

      var canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      var ctx = canvas.getContext('2d');

      // Верхние отступы для каждого блока
      var topMarginFirstBlock = 150;
      var topMarginSecondBlock = 0;
      var topMarginThirdBlock = 150;
      var topMarginFourthBlock = 0;
      var topMarginFifthBlock = 150;

      // Нижние отступы для каждого блока
      var bottomMarginFirstBlock = 0;
      var bottomMarginSecondBlock = 150;
      var bottomMarginThirdBlock = 0;
      var bottomMarginFourthBlock = 150;
      var bottomMarginFifthBlock = 0;

      // Рисуем левую часть с отступами
      ctx.drawImage(image, 0, topMarginFirstBlock, canvasWidth / 5, canvasHeight - topMarginFirstBlock - bottomMarginFirstBlock, 0, topMarginFirstBlock, canvasWidth / 5, canvasHeight - topMarginFirstBlock - bottomMarginFirstBlock);

      // Рисуем вертикальную линию между первой и второй частью
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 5, 0);
      ctx.lineTo(canvasWidth / 5, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем вторую часть с отступами
      ctx.drawImage(image, canvasWidth / 5, topMarginSecondBlock, canvasWidth / 5, canvasHeight - topMarginSecondBlock - bottomMarginSecondBlock, canvasWidth / 5, topMarginSecondBlock, canvasWidth / 5, canvasHeight - topMarginSecondBlock - bottomMarginSecondBlock);

      // Рисуем вертикальную линию между второй и третьей частью
      ctx.beginPath();
      ctx.moveTo(2 * canvasWidth / 5, 0);
      ctx.lineTo(2 * canvasWidth / 5, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем третью часть с отступами
      ctx.drawImage(image, 2 * canvasWidth / 5, topMarginThirdBlock, canvasWidth / 5, canvasHeight - topMarginThirdBlock - bottomMarginThirdBlock, 2 * canvasWidth / 5, topMarginThirdBlock, canvasWidth / 5, canvasHeight - topMarginThirdBlock - bottomMarginThirdBlock);

      // Рисуем вертикальную линию между третьей и четвертой частью
      ctx.beginPath();
      ctx.moveTo(3 * canvasWidth / 5, 0);
      ctx.lineTo(3 * canvasWidth / 5, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем четвертую часть с отступами
      ctx.drawImage(image, 3 * canvasWidth / 5, topMarginFourthBlock, canvasWidth / 5, canvasHeight - topMarginFourthBlock - bottomMarginFourthBlock, 3 * canvasWidth / 5, topMarginFourthBlock, canvasWidth / 5, canvasHeight - topMarginFourthBlock - bottomMarginFourthBlock);

      // Рисуем вертикальную линию между четвертой и пятой частью
      ctx.beginPath();
      ctx.moveTo(4 * canvasWidth / 5, 0);
      ctx.lineTo(4 * canvasWidth / 5, canvasHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем пятую часть с отступами
      ctx.drawImage(image, 4 * canvasWidth / 5, topMarginFifthBlock, canvasWidth / 5, canvasHeight - topMarginFifthBlock - bottomMarginFifthBlock, 4 * canvasWidth / 5, topMarginFifthBlock, canvasWidth / 5, canvasHeight - topMarginFifthBlock - bottomMarginFifthBlock);

      var img = document.getElementById('main_img_src');
      img.src = canvas.toDataURL('image/png');
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

const moduleMod26Controller = (file) => {
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      var canvasWidth = image.width;
      var canvasHeight = image.height;

      var canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      var ctx = canvas.getContext('2d');

      // Отступы для средней полоски
      var leftMarginMiddleStrip = 150;
      var rightMarginMiddleStrip = 150;

      // Вычисляем высоту каждой полоски
      var stripHeight = canvasHeight / 3;

      // Рисуем верхнюю полоску
      ctx.drawImage(image, 0, 0, canvasWidth, stripHeight, 0, 0, canvasWidth, stripHeight);

      // Рисуем горизонтальную линию между первой и второй полоской
      ctx.beginPath();
      ctx.moveTo(0, stripHeight);
      ctx.lineTo(canvasWidth, stripHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем среднюю полоску с отступами
      ctx.drawImage(image, leftMarginMiddleStrip, stripHeight, canvasWidth - leftMarginMiddleStrip - rightMarginMiddleStrip, stripHeight, leftMarginMiddleStrip, stripHeight, canvasWidth - leftMarginMiddleStrip - rightMarginMiddleStrip, stripHeight);

      // Рисуем горизонтальную линию между второй и третьей полоской
      ctx.beginPath();
      ctx.moveTo(0, 2 * stripHeight);
      ctx.lineTo(canvasWidth, 2 * stripHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем нижнюю полоску
      ctx.drawImage(image, 0, 2 * stripHeight, canvasWidth, stripHeight, 0, 2 * stripHeight, canvasWidth, stripHeight);

      var img = document.getElementById('main_img_src');
      img.src = canvas.toDataURL('image/png');
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

const moduleMod27Controller = (file) => {
  if (!file) return;

    var reader = new FileReader();
    reader.onload = function(e) {
      var image = new Image();
      image.onload = function() {
        var canvasWidth = image.width;
        var canvasHeight = image.height;

        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        var ctx = canvas.getContext('2d');

        // Вычисляем высоту каждой полоски
        var stripHeight = canvasHeight / 4;

        // Рисуем верхнюю полоску
        ctx.drawImage(image, 0, 0, canvasWidth, stripHeight, 0, 0, canvasWidth, stripHeight);

        // Рисуем горизонтальную линию между первой и второй полоской
        ctx.beginPath();
        ctx.moveTo(0, stripHeight);
        ctx.lineTo(canvasWidth, stripHeight);
        ctx.lineWidth = 20;
        ctx.strokeStyle = 'white';
        ctx.stroke();

        // Рисуем вторую полоску
        ctx.drawImage(image, 0, stripHeight, canvasWidth, stripHeight, 0, stripHeight, canvasWidth, stripHeight);

        // Рисуем горизонтальную линию между второй и третьей полоской
        ctx.beginPath();
        ctx.moveTo(0, 2 * stripHeight);
        ctx.lineTo(canvasWidth, 2 * stripHeight);
        ctx.lineWidth = 20;
        ctx.strokeStyle = 'white';
        ctx.stroke();

        // Рисуем третью полоску
        ctx.drawImage(image, 0, 2 * stripHeight, canvasWidth, stripHeight, 0, 2 * stripHeight, canvasWidth, stripHeight);

        // Рисуем горизонтальную линию между третьей и четвертой полоской
        ctx.beginPath();
        ctx.moveTo(0, 3 * stripHeight);
        ctx.lineTo(canvasWidth, 3 * stripHeight);
        ctx.lineWidth = 20;
        ctx.strokeStyle = 'white';
        ctx.stroke();

        // Рисуем четвертую полоску
        ctx.drawImage(image, 0, 3 * stripHeight, canvasWidth, stripHeight, 0, 3 * stripHeight, canvasWidth, stripHeight);

        var img = document.getElementById('main_img_src');
        img.src = canvas.toDataURL('image/png');
      };
      image.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

const moduleMod28Controller = (file) => {
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      var canvasWidth = image.width;
      var canvasHeight = image.height;

      var canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      var ctx = canvas.getContext('2d');

      // Вычисляем высоту каждой полоски
      var stripHeight = canvasHeight / 4;

      // Отступы слева и справа для каждого блока
      var leftMarginFirstBlock = 0;
      var leftMarginSecondBlock = 200;
      var leftMarginThirdBlock = 0;
      var leftMarginFourthBlock = 200;

      var rightMarginFirstBlock = 200;
      var rightMarginSecondBlock = 0;
      var rightMarginThirdBlock = 200;
      var rightMarginFourthBlock = 0;

      // Рисуем верхнюю полоску
      ctx.drawImage(image, leftMarginFirstBlock, 0, canvasWidth - leftMarginFirstBlock - rightMarginFirstBlock, stripHeight, leftMarginFirstBlock, 0, canvasWidth - leftMarginFirstBlock - rightMarginFirstBlock, stripHeight);

      // Рисуем горизонтальную линию между первой и второй полоской
      ctx.beginPath();
      ctx.moveTo(leftMarginFirstBlock, stripHeight);
      ctx.lineTo(canvasWidth - rightMarginFirstBlock, stripHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем вторую полоску
      ctx.drawImage(image, leftMarginSecondBlock, stripHeight, canvasWidth - leftMarginSecondBlock - rightMarginSecondBlock, stripHeight, leftMarginSecondBlock, stripHeight, canvasWidth - leftMarginSecondBlock - rightMarginSecondBlock, stripHeight);

      // Рисуем горизонтальную линию между второй и третьей полоской
      ctx.beginPath();
      ctx.moveTo(leftMarginThirdBlock, 2 * stripHeight);
      ctx.lineTo(canvasWidth - rightMarginThirdBlock, 2 * stripHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем третью полоску
      ctx.drawImage(image, leftMarginThirdBlock, 2 * stripHeight, canvasWidth - leftMarginThirdBlock - rightMarginThirdBlock, stripHeight, leftMarginThirdBlock, 2 * stripHeight, canvasWidth - leftMarginThirdBlock - rightMarginThirdBlock, stripHeight);

      // Рисуем горизонтальную линию между третьей и четвертой полоской
      ctx.beginPath();
      ctx.moveTo(leftMarginFourthBlock, 3 * stripHeight);
      ctx.lineTo(canvasWidth - rightMarginFourthBlock, 3 * stripHeight);
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // Рисуем четвертую полоску
      ctx.drawImage(image, leftMarginFourthBlock, 3 * stripHeight, canvasWidth - leftMarginFourthBlock - rightMarginFourthBlock, stripHeight, leftMarginFourthBlock, 3 * stripHeight, canvasWidth - leftMarginFourthBlock - rightMarginFourthBlock, stripHeight);

      var img = document.getElementById('main_img_src');
      img.src = canvas.toDataURL('image/png');
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
