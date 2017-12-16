$(document).ready(function () {
    //https://datatables.net/examples/data_sources/ajax.html
    $('#brokersList').DataTable({
        ajax: {url: "/listBroker", dataSrc: "data"},
        lengthMenu: [5, 25, 50 ],
        scrollY: "550px",
        scrollx: true,
        columns: [
            {data: "key"},
            {data: "comments"},
            {data: "email"},
            {data: "license"},
            {data: "phone"},
            {data: "id"}
        ],
        processing: true,
        serverSide: true,
        ordering: false,
        paging: true,
        info: true,
        searching : false,
    });
/*
    {data: "key"},
    {data: "empl_name"},
    {data: "licenseNumber"},
    {data: "emp_email"},
    {data: "city"},
    {data: "state"},
    {data: "county_name"},
    {data: "agt_name"}*/
    var icon = $('<i>').addClass('fa fa-search');
    var lbl = $('<label>');
    lbl.append($('<input>').prop( "type", "search").attr("id", "brokersList_search").attr("aria-controls","brokersList").addClass("input-sm"));
    lbl.append($('<button>').prop("id","searchData").addClass("btn btn-primary").append(icon));

    var customSearch = $('<div/>').addClass("dataTables_filter").prop("id","brokersList_filter");
    customSearch.insertAfter(".dataTables_length")
    customSearch.append(lbl);

    $('#searchData').click(function () {
        var v = $("#brokersList_search").val();
        var table = $('#brokersList').DataTable();
        table.search(v, false, true).draw();
    });

    /*
    *1. get data from fb()
    *2. 15k 50... query?
    *3. skip(pageSize).select(pageSize)
    */
});

