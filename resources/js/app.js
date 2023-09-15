require("./bootstrap");

import axios from "axios";
import { Columns } from "./columns";

agGrid.LicenseManager.setLicenseKey("");

// let the grid know which columns and what data to use
const gridOptions = {
    columnDefs: Columns,
    rowData: null,
};

/* // setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", () => {
    const gridDiv = document.querySelector("#myGrid");
    new agGrid.Grid(gridDiv, gridOptions);

    fetch('api/users')
    .then((response) => response.json())
    .then((data) => gridOptions.api.setRowData(data));
}); */

// app.js

document.addEventListener("DOMContentLoaded", function () {
    var gridOptions = {
        columnDefs: Columns,
        rowModelType: "serverSide", // Habilita server-side rendering
        pagination: true,
        paginationPageSize: 10, // Establece el tamaño de página
        domLayout: "pagination", // Habilita controles de paginación
    };

    // Inicializa el grid
    var gridDiv = document.querySelector("#myGrid");
    new agGrid.Grid(gridDiv, gridOptions);

    // Configura el endpoint de la paginación
    var datasource = {
        getRows: function (params) {
            var startRow = params.request.startRow;
            var endRow = params.request.endRow;

            // Realiza una petición al servidor para obtener los datos
            fetch(`/api/users?startRow=${startRow}&endRow=${endRow}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("La solicitud falló");
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("response: ", data);
                    params.successCallback(data.rows, data.totalCount);
                })
                .catch((error) => {
                    console.error("Error en la solicitud:", error);
                    params.failCallback();
                });
        },
    };

    // Configura el datasource
    gridOptions.api.setServerSideDatasource(datasource);
});
