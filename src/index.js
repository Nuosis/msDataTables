let table;
// https://datatables.net/reference/option/
// https://datatables.net/examples/index

// global options
// https://datatables.net/reference/option/

window.loadTable = (json) => {
  const obj = JSON.parse(json);
  const data = obj.data;
  // console.log(data);
  const columns = obj.columns;
  // console.log(columns);
  table = $("#dtable").DataTable({
    destroy: true,
    data,
    columns,
    columnDefs: [
      {
        targets: 6,
        title: "Note",
        data: null,
        orderable: false,
        defaultContent: "<button id='note' class='btn btn-outline-secondary'><span class='btn-label'><i class='journal-text'></i></span>+</button>",
      },
      {
        targets: 7,
        data: null,
        orderable: false,
        defaultContent: "<button id='delete' class='btn btn-outline-danger'><span class='btn-label'><i class='trash3'></i></span>X</button>",
      },
      {
        target: 0,
        visible: false,
        searchable: false,
        // set column to dollar format
        // render: DataTable.render.number(null, null, 2, '$'),
      },
      {
        target: 1,
        visible: false,
        searchable: false,
      },
      {
        target: 2,
        type: Date,
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
      [2, "desc"],
    ],
  });
};
/*
$("#dtable").on("click", "tr", function () {
  const row = table.row(this);
  const data = row.data();
  const obj = { record: data };
  FileMaker.PerformScript("Report . Invoice . customerDetails", JSON.stringify(obj));
}) */

$("#dtable").on("click", "#delete", function () {
  const data = table.row($(this).parents('tr')).data();
  const obj = { record: data, button: "delete" };
  FileMaker.PerformScript("dataTable . showRowDetails", JSON.stringify(obj))
});

$("#dtable").on("click", "#note", function () {
  const data = table.row($(this).parents('tr')).data();
  const obj = { record: data, button: "note" };
  FileMaker.PerformScript("dataTable . showRowDetails", JSON.stringify(obj))
});
