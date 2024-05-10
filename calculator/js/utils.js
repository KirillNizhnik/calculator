const modules = {
  mod_1: 'd_mod_1.jpg',
  mod_2: moduleMod2Controller,
  mod_3: moduleMod3Controller,
  mod_4: moduleMod4Controller,
  mod_5: moduleMod5Controller,
  mod_6: moduleMod6Controller,
  mod_7: moduleMod7Controller,
  mod_8: moduleMod8Controller,
  mod_9: moduleMod9Controller,
  mod_10: moduleMod10Controller,
  mod_11: moduleMod11Controller,
  mod_12: moduleMod12Controller,
  mod_13: moduleMod13Controller,
  mod_14: moduleMod14Controller,
  mod_15: moduleMod15Controller,
  mod_16: moduleMod16Controller,
  mod_17: moduleMod17Controller,
  mod_18: moduleMod18Controller,
  mod_19: moduleMod19Controller,
  mod_20: moduleMod20Controller,
  mod_21: moduleMod21Controller,
  mod_22: moduleMod22Controller,
  mod_23: moduleMod23Controller,
  mod_24: moduleMod24Controller,
  mod_25: moduleMod25Controller,
  mod_26: moduleMod26Controller,
  mod_27: moduleMod27Controller,
  mod_28: moduleMod28Controller
}

const changeModule = (modName) => {
  const mainImgSrc = document.getElementById('image_storage_mod_1').src;
  const urlSrc = mainImgSrc.split('/');
  const modFunc = modules[modName];
  const isInStorage = checkStorage(modName);
  if (!isInStorage) {
    if (urlSrc && urlSrc.length > 1 && urlSrc[urlSrc.length - 1] === 'd_mod_1.jpg') {
      const img = new Image();
      img.onload = function() {
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          var imageDataUrl = canvas.toDataURL('image/png');
          const res = dataURItoBlob(imageDataUrl);
          modFunc(res);
      };

      img.src = mainImgSrc;

    } else {
      const image = uploadImage(mainImgSrc);
      modFunc(image);
    }
  }
}

const checkStorage = (modName) => {
  const localStorageImage = document.getElementById(`image_storage_${modName}`);
  if (localStorageImage) {
    const img = document.createElement('img');
    img.src = localStorageImage.src;
    img.id = "main_img_src";

    var mainImgBlock = document.getElementById('main_img');
    mainImgBlock.innerHTML = '';
    mainImgBlock.appendChild(img);
    return true;
  } else return false;
}

const uploadImage = (imageData) => {
  const blob = dataURItoBlob(imageData);
  return new File([blob], 'image.jpg');
}

