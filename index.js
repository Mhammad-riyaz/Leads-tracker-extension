let myLeads = [];
const inputEl = document.getElementById("input");
const saveInput = document.getElementById("save-input");
const remove = document.getElementById("delete");
const saveTab = document.getElementById("save-tab");
let ulEl = document.getElementById("ul-el");

const localStorageData = JSON.parse(localStorage.getItem("myValues"));

if (localStorageData) {
  myLeads = localStorageData;
  render(myLeads);
}

saveInput.addEventListener("click", function clicked() {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myValues", JSON.stringify(myLeads));
  render(myLeads);
});

saveTab.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myValues", JSON.stringify(myLeads));
    render(myLeads);
  });
});
function render(temp) {
  let listItems = "";
  for (let i = 0; i < temp.length; i++) {
    listItems += `<li>
        <a href ='${temp[i]}' target = '_blank'>${temp[i]}</a>
        </li>`;
  }
  ulEl.innerHTML = listItems;
}

remove.addEventListener("dblclick", function remove() {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});
