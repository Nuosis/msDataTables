
// https://datatables.net/reference/option/
// https://datatables.net/examples/index

// global options
// https://datatables.net/reference/option/

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

let table;
let mainTable;

window.loadTable = (json) => {
  const obj = JSON.parse(json);
  const data = obj.data;
  // console.log(data);
  const columns = obj.columns;
  // console.log("mainColumns", columns);
  // console.log(columns);
  mainTable = $("#dtable").DataTable({
    destroy: true,
    data,
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
        target: 3,
        width: "70px",
        type: 'date',
        render: function (data, type, row) {
          const date = new Date(data); // Assume the timestamp is in milliseconds
          return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
        }
      },
      {
        target: 4, // EMPLOYEE name
        width: "120px",
      },
      // target 4 EMPLOYEE NAME
      {
        target: 5, // job name
        width: "680px",
      },
      {
        targets: 6,
        width: "50px"
      },
      {
        targets: 7,
        width: "20px",
        data: null,
        orderable: false,
        defaultContent: "<button id='delete' class='btn' style='padding: 0;vertical-align: top; font: 1px solid red;'><span class='btn-label' style='margin: 0; padding: 0;'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='red' class='bi bi-x-circle' viewBox='0 0 16 16'><path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/><path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/></svg></span></button>",
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
      [4, "asc"],
    ],
  });

  // Override inline styles for width
  $('#dtable').css('width', 'auto');
};

window.loadSideBar = (json) => {
  const obj = JSON.parse(json);
  const passedData = obj.data;
  // console.log("passedSideBar", passedData);
  /*
  example input object
  [{"fieldData":{"OT_Emp_Total":0,"Regular_Emp_Total":0,"dateGroup":"","dateWorked":"09/18/2023","flag_Lunch":1,"flag_endDay_override":"","flag_open_a":"","flag_unGrouped_a":"","hours":48600,"id":"DD90CA38-C079-3D45-8387-7829F59DD5A3","id_employee":"7ADB7E19-6F7F-6E4B-A5B4-6F70413B2C73","lunchEnd":"","lunchStart":"","month":9,"overtimeHours_c":5.5,"regularHours_c":8,"timeEnd":"00:30:00","timeStart":"10:30:00","timestampIN":"09/17/2023 10:30:00","timestampOUT":"09/18/2023 00:30:00","timestampOUT_actual":"","totalHours_c":13.5,"totalWorked_c":"13:30:00","week":38,"weekStartDate_a":"09/18/2023","year":2023,"zCreatedBy":"moldmaker","zCreationTimestamp":"09/18/2023 00:28:07","zModificationTimestamp":"09/19/2023 08:59:24","zModifiedBy":"JodiWright"},"modId":"12","portalData":{"employeeHours_EMPLOYEE":[{"employeeHours_EMPLOYEE::department":"Mold Making","employeeHours_EMPLOYEE::nameDisplay_a":"Quan Tran","modId":"17","recordId":"246"}]},"portalDataInfo":[{"database":"Jobs","foundCount":1,"returnedCount":1,"table":"employeeHours_EMPLOYEE"}],"recordId":"8535"},
  */
  // transform data here
  const data = transformData(passedData);
  // console.log("transformedSideBar", data);

  // initialize table
  const columns = obj.columns;
  table = $("#dtableSide").DataTable({
    destroy: true,
    data,
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
        targets: 1, // employeeID FROM id_employee
        visible: false,
        searchable: false,
      },
      {
        targets: 2,
        visible: false, // department
        searchable: true,
      },
      // target 3 employeee name FROM employeeHours_EMPLOYEE::nameDisplay_a
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
    ],

    colReorder: false,
    responsive: true,
    paging: false,
    pageLength: 25,
    ordering: true,
    order: [
      [3, "asc"],
    ],
  });
  const firstDiv = $('#dtableSide_wrapper .row').first().find('.col-md-6').first();
  const secondDiv = $('#dtableSide_wrapper .row').first().find('.col-md-6').last();
  firstDiv.removeClass('col-md-6').addClass('col-md-2');
  secondDiv.removeClass('col-md-6').addClass('col-md-10');
};

$("#dtableSide").on("click", "tr", function () {
  const row = table.row(this);
  const data = row.data();
  const obj = { record: data, button: "sideRowClick" };
  FileMaker.PerformScript("dataTable . showRowDetails", JSON.stringify(obj));
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
