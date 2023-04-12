let table;
// https://datatables.net/reference/option/
// https://datatables.net/examples/index

// global options
// https://datatables.net/reference/option/

window.loadTable = (json) => {
  const obj = JSON.parse(json);
  console.log(obj);
  const data = obj.data;
  const columns = [
    { data: "fieldData.CompanyName", title: "Name" },
    { data: "fieldData.City", title: "City" },
    { data: "fieldData.State", title: "State" },
    { data: "fieldData.Zip", title: "Zip Code", orderable: false },
  ];
  table = $("#dtable").DataTable({
    columns,
    data,
    colReorder: true,
    responsive: true,
    paging: true,
    ordering: true,
  });
};

$("#dtable").on("click", "tr", function () {
  const row = table.row(this);
  const data = row.data();
  const fmID = data.fieldData.PrimaryKey;
  const recordID = data.recordId;
  const obj = { ID: fmID, recordID: recordID };

  FileMaker.PerformScript("showRowDetails", JSON.stringify(obj));
})
