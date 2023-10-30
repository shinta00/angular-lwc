
function subcribeToLwc() {
    window.parent.postMessage('getData', '*')
    window.addEventListener('message', function(event) {
        createTable(JSON.parse(event.data));
    });
}

function createTable(contacts) {
    const table = document.getElementsByTagName("table")[0];
    let tbody = document.createElement("tbody");
    let thead = document.createElement("thead");
  
    contacts.forEach((item, index) => {
        let row = document.createElement("tr");
        let head = document.createElement("tr");
        Object.keys(item).forEach(key => {
            if(!key.toLowerCase().includes('id')){
                if(index == 0){
                    const headItem = document.createElement("th");
                    const headItemText = document.createTextNode(key);
                    headItem.appendChild(headItemText);
                    head.appendChild(headItem);
                }
                const cell = document.createElement("td");
                const text = document.createTextNode(item[key]);
                cell.appendChild(text);
                row.appendChild(cell);
            }
        });
        if(index == 0){
            thead.appendChild(head);
        }
        row = this.createCellButton(row, item.Id);
        tbody.appendChild(row);
    });
    this.loading(false);
    table.appendChild(tbody);
    table.appendChild(thead);
  }

  function createCellButton(row, id){
    const cell = document.createElement("td");
    const button = document.createElement("button");
    const icon = document.createElement("i");
    button.setAttribute("class", 'btn');
    button.setAttribute("onclick", 'handleDetete(event)');
    button.setAttribute("id", id);
    icon.setAttribute("class", 'fa fa-trash');
    button.appendChild(icon);
    cell.appendChild(button);
    row.appendChild(cell);
    return row
  }
  function handleDetete(event){
    const tbody = document.getElementsByTagName("tbody")[0];
    const thead = document.getElementsByTagName("thead")[0];
    tbody.remove();
    thead.remove();
    this.loading(true);
    window.parent.postMessage(`delete-contact ${event.currentTarget.id}`, '*');
  }
  function loading(isLoading){
    console.log('-.----------------------------------')
    const spinner = document.getElementById('spinner');
    isLoading ? spinner.setAttribute('style','') : spinner.setAttribute('style','display: none;');
  }