const dataURItoBlob = (dataURI) => {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

const changeModulePrew = (module) => {
  $(".mod_part").removeClass("active");
  $(module).find(".mod_part").addClass("active");
  const img = module.querySelector('img');
  const src = img.getAttribute('src');
  let modName = src.substring(src.lastIndexOf('/') + 1);
  modName = modName.substring(0, modName.lastIndexOf('.'));
  const modNum = modName.split('_')[1];
  changeModule(modName);
  changeTablePicType('module_type', modNum);
}

const changeToSingle = () => {
  changeModule('mod_1');
  const curTab = document.querySelector('#module_type');
  curTab.classList.remove('pic_type_active');

  const actTab = document.querySelector('#single_type');
  actTab.classList.add('pic_type_active');
  changeTablePicType('single_type');
}

const changeToModule = () => {
  const modNum = Math.floor(Math.random() * (20 - 2 + 1)) + 2;
  changeModule(`mod_${modNum}`);
  const curTab = document.querySelector('#single_type');
  curTab.classList.remove('pic_type_active');

  const actTab = document.querySelector('#module_type');
  actTab.classList.add('pic_type_active');
  changeTablePicType('module_type', modNum);
}

const changeTablePicType = (type, modNum) => {
  if (type === 'single_type') {
    $("#td_pic_type").text("Одиночная");
  } else {
    $("#td_pic_type").text('Модульная');
    $("#td_mod_type").text(`#${modNum}`);
  }
}

const changePrice = () => {
  const picWidth = $('#pic_width_inp').val();
  const picHeight = $('#pic_height_inp').val();
  const modNum = $('#td_mod_type').text();

  let modCoef = 1;
  if (modNum === '#2' || modNum === '#3' || modNum === '#4' || modNum === '#5') {
    modCoef = 2;
  } else if (modNum === '#6' || modNum === '#7' || modNum === '#8' || modNum === '#9' || modNum === '#10' || modNum === '#11' || modNum === '#12' || modNum === '#13'  || modNum === '#26' || modNum === '#14') {
    modCoef = 3;
  } else if (modNum === '#15' || modNum === '#16' || modNum === '#17' || modNum === '#18' || modNum === '#19' || modNum === '#28' || modNum === '#27') {
    modCoef = 4;
  } else if (modNum === '#20' || modNum === '#21' || modNum === '#22' || modNum === '#23' || modNum === '#24' || modNum === '#25') {
    modCoef = 5;
  }

  const nW = picWidth / 100;
  const nH = picHeight / 100;
  const res = (50 + (nW + 0.11) * (nH + 0.11) * 330 + (nW + nH) * 2 * 58) * modCoef;
  const base = Math.round(res);
  $("#update_price_1").text(`${base},00 грн`);
  $("#update_price_2").text(`${base},00 грн`);
  changeSegments(modCoef, modNum, picWidth, picHeight);
}

const changeSegments = (modCoef, modNum, picWidth, picHeight) => {
  let s = '';
  if (modCoef === 1) {
      s = `<b>Сегмент №1:</b> ${picWidth} х ${picHeight} см.`
  } else if (modNum === '#2') {
    s = `<b>Сегмент №1:</b> ${picWidth / 2} х ${picHeight} см.<br>`
    s += `<b>Сегмент №2:</b> ${picWidth / 2} х ${picHeight} см.`
  } else if (modNum === '#3') {
    s = `<b>Сегмент №1:</b> ${picWidth} х ${picHeight / 2} см.<br>`
    s += `<b>Сегмент №2:</b> ${picWidth} х ${picHeight / 2} см.`
  } else if (modNum === '#4') {
    s = `<b>Сегмент №1:</b> ${picWidth} х ${picHeight / 2} см.<br>`
    s += `<b>Сегмент №2:</b> ${picWidth} х ${picHeight / 2} см.`
  } else if (modNum === '#5') {
    s = `<b>Сегмент №1:</b> ${picWidth / 2} х ${picHeight} см.<br>`
    s += `<b>Сегмент №2:</b> ${picWidth / 2} х ${picHeight} см.`
  } else if (modNum === '#6') {
    const segment1Width = Math.floor(picWidth / 4); // 1/4 от ширины
    const segment1Height = Math.floor(picHeight / 1.68); // 1/2 от высоты
    const segment2Width = Math.floor(picWidth / 2); // 1/2 от ширины
    const segment2Height = picHeight;
    const segment1 = { width: segment1Width, height: segment1Height };
    const segment2 = { width: segment2Width, height: segment2Height };
    const segment3 = { width: segment1Width, height: segment1Height };

    s = `<b>Сегмент №1:</b> ${segment1Width} х ${segment1Height} см.<br>`
    s += `<b>Сегмент №2:</b> ${segment2Width} х ${segment2Height} см.<br>`
    s += `<b>Сегмент №3:</b> ${segment1Width} х ${segment1Height} см.<br>`
  } else if (modNum === '#7') {
    const segment1Width = Math.floor(picWidth / 4);
    const segment1Height = picHeight;
    const segment2Width = Math.floor(picWidth / 2);
    const segment2Height = Math.floor(picHeight / 1.42);
    const segment1 = { width: segment1Width, height: segment1Height };
    const segment2 = { width: segment2Width, height: segment2Height };
    const segment3 = { width: segment1Width, height: segment1Height };

    s = `<b>Сегмент №1:</b> ${segment1Width} х ${segment1Height} см.<br>`
    s += `<b>Сегмент №2:</b> ${segment2Width} х ${segment2Height} см.<br>`
    s += `<b>Сегмент №3:</b> ${segment1Width} х ${segment1Height} см.<br>`
  } else if (modNum === '#8') {
    const segment1Width = Math.ceil(picWidth * 7 / 20);
    const segment2Width = Math.ceil(picWidth * 3 / 10);
    const segment3Width = segment1Width;

    const segment1Height = Math.ceil(picHeight * 95 / 198);
    const segment2Height = picHeight;
    const segment3Height = segment1Height;


    s = `<b>Сегмент №1:</b> ${segment1Width} х ${segment1Height} см.<br>`
    s += `<b>Сегмент №2:</b> ${segment2Width} х ${segment2Height} см.<br>`
    s += `<b>Сегмент №3:</b> ${segment1Width} х ${segment1Height} см.<br>`
  } else if (modNum === '#9') {
    const segment1Width = Math.ceil(picWidth / 3);
    const segment2Width = segment1Width;
    const segment3Width = segment1Width;

    const segment1Height = Math.ceil(picHeight * 176 / 252);
    const segment2Height = picHeight;
    const segment3Height = segment1Height;


    s = `<b>Сегмент №1:</b> ${segment1Width} х ${segment1Height} см.<br>`
    s += `<b>Сегмент №2:</b> ${segment2Width} х ${segment2Height} см.<br>`
    s += `<b>Сегмент №3:</b> ${segment1Width} х ${segment1Height} см.<br>`
  } else if (modNum === '#10') {
    const segmentWidth = Math.ceil(picWidth / 3);
    const segmentHeight = picHeight;

    s = `<b>Сегмент №1:</b> ${segmentWidth} х ${segmentHeight} см.<br>`
    s += `<b>Сегмент №2:</b> ${segmentWidth} х ${segmentHeight} см.<br>`
    s += `<b>Сегмент №3:</b> ${segmentWidth} х ${segmentHeight} см.<br>`
  } else if (modNum === '#11') {
    const segmentWidth = Math.ceil(picWidth / 3);
    const segmentHeight = Math.ceil(picHeight / 1.2);

    s = `<b>Сегмент №1:</b> ${segmentWidth} х ${segmentHeight} см.<br>`
    s += `<b>Сегмент №2:</b> ${segmentWidth} х ${segmentHeight} см.<br>`
    s += `<b>Сегмент №3:</b> ${segmentWidth} х ${segmentHeight} см.<br>`
  } else if (modNum === '#12') {
    const segmentWidth = picWidth;
    const segmentHeight = Math.ceil(picHeight / 3);

    s = `<b>Сегмент №1:</b> ${segmentWidth} х ${segmentHeight} см.<br>`
    s += `<b>Сегмент №2:</b> ${segmentWidth} х ${segmentHeight} см.<br>`
    s += `<b>Сегмент №3:</b> ${segmentWidth} х ${segmentHeight} см.<br>`
  } else if (modNum === '#13') {
    const segmentHeight = Math.floor(picHeight / 3);
    const segmentWidth1 = Math.max(Math.floor(picWidth * 0.8), 1);
    const segmentWidth2 = picWidth;


    s = `<b>Сегмент №1:</b> ${segmentWidth1} х ${segmentHeight} см.<br>`
    s += `<b>Сегмент №2:</b> ${segmentWidth2} х ${segmentHeight} см.<br>`
    s += `<b>Сегмент №3:</b> ${segmentWidth1} х ${segmentHeight} см.<br>`
  } else if (modNum === '#14') {
    const segmentWidth = Math.floor(picWidth / 3);
       const segmentHeight = Math.floor(picHeight * 85 / 107);


    s = `<b>Сегмент №1:</b> ${segmentWidth} х ${segmentHeight} см.<br>`
    s += `<b>Сегмент №2:</b> ${segmentWidth} х ${segmentHeight} см.<br>`
    s += `<b>Сегмент №3:</b> ${segmentWidth} х ${segmentHeight} см.<br>`
  } else if (modNum === '#15') {
    const numSegments = 4; 

    const segmentWidth = picWidth / numSegments;
    const segmentHeight = (picHeight / numSegments) * 3;


    s = `<b>Сегмент №1:</b> ${segmentWidth} х ${segmentHeight} см.<br>`
    s += `<b>Сегмент №2:</b> ${segmentWidth} х ${segmentHeight} см.<br>`
    s += `<b>Сегмент №3:</b> ${segmentWidth} х ${segmentHeight} см.<br>`
    s += `<b>Сегмент №4:</b> ${segmentWidth} х ${segmentHeight} см.<br>`
  }

  $("#pic_parts").html(s);
}
