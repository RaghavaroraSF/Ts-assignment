import { crudApp } from "./index.js";
let dt = new Date();
let dateTime = document.getElementById("date");
dateTime.classList.add("hidden");

class App {
  loadBtn: HTMLButtonElement;
  refreshBtn: HTMLButtonElement;
  _crudUser: crudApp;

  date: string = "";
  constructor() {
    this.loadBtn = document.getElementById("loadBtn")! as HTMLButtonElement;
    this.refreshBtn = document.getElementById(
      "refreshBtn"
    )! as HTMLButtonElement;
    this._crudUser = new crudApp();
    this.loadBtn.addEventListener("click", () => this.loadData());
    this.refreshBtn.addEventListener("click", () => this.refreshData());
    this.refreshBtn.style.display = "none";
  }

  updateDate() {
    const datetime = document.getElementById("datetime");
    datetime!.innerHTML = `Updated on - ${this.date.replace(",", " at ")}`;
  }
  loadData() {
    this._crudUser = new crudApp();
    this._crudUser.createTable();
    this.refreshBtn.style.display = "block";
    this.loadBtn.style.display = "none";
    dateTime.classList.remove("hidden");
    document.getElementById("datetime").innerHTML = dt.toLocaleString();
  }
  refreshData() {
    this._crudUser.refresh();
    dateTime.classList.remove("hidden");
    document.getElementById("datetime").innerHTML = dt.toLocaleString();
  }
}
new App();