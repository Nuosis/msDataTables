let table;
// https://datatables.net/reference/option/
// https://datatables.net/examples/index

window.loadTable = (json) => {
  const obj = JSON.parse(json);
  // const data = obj.data;
  const columns = [];
  const data = [];
  table = $("#dtable").DataTable({
    columns,
    data,
  });
};
