const draggableList = document.getElementById('draggable-list')
const check = document.getElementById('check')


const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
  ];

// Store listItems  
const listItems = []

let dragStartIndex;

createList();

// Insert list items to DOM
function createList(){
    [...richestPeople]
    .map(item => ({value : item, sort:Math.random()}))
    .sort((a,b) => a.sort-b.sort)
    .map(item => item.value)
    .forEach((person,idx)=>{
        const listItem = document.createElement('li')

        listItem.setAttribute('data-index',idx)

        listItem.innerHTML = `
        <span class="number">${idx + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;
        listItems.push(listItem)
        draggableList.appendChild(listItem)
    });

    addEventListeners()
}

function dragStart(){
    // console.log('Event : ' , 'dragstart');
    dragStartIndex = +this.closest('li').getAttribute('data-index')
    console.log(dragStartIndex);
}
function dragOver(e){
    // console.log('Event : ' , 'dragOver');
    e.preventDefault();
}
function dragDrop(){
    // console.log('Event : ' , 'dragDrop');
    const dragEndIndex = +this.getAttribute('data-index')
    swapItems(dragStartIndex,dragEndIndex)

    this.classList.remove('over')
}

// Swap list items that are drag and drop
function swapItems(fromIndex,toIndex){
    const itemOne = listItems[fromIndex].querySelector('.draggable')
    const itemTwo = listItems[toIndex].querySelector('.draggable')

    listItems[fromIndex].appendChild(itemTwo)
    listItems[toIndex].appendChild(itemOne)
}
function dragEnter(){
    // console.log('Event : ' , 'dragEnter');
    this.classList.add('over')
}
function dragLeave(){
    // console.log('Event : ' , 'dragLeave');
    this.classList.remove('over')
}

// Check the order of list items
function checkOrder(){
    listItems.forEach((listItem,index) =>{
        const personName = listItem.querySelector('.draggable').innerText.trim();

        if(personName !== richestPeople[index]){
            listItem.classList.add('wrong')
        }else{
            listItem.classList.remove('wrong')
            listItem.classList.add('right')
        }
    })
}

function addEventListeners(){
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li')

    draggables.forEach(draggable =>{
        draggable.addEventListener('dragstart',dragStart)
    })

    dragListItems.forEach(item => {
        item.addEventListener('dragover',dragOver);
        item.addEventListener('drop',dragDrop);
        item.addEventListener('dragenter',dragEnter);
        item.addEventListener('dragleave',dragLeave);
    })
}

check.addEventListener('click',checkOrder)