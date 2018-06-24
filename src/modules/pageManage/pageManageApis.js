import axios from "axios";
import * as env from "../../constants/env";


// https://keetoolclient.test/manageapi/v3/trongdong/pages?token=





export function loadPagesApi() {
    let url = env.MANAGE_API_URL + "/trongdong/pages";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}
export function createPageApi(page) {
    let url = env.MANAGE_API_URL + "/trongdong/pages/store";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url,{
        name : page.name,
        name_en : page.name_en,
    });
}





export function loadPageItemsApi(page_id) {
    let url = env.MANAGE_API_URL + "/trongdong/page/" + page_id;
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}
export function editPageItemApi(pageItem) {
    let url = env.MANAGE_API_URL + "/trongdong/page-item/" + pageItem.id;
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url,{
        name : pageItem.name,
        value_en : pageItem.value_en,
        value_vi : pageItem.value_vi,
    });
}
export function changeIsActivedApi(id) {
    let url = env.MANAGE_API_URL + "/trongdong/page-item/change-is-actived/" +id;
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url);
}
export function createPageItemApi(pageItem, page_id) {
    let url = env.MANAGE_API_URL + "/trongdong/page/" + page_id;
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url,{
        name : pageItem.name,
        value_en : pageItem.value_en,
        value_vi : pageItem.value_vi,
        // keyword : pageItem.keyword,
    });
}





export function loadProductsApi(page_id,productPage,language_id) {
    let url = env.MANAGE_API_URL + "/trongdong/products/" + page_id + "?limit=6";
    let token = localStorage.getItem("token");
    if (productPage) {
        url += "&page=" + productPage;
    }
    if (language_id) {
        url += "&language_id=" + language_id;
    }
    else {
        url += "&language_id=0" ;
    }
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}
export function createProductApi(product, page_id,language_id) {
    let url = env.MANAGE_API_URL + "/trongdong/product";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url,{
        title : product.title,
        description : product.description,
        url : product.url,
        page_id : page_id,
        language_id :  language_id,
    });
}
export function editProductApi(product,language_id) {
    let url = env.MANAGE_API_URL + "/trongdong/product/" + product.id;
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url,{
        title : product.title,
        description : product.description,
        url : product.url,
        language_id :  language_id,
    });
}
export function changeStatusApi(product_id) {
    let url = env.MANAGE_API_URL + "/trongdong/product/change-status-product/" + product_id ;
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url);
}
export function deleteProductApi(product_id) {
    let url = env.MANAGE_API_URL + "/trongdong/product/" + product_id;
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url);
}


//
//
// export function uploadImage(file, completeHandler, error) {
//     let url = env.API_URL + "/upload-image-froala";
//     let formdata = new FormData();
//     formdata.append("image", file);
//     let ajax = new XMLHttpRequest();
//     ajax.addEventListener("load", completeHandler, false);
//     ajax.open("POST", url);
//     ajax.send(formdata);
//     ajax.addEventListener("error", error, false);
// }


