import interfaceCRUD from "./interface.js";
import { User } from "./user.js";
import { Role } from "./role.js";
import data from "./data.json" assert { type: "json" };

export class crudApp implements interfaceCRUD {
  users: User[];
  col: string[];
  category: string[];
  data: any[];
  tableContainer: HTMLDivElement;
  td: HTMLElement;
  constructor() {
    this.category = ["Super Admin", "Admin", "Subscriber"];
    this.data = data;
    this.users = [];
    this.users = [];
    this.col = [];
    this.tableContainer = document.getElementById(
      "container"
    )! as HTMLDivElement;
  }
  loadData(): void {
    this.data.forEach((element) => {
      this.users.push(
        new User({
          id: element.id,
          firstName: element.firstName,
          middleName: element.middleName,
          lastName: element.lastName,
          email: element.email,
          phone: element.phone,
          role:
            element.role === "Super Admin"
              ? Role.superadmin
              : element.role === "Admin"
              ? Role.admin
              : Role.subscriber,
          address: element.address,
        })
      );
    });
  }
  createTable(): void {
    for (let i = 0; i < this.data.length; i++) {
      for (let key in this.data[i]) {
        if (this.col.indexOf(key) === -1) {
          this.col.push(key);
        }
      }
    }
    let table = document.createElement("table");
    table.setAttribute("id", "dataTable");
    var tr = table.insertRow(-1);
    for (let h = 0; h <= this.col.length; h++) {
      let th = document.createElement("th");
      if (this.col[h] !== undefined) {
        th.innerHTML = this.col[h];
        tr.appendChild(th);
      } else {
        th.innerHTML = "Options";
        tr.appendChild(th);
      }
    }
    //add rows

    for (let i = 0; i < this.data.length; i++) {
      tr = table.insertRow(-1);
      for (let j = 0; j < this.col.length; j++) {
        let tabcell = tr.insertCell(-1);
        tabcell.innerHTML = this.data[i][this.col[j]];
      }
      this.td = document.createElement("td");

      ///*** Edit*/
      tr.appendChild(this.td);
      let btEdit = document.createElement("button");
      btEdit.innerHTML = "Edit";
      btEdit.setAttribute("id", "Edit");
      btEdit.addEventListener("click", (e: Event) => this.update(e));
      this.td.appendChild(btEdit);
      ////****Delete */

      tr.appendChild(this.td);
      let btDelete = document.createElement("button");
      btDelete.innerHTML = "Delete";
      btDelete.setAttribute("id", "Delete");
      btDelete.addEventListener("click", (e: Event) => this.delete(e));
      this.td.appendChild(btDelete);
    }
    // ADD A ROW AT THE END WITH BLANK TEXTBOXES AND A DROPDOWN LIST (FOR NEW ENTRY).

    tr = table.insertRow(-1); // CREATE THE LAST ROW.

    for (let j = 0; j < this.col.length; j++) {
      let newCell = tr.insertCell(-1);
      if (j >= 1) {
        if (j == 6) {
          // WE'LL ADD A DROPDOWN LIST AT THE SECOND COLUMN (FOR Category).

          let select = document.createElement("select"); // CREATE AND ADD A DROPDOWN LIST.
          select.innerHTML = '<option value=""></option>';
          for (let k = 0; k < this.category.length; k++) {
            select.innerHTML =
              select.innerHTML +
              '<option value="' +
              this.category[k] +
              '">' +
              this.category[k] +
              "</option>";
          }
          newCell.appendChild(select);
        } else {
          let tBox = document.createElement("input"); // CREATE AND ADD A TEXTBOX.
          tBox.setAttribute("type", "text");
          tBox.setAttribute("value", "");
          newCell.appendChild(tBox);
        }
      }
    }

    this.td = document.createElement("td");
    tr.appendChild(this.td);

    let btNew = document.createElement("button");
    btNew.innerHTML = "Create";
    btNew.setAttribute("id", "New");
    btNew.addEventListener("click", (e: Event) => this.create(e));
    this.td.appendChild(btNew);

    this.tableContainer.innerHTML = "";
    this.tableContainer.appendChild(table);
  }

  update(e: Event) {
    let act = e.target! as HTMLElement;
    let tr = act.parentElement.parentElement! as HTMLTableRowElement;
    let nextSibling = act.nextElementSibling! as HTMLElement;
    if (act.innerHTML === "Edit") {
      tr.contentEditable = "true";
      act.innerHTML = "Save";
      nextSibling.innerHTML = "Cancel";
      nextSibling.contentEditable = "false";
      act.contentEditable = "false";
    } else {
      tr.contentEditable = "false";
      act.innerHTML = "Edit";
      nextSibling.innerHTML = "Delete";
    }
  }

  delete(e: Event): void {
    let active = e.target! as HTMLElement;
    let tr = active.parentElement.parentElement! as HTMLTableRowElement;
    let index = tr.rowIndex;
    let btEdit = document.getElementById("Edit");
    if (active.innerHTML === "Delete") {
      // tr.remove();
      tr.parentElement.removeChild(tr);
      this.data.splice(index - 1, 1);
    } else if (active.innerHTML === "Cancel") {
      tr.contentEditable = "false";
      for (let i = 0; i < tr.children.length - 1; i++) {
        tr.children[i].innerHTML = this.data[index - 1][this.col[i]];
      }
      active.innerHTML = "Delete";
      btEdit.innerHTML = "Edit";
    }
  }

  create(e: Event): void {
    let act = e.target! as HTMLElement;
    let tr = act.parentElement.parentElement! as HTMLTableRowElement;
    let activeRow = tr.rowIndex;
    let tab = document.getElementById("container")! as HTMLTableElement;

    let rows = tab.querySelectorAll("tr");
    let row = rows[activeRow];
    let obj = {};

    // ADD NEW VALUE TO users ARRAY.
    for (let i = 1; i < this.col.length; i++) {
      let td = row.getElementsByTagName("td")[i];

      let txtVal = (<HTMLInputElement>td.childNodes[0]).value;

      if (txtVal != "") {
        obj[this.col[i]] = txtVal.trim();
      } else {
        obj = "";
        alert("all fields are compulsory");
        break;
      }
    }

    obj[this.col[0]] = this.data.length + 1; // NEW ID.

    if (Object.keys(obj).length > 0) {
      // CHECK IF OBJECT IS NOT EMPTY.
      this.data.push(obj); // PUSH (ADD) DATA TO THE JSON ARRAY.
      this.createTable();
    }
  }

  read(): void {}

  refresh(): void {
    this.tableContainer.innerHTML = " ";
    setTimeout(() => {
      this.tableContainer.removeChild(this.tableContainer.firstChild);
      this.createTable();
    }, 100);
  }
}
