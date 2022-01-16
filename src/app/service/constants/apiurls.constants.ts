import { environment } from "src/environments/environment.prod";

export class apiService {
    // BASE URL
    public static readonly BASE_URL = environment.serverHost;

    // FOR AUTH
    public static readonly LOGIN_API = `${apiService.BASE_URL}api/v1/auth/login`; // LOGIN URL
    public static readonly register = `${apiService.BASE_URL}api/v1/auth/register`; // REGISTER URL

    // FOR PRODUCTS
    public static readonly VIEW_ALL_PRODUCT = `${apiService.BASE_URL}api/v1/product/viewall`;
    public static readonly ADD_PRODUCT = `${apiService.BASE_URL}api/v1/product/add1`;
    public static readonly VIEW_PRODUCT = `${apiService.BASE_URL}api/v1/product/get`;
    public static readonly UPDATE_PRODUCT = `${apiService.BASE_URL}api/v1/product/update`;
    public static readonly DELETE_PRODUCT = `${apiService.BASE_URL}api/v1/product/delete`;

    public static readonly addquantity = `${apiService.BASE_URL}api/quantity`;
    public static readonly generateInvoiceNumber = `${apiService.BASE_URL}api/invoicenum`;

    // FOR USER 
    public static readonly GET_USER = `${apiService.BASE_URL}api/v1/user/profile`;

    // FOR CONTACT LIST
    public static readonly ADD_CONTACT = `${apiService.BASE_URL}api/v1/contact-list/add`;
    public static readonly DELETE_CONTACT = `${apiService.BASE_URL}api/v1/contact-list/delete`;
    public static readonly VIEW_ALL = `${apiService.BASE_URL}api/v1/contact-list/getall`;
    public static readonly VIEW_CONTACT = `${apiService.BASE_URL}api/v1/contact-list/get`;
    public static readonly UPDATE_CONTACT = `${apiService.BASE_URL}api/v1/contact-list/update`;
}
