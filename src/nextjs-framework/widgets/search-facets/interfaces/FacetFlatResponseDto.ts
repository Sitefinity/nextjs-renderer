import { FacetResponseDto } from './FacetResponseDto';

export interface FacetFlatResponseDto {
    FacetKey: string;
    FacetResponses: FacetResponseDto[];
}
