const createNote = function () {

    const rowIn = document.getElementsByClassName('row');

    const bootSt = document.createElement('div');
    const stickerIn = document.createElement('div');

    /////
    //ponizej środek stickerIn

    const buttonIn = document.createElement('button');
    const iIn = document.createElement('i');

    const aIn = document.createElement('a');
    const textIn = document.createElement('div');


    buttonIn.classList.add('btn delete-sticker close');
    iIn.classList.add('fa fa-times fa-fw');
    aIn.classList.add('sticker-header');
    textIn.classList.add('sticker-content');

    buttonIn.appendChild(iIn);

    //tekst wewnątrz stickerContent:
    textIn.innerHTML = //to co wpisze user - wnętrze.

    //button i inne powyzej tez trza dodać do wyzszego diva:
    stickerIn.appendChild(buttonIn);
    stickerIn.appendChild(aIn);
    stickerIn.appendChild(textIn);
    ////

    bootSt.classList.add('col-sm-6 col-md-4 col-xl-3');
    stickerIn.classList.add('sticker');

    rowIn.appendChild(bootSt);
    bootSt.appendChild(stickerIn);
};

const goGo = () => {
    const getButton = document.getElementsByClassName('btn btn-outline-secondary');
    return getButton.addEventListener('click', createNote);
};

goGo();


