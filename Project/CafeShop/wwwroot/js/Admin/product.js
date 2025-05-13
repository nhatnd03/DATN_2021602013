﻿$(document).ready(function (e) {
    GetAll();
    GetAllSize();
    GetAllProductType();
    $(".select2").select2();
    $(".select2_formProductTypeId").select2({
        dropdownParent: $("#staticBackdrop")
    });
});
var pageNumber = 1;
var totalPage = 0;
var productId = 0;
var htmlSize = "";
var _attachFiles = [];
var lstFileDeleted = [];
var _imageUrls = [];
$('#request').keydown(function (e) {
    if (e.keyCode == 13) {
        pageNumber = 1;
        GetAll();
    }
})
function previousPage() {
    if (pageNumber > 1) {
        pageNumber -= 1;
        GetAll();
    }
}
function nextPage() {
    if (pageNumber < totalPage) {
        pageNumber += 1;
        GetAll();
    }
}
$('#pageSize').change(function () {
    pageNumber = 1;
    GetAll();
});

$('#groupId').change(function () {
    pageNumber = 1;
    GetAll();
});
function Pagination() {
    var html = `<li class="page-item"> <a onclick="previousPage()" class="page-link cusor" aria - label="Previous" > <span aria-hidden="true">&laquo;</span> </a > 
                </li > `;
    if (totalPage == 1) {
        html += `<li class="page-item"><a class="page-link" style="background-color: aliceblue;">${pageNumber}</a></li>`
    }
    else if (pageNumber == 1) {
        html += `<li class="page-item"><a class="page-link" style="background-color: aliceblue;">${pageNumber}</a></li>
            <li class="page-item cusor"><a onclick="nextPage()" class="page-link">${pageNumber + 1}</a></li>`;
    }
    else if (pageNumber == totalPage) {
        html += `<li class="page-item cusor"><a onclick="previousPage()"  class="page-link">${pageNumber - 1}</a></li>
            <li class="page-item"><a style="background-color: aliceblue;" class="page-link">${pageNumber}</a></li>`;
    }
    else {
        html += `<li class="page-item cusor"><a onclick="previousPage()" class="page-link">${pageNumber - 1}</a></li>
            <li class="page-item"><a class="page-link" style="background-color: aliceblue;" >${pageNumber}</a></li>
            <li class="page-item cusor"><a onclick="nextPage()" class="page-link">${pageNumber + 1}</a></li>`;
    }
    html += `<li class="page-item cusor">
            <a onclick="nextPage()" class="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
         </li>`;

    $('#pagination').html(html);
}
$('#btn_search').click(function () {
    pageNumber = 1;
    GetAll();
})
function showModal() {
    $("#btninformation").click();
    $('#staticBackdrop').modal('show');
    if (productId == 0) {
        $('#btn_deleteModal').hide();
    }
}
function CloseModal() {
    lstFileDeleted = [];
   _imageUrls = [];

    document.getElementById('form').reset();
    $('#tbodySteps').html('');
    $('#AttachFiles').html('');
    productId = 0;
    document.getElementById('form').reset();
    $('#importedMaterial').val("");
    $('#staticBackdrop').modal('hide');
    $(".topping-check").prop('checked', false);
}
$('#add_new').click(function () {
    $('#staticBackdropLabel').text("Thêm mới loại sản phẩm");
    showModal();
})
$('#btn_deleteModal').click(function () {
    DeleteById(productId);
});
function GetAll() {
    ShowSpinnerClient();
    var groupId = $('#groupId option:selected').val();

    let obj = {
        request: $('#request').val(),
        pageNumber: pageNumber,
        productTypeId: parseInt($("#group_product").val())
    };
    $.ajax({
        url: "/Admin/Product/GetAll",
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        data: obj,
        success: function (data) {
            var html = '';
            $.each(data.data, function (index, item) {
                html += `<tr class="align-middle">
                            <td scope="col" class="align-center text-center" style="white-space: nowrap">
                                <button class="btn btn-sm btn-primary" onclick="GetById(${item.id})" ><i class="bi bi-pencil-square"></i> Sửa</button>
                                <button class="btn btn-sm btn-danger" onclick="DeleteById(${item.id})"><i class="bi bi-trash3"></i> Xóa</button>
                            </td>
                            <td scope="col" class="text-center"> <a style="color: blue;  cursor: pointer;" onclick="GetById(${item.id})">${item.productCode} </a></td>
                            <td scope="col">${item.productName}</td>
                            <td class="text-center" scope="col">${item.isActive == 1 ? "Mở bán" : "Ngưng bán"}</td>
                            <td scope="col">${item.productTypeName ?? ""}</td>
                            <td scope="col">${item.description ?? ""}</td>
                            
                        </tr>`;
            })
            let total = Math.ceil(data.totalCount[0].totalCount / 10);
            totalPage = total > 0 ? total : 1;
            $('#tbody').html(html);
            $('#page_details').text(`Trang ${pageNumber} / ${totalPage}`);
            $('#pageNumber').val(pageNumber);
            Pagination();
        },

        error: function (err) {
            alert(err.responseText);
        }
    });
}
function GetById(id) {
    $('#btn_deleteModal').show();
    $('#staticBackdropLabel').text("Cập nhật sản phẩm");
    productId = id;
    let _url = "/Admin/Product/GetById";
    $.ajax({
        url: _url,
        type: 'GET',
        dataType: 'json',
        data: {
            Id: id
        },
        contentType: 'application/json',
        success: function (data) {
            productId = data.data.id
            $('#formCode').val(data.data.productCode);
            $('#formName').val(data.data.productName);
            $('#formProductTypeId').val(data.data.productTypeId);
            $('#formNote').val(data.data.description);
            $("#formIsActive").val(data.data.isActive == true ? 1 : 0)
            let html = "";
            $.each(data.details, function (index, item) {
                html += `<tr class="sortable product_details_item">
                            <th scope="col">
                                   <select class="form-select productSizeId">
                                               ${htmlSize}    
                                   </select>
                            </th>
                            <th scope="col">
                                    <input type="text" class="form-control productPrice" placeholder="Giá tiền" oninput="formatMoney(event)" value = "${item.price}">
                            </th>
                            <td class="text-center" scope="col">VNĐ</th>
                            <th scope="col" style="text-align:center;vertical-align: middle;"><button  onclick="deleteRow(event)" class="btn btn-danger"><i class="bi bi-trash"></i></th>
                        </tr>`;
            });
            $('#tbodySteps').append(html);

            $(".productSizeId").each(function (index, el) {
                $(el).val(data.details[index].productSizeId);
            });
            var htmlImage = '';
            _attachFiles = data.images.map(x => ({ id: x.id, name: x.imageName }));

            _imageUrls = data.images.map(x => ({ id: x.id, name: x.imageName, imgUrl: x.imageUrl }))
            $.each(_imageUrls, function (key, item) {
                htmlImage += `
                <span class="m-0 px-1 text-nowrap text-dark a-product-details" ><img class="image-product-details p-1" src="${item.imgUrl}" alt="${item.name}" /> <span class="text-danger icon-x-span" onclick="return onRemoveFile(${key},${item.id})"><i class="bi bi-x"></i></span></span>`;
            })
            $('#AttachFiles').html(htmlImage);


            $.each(data.toppings, function (key, item) {
                $('.topping-check').each(function () {
                    if (parseInt($(this).attr("topping-id")) == item.toppingId) { 
                        $(this).prop('checked', true);
                    }
                });
            });


            showModal();
        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}
function Validate() {
    let isValid = true;
    let code = $("#formCode").val();
    let name = $("#formName").val();
    let status = $("#formIsActive").val();
    let productTypeId = $("#formProductTypeId").val();
    if (code == null || code.trim().length <= 0) {
        alert("Hãy nhập Mã sản phẩm!");
        return false;
    }
    if (name == null || name.trim().length <= 0) {
        alert("Hãy nhập Tên sản phẩm!");
        return false;
    }
    if (status == null || status < 0) {
        alert("Hãy nhập Trạng thái!");
        return false;
    }
    if (productTypeId == null || productTypeId <= 0) {
        alert("Hãy nhập Loại sản phẩm!");
        return false;
    }

    if ($(".product_details_item").length > 0) {
        $(".product_details_item").each(function (index, el) {
            let price = $(el).find(".productPrice").val();
            let sizeId = $(el).find(".productSizeId").val();
            if (sizeId == null || sizeId <= 0) {
                alert("Hãy nhập Size sản phẩm!");
                return false;
            }
            if (price == null || price.trim().length <= 0) {
                alert("Hãy nhập đủ giá tiền cho Size sản phẩm!");
                return false;
            }
        });
    }
    return isValid;
}
function CreateOrUpdate() {
    if (Validate()) {
        ShowSpinnerClient();
        let arrDetails = [];
        if ($(".product_details_item").length > 0) {
            $(".product_details_item").each(function (index, el) {
                let price = $(el).find(".productPrice").val();
                let sizeId = $(el).find(".productSizeId").val();
                let objDetails = {
                    ProductSizeId: parseInt(sizeId),
                    Price: parseFloat(price.replaceAll(",", ""))
                };
                arrDetails.push(objDetails);
            });
        }

        let arrToppingIDs = [];
        $('.topping-check').each(function () {
            if ($(this).prop('checked')) { // Kiểm tra trạng thái checked
                let toppingID = parseInt($(this).attr("topping-id"));
                arrToppingIDs.push(toppingID);
            }
        });


        let code = $("#formCode").val();
        let name = $("#formName").val();
        let status = $("#formIsActive").val();
        let productTypeId = $("#formProductTypeId").val();
        let note = $("#formNote").val();
        var obj = {
            Id: productId,
            ProductCode: code,
            ProductName: name,
            IsActive: parseInt(status) == 1 ? true : false,
            Description: note,
            ProductTypeId: productTypeId,
            ListDetails: arrDetails,
            ListFileIDs: lstFileDeleted,
            ListTopping: arrToppingIDs
        };
        let _url = "/Admin/Product/CreateOrUpdate";
        $.ajax({
            type: 'POST',
            url: _url,
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(obj),
            success: function (result) {
                if (result.status == 1) {
                    alert(result.statusText)
                } else {
                    UploadFile(result.result.id);
                    CloseModal();
                    GetAll();
                    _imageUrls = [];
                }
            },
            error: function (err) {
                alert(err.responseText);
            }
        });
    }
}
function DeleteById(id) {
    if (confirm("Bạn có chắc chắn muốn thực hiện thao tác này?") == true) {
        ShowSpinnerClient();
        let _url = "/Admin/Product/Delete";
        $.ajax({
            type: 'GET',
            url: _url,
            contentType: 'application/json;charset=utf-8',
            data: {
                Id: id,
            },
            success: function (result) {
                CloseModal();
                pageNumber = 1;
                GetAll();
            }, error: function (err) {
                alert(err.responseText);
            }
        });
    }
}
function GetAllSize() {
    $.ajax({
        type: 'GET',
        url: "/Admin/ProductSize/GetAllNoPage",
        contentType: 'application/json;charset=utf-8',
        data: {},
        success: function (result) {
            htmlSize = `<option value="0" disabled selected hidden>Chọn Size sản phẩm</option>`;
            result.forEach(e => {
                htmlSize += `<option value="${e.id}">${e.sizeName}</option>`;
            })
        }, error: function (err) {
            alert(err.responseText);
        }
    });
}
function GetAllProductType() {
    $.ajax({
        type: 'GET',
        url: "/Admin/Product/GetAllProductTypeNoPage",
        contentType: 'application/json;charset=utf-8',
        data: {},
        success: function (result) {
            let html = `<option value="0" disabled selected hidden>Chọn loại sản phẩm</option>`;
            result.forEach(e => {
                html += `<option value="${e.id}">${e.typeName}</option>`;
            })
            $("#formProductTypeId").html(html);
        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}
function addRow() {
    let html = `<tr class="sortable product_details_item">
                <th scope="col">
                       <select class="form-select productSizeId">
                                   ${htmlSize}    
                       </select>
                </th>
                <th scope="col">
                        <input type="text" class="form-control productPrice" placeholder="Giá tiền" oninput="formatMoney(event)">
                </th>
                <td class="text-center" scope="col">VNĐ</th>
                <th scope="col" style="text-align:center;vertical-align: middle;"><button  onclick="deleteRow(event)" class="btn btn-danger"><i class="bi bi-trash"></i></th>
            </tr>`;
    $('#tbodySteps').append(html);
}
function deleteRow(event) {
    if (confirm("Bạn có chắc muốn xóa dòng này không?")) {
        let targetElement = $(event.target);
        targetElement.closest("tr").remove();
    }
}
function formatMoney(event) {
    let value = $(event.target).val();
    value = value.replace(/[^0-9]/g, '');
    let lastValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    $(event.target).val(lastValue);
}
function UploadFile(productId) {
    try {
        var filedata = new FormData();
        if (_attachFiles.length > 0) {
            $.each(_attachFiles, function (key, item) {
                filedata.append(key, item);
            })

            $.ajax({
                url: '/Admin/Product/UploadFile?Id=' + productId,
                type: 'POST',
                dataType: 'json',
                data: filedata,
                processData: false,
                contentType: false,
                success: function (result) {
                    if (parseInt(result.status) == 1) {
                        _attachFiles = [];
                        $("#AttachFiles").html('');
                    } else {
                        alert(result.message);
                    }
                },

                error: function (err) {
                    alert(err.responseText);
                }
            });
        }

    } catch (e) {
        alert(e);
    }
}
//Sự kiện chọn file đính kèm
function readFileAsync(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = ({ target: { result } }) => resolve(result);
        reader.readAsDataURL(file);
    });
}
async function onSelectedFile(event) {

    var html = '';
    var fileSelecteds = $('input[name="AttachFiles"]').get(0).files;
    $.each(fileSelecteds, function (i, file) {
        _attachFiles.push(file);
    })

    for (const file of event.target.files) {
        const imageUrl = await readFileAsync(file);
        _imageUrls.push({ id: 0, name: file.name, imgUrl: imageUrl });
    }
    $.each(_imageUrls, function (key, item) {
        html += `<span class="m-0 px-1 text-nowrap text-dark a-product-details"><img class="image-product-details p-1" src="${item.imgUrl}" alt="${item.name}" /> <span class="text-danger icon-x-span" onclick="return onRemoveFile(${key},0)"><i class="bi bi-x"></i></span></span>`;

    })
    $('#AttachFiles').html(html);
}
//Sự kiện remove file đính kèm
function onRemoveFile(index, fileID) {
    if (confirm("Bạn có chắc muốn xóa ảnh này không?")) {
        _attachFiles.splice(index, 1);
        _imageUrls.splice(index, 1);
        var html = '';
        $.each(_imageUrls, function (key, item) {
            html += `<span class="m-0 px-1 text-nowrap text-dark a-product-details"><img class="image-product-details p-1" src="${item.imgUrl}" alt="${item.name}" /> <span class="text-danger icon-x-span" onclick="return onRemoveFile(${key},${item.id})"><i class="bi bi-x"></i></span></span>`;
        });
        $('#AttachFiles').html(html);
    }
    let idFile = parseInt(fileID);
    if (idFile > 0) lstFileDeleted.push(idFile);

}

function CheckedChange() {
    let isCheck = $("#check-box-product-topping").is(':checked');
    $(".topping-check").prop('checked', isCheck);
}