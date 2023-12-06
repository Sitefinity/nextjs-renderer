import { SitefinityFacetType } from './SitefinityFacetType';

export interface FacetResponseDto {
    FacetValue: string;
    Count: number;
    From: string;
    To: string;
    FacetType: SitefinityFacetType;
}
