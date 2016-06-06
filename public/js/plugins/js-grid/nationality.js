$(function() {


    $("#jsGrid").jsGrid({
        height: "70%",
        width: "100%",
        filtering: true,
        inserting: true,
        editing: true,
        sorting: true,
        paging: true,
        autoload: true,
        pageSize: 10,
        pageButtonCount: 5,
        deleteConfirm: "Вы действително хотите удалить?",
        controller: {
            loadData: function(filter) {
                return $.ajax({
                    type: "GET",
                    url: "/v1/api/nationality",
                    data: filter,
                    dataType: "json"
                });
            },
            insertItem: function(item) {
                return $.ajax({
                    type: "POST",
                    url: "/nationality",
                    data: item

                });
            },
            updateItem: function(item) {
                return $.ajax({
                    type: "PUT",
                    url: "/clients",
                    data: item
                });
            },
            deleteItem: function(item) {
                return $.ajax({
                    type: "DELETE",
                    url: "/clients",
                    data: item
                });
            }
        },
        fields: [
            {name: "_id", title:"Код", type: "text", width: 100},
            {name: "desc", title:"Национальность", type: "text", width: 300},
            //{ name: "Name", type: "text", width: 100 },
            //{ name: "Age", type: "number", width: 300, filtering: false },
            //{ name: "Address", type: "text", width: 200 },
            //{ name: "Country", type: "select", items: countries, valueField: "Id", textField: "Name" },
            //{ name: "Married", type: "checkbox", title: "Is Married", sorting: false },
            { type: "control" }
        ]
    });

});