import { ICertificate } from './certificate';

export interface IPageData {
    pageData: ICertificate[],
    page: string,
    pageCount: number,
    limit: number;
}

