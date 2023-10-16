
// https://datatables.net/reference/option/
// https://datatables.net/examples/index

// global options
// https://datatables.net/reference/option/

/*
function transformData (dataArray) {
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  const resultMap = new Map();

  dataArray.forEach((record, index) => {
    const employeeID = record.fieldData.id_employee;

    // Initialize object if employeeID is not yet in resultMap
    if (!resultMap.has(employeeID)) {
      const employeeName = record.portalData.employeeHours_EMPLOYEE[0]['employeeHours_EMPLOYEE::nameDisplay_a'];
      const department = record.portalData.employeeHours_EMPLOYEE[0]['employeeHours_EMPLOYEE::department'];
      resultMap.set(employeeID, {
        ID: index,
        employeeID,
        department,
        employeeName,
        allocated: 0,
        inout: null,
        hoursWorked: 0,
      });
    }

    const currentData = resultMap.get(employeeID);

    if (record.fieldData.totalHours_c > 0) {
      currentData.allocated += record.fieldData.totalHours_c;
    };

    const creationDate = new Date(record.fieldData.zCreationTimestamp).toISOString().split('T')[0];

    // Excluding records created today for hoursWorked
    if (creationDate !== today) {
      currentData.hoursWorked += record.fieldData.totalHours_c;
    }

    // Set inout condition
    if (
      record.fieldData.timestampIN &&
      new Date(record.fieldData.timestampIN).toISOString().split('T')[0] === today &&
      !record.fieldData.timestampOUT
    ) {
      currentData.inout = "IN";
    }
  });

  // Convert Map to Array
  const resultArray = Array.from(resultMap.values());

  return resultArray;
}
*/

let table;
let mainTable;

