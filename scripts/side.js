const sideEdit = document.querySelector('.side_edit');
const sideEditContainer = document.querySelector('.side_edit_configuration');
const shoSide = document.querySelector('.show_side');

if (sideEdit && sideEditContainer) {
  sideEdit.addEventListener('click', () => {
    sideEditContainer.style.display = sideEditContainer.style.display === "flex" ? "none" : "flex";
  });
}
if (shoSide && sideEditContainer) {
  shoSide.addEventListener('click', () => {
    sideEditContainer.style.display = sideEditContainer.style.display === "none" ? "none" : "none";
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