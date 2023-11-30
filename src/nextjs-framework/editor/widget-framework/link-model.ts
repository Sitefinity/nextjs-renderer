export interface LinkModel {
    href?: string;
    text?: string;
    target?: string;
    queryParams: string;
    anchor: string;
    tooltip: string | null;
    type: string;
    classList: string[];
    id: string;
}
