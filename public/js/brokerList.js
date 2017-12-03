$(document).ready(function () {
    //https://datatables.net/examples/data_sources/ajax.html
    $('#brokersList').DataTable({
        "ajax": {url: "/listBroker", dataSrc: "data"},
        "lengthMenu": [25, 50 ],
        "scrollY": "550px",
        "columns": [
            {"data": "name"},
            {"data": "position"},
            {"data": "office"},
            {"data": "extn"},
            {"data": "start_date"},
            {"data": "salary"}
        ],
        //"processing": true,
        //"serverSide": true,
        "ordering": false,
        "info": true
    });

});