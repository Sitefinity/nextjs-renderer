import { SdkItem } from '../../src/nextjs-framework/rest-sdk';
import { ClassificationRestService } from '../../src/nextjs-framework/widgets/classification/classification.service';

export class MockedClassificationRestService extends ClassificationRestService {

    static override getTaxons(): {value: SdkItem[]} {
       return { value: [
        {
        Id: '42d5fda4-1d60-6822-81ac-ff0000da1875',
        Name: 'Test',
        Title: 'Test',
        UrlName: 'Test',
        Description: null,
        LastModified: '0001-01-01T00:00:00Z',
        AvailableLanguages: [],
        TaxonomyId: 'cb0f3a19-a211-48a7-88ec-77495c0f5374',
        Synonym: null,
        AppliedTo: 0,
        SubTaxa: []
      },
        {
        Id: '6d41f4a4-1d60-6822-81ac-ff0000da1875',
        Name: 'UX',
        Title: 'UX',
        UrlName: 'UX',
        Description: null,
        LastModified: '0001-01-01T00:00:00Z',
        AvailableLanguages: [],
        TaxonomyId: 'cb0f3a19-a211-48a7-88ec-77495c0f5374',
        Synonym: null,
        AppliedTo: 2,
        SubTaxa: []
      }
      ] as any };
    }
}