window.renderContacts = (data) => {
  // Create table
  const table = document.createElement("table");
  table.className = "table";

  // Create table header
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headerRow.style.position = "sticky";
  headerRow.style.top = "0";
  headerRow.style.zIndex = "1"; // Optional, to ensure the row is above other elements
  headerRow.style.backgroundColor = "#FFFFFF";

  ["Contact"].forEach(text => {
    const th = document.createElement("th");
    th.innerText = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement("tbody");
  data.forEach(item => {
    const row = document.createElement("tr");
    const headers = ["ID", "dapiID", "Name"]
    row.addEventListener("click", function () {
      const cellData = {};
      // Loop through each cell in the row
      for (let i = 0; i < this.cells.length; i++) {
        const header = headers[i];
        // Get the content of the cell
        const cellContent = this.cells[i].innerText;
        // Assign the content to the object
        cellData[header] = cellContent;
      }
      console.log(cellData);
      const obj = { record: cellData, method: "contactRowClick" };
      FileMaker.PerformScript("customers . loadWebViewer . worksheets . callbacks", JSON.stringify(obj)); // Log or use the rowData
    });

    // Add hidden id
    const recordID = document.createElement("td");
    recordID.innerText = item["customerContacts::__ID"];
    recordID.style.display = "none"; // This will hide the cell
    row.appendChild(recordID);

    // Add hidden dataApiID
    const dapiID = document.createElement("td");
    dapiID.innerText = item.recordId;
    dapiID.style.display = "none"; // This will hide the cell
    row.appendChild(dapiID);

    // Add Name
    const nameCell = document.createElement("td");
    nameCell.innerText = item["customerContacts::Name_of_Relation"];
    if (item["customerContacts::Role"] === "Primary Contact") {
      nameCell.style.fontWeight = "bold";
    }
    row.appendChild(nameCell);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  // Append the table to the worksheetHeader div
  document.getElementById("contacts").appendChild(table);
}

window.renderPhones = (data) => {
  // Create table
  const table = document.createElement("table");
  table.className = "table";

  // Create table header
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headerRow.style.position = "sticky";
  headerRow.style.top = "0";
  headerRow.style.zIndex = "1"; // Optional, to ensure the row is above other elements
  headerRow.style.backgroundColor = "#FFFFFF";
  ["Label", "Phone", "Ext"].forEach(text => {
    const th = document.createElement("th");
    th.innerText = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement("tbody");
  data.forEach(item => {
    const row = document.createElement("tr");
    const headers = ["ID", "dapiID", "Label", "Phone", "Ext"]
    row.addEventListener("click", function () {
      const cellData = {};
      // Loop through each cell in the row
      for (let i = 0; i < this.cells.length; i++) {
        const header = headers[i];
        // Get the content of the cell
        const cellContent = this.cells[i].innerText;
        // Assign the content to the object
        cellData[header] = cellContent;
      }
      console.log(cellData);
      const obj = { record: cellData, method: "phonesRowClick" };
      FileMaker.PerformScript("customers . loadWebViewer . worksheets . callbacks", JSON.stringify(obj)); // Log or use the rowData
    });

    // Add hidden id
    const recordID = document.createElement("td");
    recordID.innerText = item["customersPhone::__ID"];
    recordID.style.display = "none"; // This will hide the cell
    row.appendChild(recordID);

    // Add hidden dataApiID
    const dapiID = document.createElement("td");
    dapiID.innerText = item.recordId;
    dapiID.style.display = "none"; // This will hide the cell
    row.appendChild(dapiID);

    // Add Label
    const labelCell = document.createElement("td");
    labelCell.innerText = item["customersPhone::Label"];
    row.appendChild(labelCell);

    // Add Number
    const noCell = document.createElement("td");
    noCell.innerText = item["customersPhone::Number"];
    row.appendChild(noCell);

    // Add Ext
    const extCell = document.createElement("td");
    extCell.innerText = item["customersPhone::Extension"];
    row.appendChild(extCell);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  // Append the table to the worksheetHeader div
  document.getElementById("phones").appendChild(table);
}

window.renderEmail = (data) => {
  // Create table
  const table = document.createElement("table");
  table.className = "table";

  // Create table header
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headerRow.style.position = "sticky";
  headerRow.style.top = "0";
  headerRow.style.zIndex = "1"; // Optional, to ensure the row is above other elements
  headerRow.style.backgroundColor = "#FFFFFF";
  ["Label", "Email"].forEach(text => {
    const th = document.createElement("th");
    th.innerText = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement("tbody");
  data.forEach(item => {
    const row = document.createElement("tr");
    const headers = ["ID", "dapiID", "Label", "Email"]
    row.addEventListener("click", function () {
      const cellData = {};
      // Loop through each cell in the row
      for (let i = 0; i < this.cells.length; i++) {
        const header = headers[i];
        // Get the content of the cell
        const cellContent = this.cells[i].innerText;
        // Assign the content to the object
        cellData[header] = cellContent;
      }
      // console.log(cellData);
      const obj = { record: cellData, method: "emailsRowClick" };
      FileMaker.PerformScript("customers . loadWebViewer . worksheets . callbacks", JSON.stringify(obj)); // Log or use the rowData
    });

    // Add hidden id
    const recordID = document.createElement("td");
    recordID.innerText = item["customersEmail::__ID"];
    recordID.style.display = "none"; // This will hide the cell
    row.appendChild(recordID);

    // Add hidden dataApiID
    const dapiID = document.createElement("td");
    dapiID.innerText = item.recordId;
    dapiID.style.display = "none"; // This will hide the cell
    row.appendChild(dapiID);

    // Add Label
    const labelCell = document.createElement("td");
    labelCell.innerText = item["customersEmail::Label"];
    row.appendChild(labelCell);

    // Add Email
    const emailCell = document.createElement("td");
    emailCell.innerText = item["customersEmail::Email"];
    row.appendChild(emailCell);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  // Append the table to the worksheetHeader div
  document.getElementById("emails").appendChild(table);
}

window.priceBreakdown = (data) => {
  // Create table
  const table = document.createElement("table");
  table.className = "table";

  // Create table header
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["Total", "Provider"].forEach(text => {
    const th = document.createElement("th");
    th.innerText = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement("tbody");
  data.forEach(item => {
    const row = document.createElement("tr");

    // Add Total
    const totalCell = document.createElement("td");
    const totalCellFormattedAmount = new Intl.NumberFormat("en-US", { style: "currency", currency: "CAD" }).format(item.savedAmount_TOTAL);
    totalCell.innerText = totalCellFormattedAmount;
    row.appendChild(totalCell);

    // Add ProviderAmount
    const provCell = document.createElement("td");
    const provCellFormattedAmount = new Intl.NumberFormat("en-US", { style: "currency", currency: "CAD" }).format(item.savedAmount_TOTALPROVIDER);
    provCell.innerText = provCellFormattedAmount;
    row.appendChild(provCell);

    // Add ProviderPercent
    const provPercent = document.createElement("td");
    const percentage = (item.savedAmount_TOTAL / item.savedAmount_TOTALPROVIDER) * 100;
    const formattedPercentage = `${percentage.toFixed(2)}%`;
    provCell.innerText = formattedPercentage;
    row.appendChild(provPercent);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  // Append the table to the worksheetHeader div
  document.getElementById("emails").appendChild(table);
}

window.loadTable = (json) => {
  const obj = JSON.parse(json);
  console.log(obj);
  const wsInfo = obj.wsInfo;
  console.log(wsInfo);
  // priceBreakdown(wsInfo);
  const data = obj.data;
  // console.log(data);
  const columns = obj.columns;
  // console.log("mainColumns", columns);
  // console.log(columns);
  mainTable = $("#dtable").DataTable({
    destroy: true,
    data,
    dom: "lrtp",
    columns,
    columnDefs: [
      {
        targets: 0,
        visible: false,
        searchable: false,
        // set column to dollar format
        // render: DataTable.render.number(null, null, 2, '$'),
      },
      {
        targets: 1,
        visible: false,
        searchable: false,
      },
      {
        targets: 2,
        visible: false,
        searchable: false,
      },
      {
        targets: 4,
        width: 200,
      }
    ],

    // BUTTONS
    /* dom: 'Bfrtip',
    buttons: [
      {
        extend: 'excelHtml5',
        title: 'Customer Sales',
        filename: 'Customer Sales ' + new Date(),
        extension: '.xlsx',
      },
      {
        extend: 'pdfHtml5',
        title: 'Customer Sales',
        download: 'download',
        orientation: 'portrait',
        pagesize: 'LETTER',
        filename: 'Customer Sales ' + new Date(),
        extension: '.pdf',
      }
    ], */
    colReorder: true,
    responsive: true,
    paging: false,
    pageLength: 25,
    ordering: true,
    order: [
      [2, "asc"],
    ],
  });

  // Override inline styles for width
  $('#dtable').css('width', 'auto');
};

window.loadSideBar = (json) => {
  const obj = JSON.parse(json);
  // console.log("passedSideBar", obj);
  const data = obj.data;
  // console.log("passedSideBar", data);
  /*
  example input object
  [{"fieldData":{"OT_Emp_Total":0,"Regular_Emp_Total":0,"dateGroup":"","dateWorked":"09/18/2023","flag_Lunch":1,"flag_endDay_override":"","flag_open_a":"","flag_unGrouped_a":"","hours":48600,"id":"DD90CA38-C079-3D45-8387-7829F59DD5A3","id_employee":"7ADB7E19-6F7F-6E4B-A5B4-6F70413B2C73","lunchEnd":"","lunchStart":"","month":9,"overtimeHours_c":5.5,"regularHours_c":8,"timeEnd":"00:30:00","timeStart":"10:30:00","timestampIN":"09/17/2023 10:30:00","timestampOUT":"09/18/2023 00:30:00","timestampOUT_actual":"","totalHours_c":13.5,"totalWorked_c":"13:30:00","week":38,"weekStartDate_a":"09/18/2023","year":2023,"zCreatedBy":"moldmaker","zCreationTimestamp":"09/18/2023 00:28:07","zModificationTimestamp":"09/19/2023 08:59:24","zModifiedBy":"JodiWright"},"modId":"12","portalData":{"employeeHours_EMPLOYEE":[{"employeeHours_EMPLOYEE::department":"Mold Making","employeeHours_EMPLOYEE::nameDisplay_a":"Quan Tran","modId":"17","recordId":"246"}]},"portalDataInfo":[{"database":"Jobs","foundCount":1,"returnedCount":1,"table":"employeeHours_EMPLOYEE"}],"recordId":"8535"},
  */
  // transform data here
  // const data = transformData(passedData);
  // console.log("transformedSideBar", data);

  // initialize table
  const columns = obj.columns;
  const custEmails = obj.cust.emails;
  const custContacts = obj.cust.contacts;
  const custPhones = obj.cust.phones;
  renderContacts(custContacts);
  renderPhones(custPhones);
  renderEmail(custEmails);
  table = $("#dtableSide").DataTable({
    destroy: true,
    data,
    dom: "lrtp",
    columns,
    columnDefs: [
      {
        targets: 0, // ID
        visible: false,
        searchable: false,
        // set column to dollar format
        // render: DataTable.render.number(null, null, 2, '$'),
      },
      {
        targets: 1, // select flag for active or not
        visible: false,
        searchable: false,
      },
      {
        targets: 2,
        visible: false, // dAPI recordID
        searchable: false,
      },
      // target 3 employeee name FROM employeeHours_EMPLOYEE::nameDisplay_a
      /*
      {
        target: 4, // allocated SUM OF totalHours_c
        width: "75px"
      },
      {
        target: 5, // taget 5 flag in/out IF ISEMPTY(timestampOUT) AND timestampIN is todays date
        width: "75px"
      },
      {
        targets: 6, // taget 5 hours worked SUM of totalHours_c EXCLUDING today's date
        width: "30px",
        searchable: false,
        orderable: false,
      }
      */
    ],

    colReorder: false,
    responsive: true,
    paging: false,
    pageLength: 25,
    ordering: true,
    order: [
      [
        2, "desc",
        3, "asc"
      ],
    ],
  });
  // const firstDiv = $('#dtableSide_wrapper .row').first().find('.col-md-6').first();
  // const secondDiv = $('#dtableSide_wrapper .row').first().find('.col-md-6').last();
  // firstDiv.removeClass('col-md-6').addClass('col-md-2');
  // secondDiv.removeClass('col-md-6').addClass('col-md-10');

  // Iterate through each row in the table
  table.rows().every(function () {
    const rowData = this.data();
    // console.log(rowData["customerWorksheets::Select"])
    // Check the value in column 3
    if (rowData["customerWorksheets::Select"] === "1") {
      const cellValue = rowData["customerWorksheets::Worksheet Name"];
      // console.log(cellValue);
      // Find the <tr> element with the matching text
      const tr = $(this.node()).closest("tr").filter(function () {
        return $(this).text() === cellValue;
      });
      // console.log(tr);
      // Apply bold styling to the found <tr> element
      tr.find("td").css("font-weight", "bold");
    }
    return true; // Return true to continue iterating
  });
};

$("#dtableSide").on("click", "tr", function () {
  const row = table.row(this);
  const data = row.data();
  const obj = { record: data, load: "thisWorkSheet" };
  FileMaker.PerformScript("customers . loadWebViewer . worksheets", JSON.stringify(obj));
})

$("#dtable").on("click", "tbody td", function () {
  const cellIndex = mainTable.cell(this).index().column;
  if (cellIndex === 4) {
    const row = mainTable.row(this).data();
    const obj = { record: row, button: 'rowClick' };
    FileMaker.PerformScript('dataTable . showRowDetails', JSON.stringify(obj));
  }
});

$("#dtable").on("click", "#delete", function () {
  const row = mainTable.row($(this).closest('tr'));
  if (row.length) { // Make sure a row was actually found
    const data = row.data();
    const obj = { record: data, button: "delete" };
    FileMaker.PerformScript("dataTable . showRowDetails", JSON.stringify(obj));
  } else {
    console.log("Row not found");
  }
});
/*
$("#dtable").on("click", "#note", function () {
  const data = table.row($(this).parents("tr")).data();
  const obj = { record: data, button: "note" };
  FileMaker.PerformScript("dataTable . showRowDetails", JSON.stringify(obj))
});
*/
