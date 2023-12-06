import { DocumentListModelDetail } from './DocumentListDetailModel';
import { DocumentListModelMaster } from './DocumentListModelMaster';

export interface DocumentListViewModel {
    listModel: DocumentListModelMaster | null;
    detailModel: DocumentListModelDetail | null;
    RenderLinks?: boolean;
    DownloadLinkLabel?: string;
    SizeColumnLabel?: string;
    TitleColumnLabel?: string;
    TypeColumnLabel?: string;
}
