import { render, waitFor } from '@testing-library/react';
import { ContentList } from '../src/nextjs-framework/widgets/content-list/content-list';

// All tests skipped because of https://github.com/Sitefinity/nextjs-renderer/issues/30
describe('should render content list', () => {
    it.skip('news, selected items, list with summary', async () => {
        const model = {
            'Id': '09aba1c0-9594-4fc0-a215-3eaf9123dffd',
            'SiblingId': '00000000-0000-0000-0000-000000000000',
            'Name': 'SitefinityContentList',
            'PlaceHolder': 'Body',
            'Caption': null,
            'ViewName': null,
            'Lazy': false,
            'Key': null,
            'AddAllowed': false,
            'DeleteAllowed': false,
            'EditAllowed': false,
            'MoveAllowed': false,
            'LabelTooltip': null,
            'IsPersonalized': false,
            'WidgetSegmentId': null,
            'Properties': {},
            'Children': []
        };

        const requestContext = {
            'pageNode': {
                '@odata.context': 'https://localhost:5001/api/default/$metadata#Telerik.Sitefinity.Renderer.Web.Services.Dto.PageDtoWithContext',
                'Culture': 'en',
                'SiteId': '4c922118-f076-4e24-9193-93e004f50107',
                'MetadataHash': '-1129976431',
                'Id': '775889a2-cfb2-48b8-90b4-62cf4dae0809',
                'TemplateName': 'Default',
                'Renderer': 'React',
                'UrlParameters': [],
                'HasVariations': false,
                'Site': {
                    'Id': '4c922118-f076-4e24-9193-93e004f50107',
                    'Name': 'Quantum International',
                    'DefaultCulture': 'en',
                    'Cultures': [
                        'en',
                        'es'
                    ],
                    'TimeZone': 'UTC;0;UTC;UTC;UTC;;',
                    'IsSubFolder': false
                },
                'User': null,
                'ComponentContext': {
                    'HasLazyComponents': false,
                    'OrphanedControls': [],
                    'Components': [
                        {
                            'Id': '09aba1c0-9594-4fc0-a215-3eaf9123dffd',
                            'SiblingId': '00000000-0000-0000-0000-000000000000',
                            'Name': 'SitefinityContentList',
                            'PlaceHolder': 'Body',
                            'Caption': null,
                            'ViewName': null,
                            'Lazy': false,
                            'Key': null,
                            'AddAllowed': false,
                            'DeleteAllowed': false,
                            'EditAllowed': false,
                            'MoveAllowed': false,
                            'LabelTooltip': null,
                            'IsPersonalized': false,
                            'WidgetSegmentId': null,
                            'Properties': {
                                'SelectedItems': {
                                    'ItemIdsOrdered': [
                                        '9e26f4a4-1d60-6822-81ac-ff0000da1875',
                                        'b21df4a4-1d60-6822-81ac-ff0000da1875',
                                        '7c23f4a4-1d60-6822-81ac-ff0000da1875'
                                    ],
                                    'Content': [
                                        {
                                            'Variations': [
                                                {
                                                    'Source': 'OpenAccessDataProvider',
                                                    'Filter': {
                                                        'Key': 'Ids',
                                                        'Value': '9e26f4a4-1d60-6822-81ac-ff0000da1875,b21df4a4-1d60-6822-81ac-ff0000da1875,7c23f4a4-1d60-6822-81ac-ff0000da1875'
                                                    }
                                                }
                                            ],
                                            'Type': 'Telerik.Sitefinity.News.Model.NewsItem'
                                        }
                                    ]
                                },
                                'ListFieldMapping': [
                                    {
                                        'Name': 'Thumbnail',
                                        'FriendlyName': 'Image'
                                    },
                                    {
                                        'Name': 'Title',
                                        'FriendlyName': 'Title'
                                    },
                                    {
                                        'Name': 'Content',
                                        'FriendlyName': 'Text'
                                    },
                                    {
                                        'Name': 'LastModified',
                                        'FriendlyName': 'Publication date'
                                    }
                                ],
                                'OrderBy': 'PublicationDate desc',
                                'SfViewName': 'ListWithSummary'
                            },
                            'Children': []
                        }
                    ],
                    'Fields': null,
                    'Site': null,
                    'User': null
                },
                'Scripts': [],
                'DetailItem': null,
                'MetaInfo': {
                    'Title': 'qa-content-list',
                    'Description': '',
                    'HtmlInHeadTag': null,
                    'OpenGraphTitle': 'qa-content-list',
                    'OpenGraphDescription': '',
                    'OpenGraphImage': null,
                    'OpenGraphVideo': null,
                    'OpenGraphType': null,
                    'OpenGraphSite': null,
                    'CanonicalUrl': 'https://localhost:5001/qa-content-list'
                },
                'Fields': {
                    'Title': 'qa-content-list',
                    'UrlName': 'qa-content-list',
                    'LastModified': '2023-11-24T13:52:24.700Z',
                    'DateCreated': '2023-11-24T13:52:24.700Z',
                    'Crawlable': true,
                    'ParentId': 'f669d9a7-009d-4d83-ddaa-000000000002',
                    'RootId': 'f669d9a7-009d-4d83-ddaa-000000000002',
                    'IsHomePage': false,
                    'AvailableLanguages@odata.type': '#Collection(String)',
                    'AvailableLanguages': [
                        'en'
                    ],
                    'ViewUrl': '/qa-content-list'
                }
            },
            'searchParams': {
                'sf_site': '4c922118-f076-4e24-9193-93e004f50107',
                'sfaction': 'edit',
                'sf_version': '10',
                'slug': [
                    'qa-content-list'
                ]
            },
            'detailItem': null,
            'culture': 'en',
            'isEdit': true,
            'isPreview': false,
            'isLive': false,
            'cookie': 'sf_site=4c922118-f076-4e24-9193-93e004f50107; sf-data-intell-subject=d60440b9-8483-4329-8323-3cb1545a0f53; 5001.AspNet.Cookies=XTaleclygvy7FaLNCrXvUyqeMb_LwFql1eUP6oJXTxu44dPv_R1nbJDQZMMkJfBluHQofZpaJgS_TEgQXDSTAiVVNWA_GnMCIZpNXmTrcHu3_sVd4GD8_rJqOSvfdP1Ocj1eMb41EsC-VylucX_HjdBdxnrgqNnPmtbcxuLCtATmZsXkKm1_u-HYN4ENL-yO2aTnygDq1y_msK7MpXtElo_zHJPDf4gErahWzFLnzDtjPNvZtwoYgsXBV3pWT-8dYZ6Zjrbb1_PNq-9RqfmbqIzu1bhaLVcAJ43RFyBpO_o6OQ0HbbV1dbmbBMJEebduX1i5tFSu0e_oV03ljTWL9s_VpyTrQhFfFMtzSC3IbUZmdqYYT6frktfMLZW6YYmzM1nlJGy2qlzz_YTUaEQyaOXLHYwN5vqZnUmoCJSoT7mkIEEfkHYsesBGfQ4UPJli0ycXoy1zeHr_ZTt-eEUTBx_MKCDTaWVak8HPDoRvjjawJToVUE1Mi-SvbzotQoED6oDstWFdX3c6Xxmn8KkU29uiyC3LKB4SFW51ma2jOY1dtRfhEJZzG23b3EH_lpfI_1E8Cswir_jMQ8HifJhOwTt_9UxTJwT7_x2BrMWJ5cx8Gquv7J6KrL6rflYYIe9wOeIRTfI2e2xNwuRFcgHqFmgJMrJdWF-H7Eei6VhmhL_s6GyTBH4WIYjYetSSb0vieFcuWrfO7GGgOCkPZEIAF5tEyh2NKnj5r0AQMrpDBt203pKT0RITCB3Qkw_NcRrww43Hn8XTcHb6Y0LlAVDgtk4pTZy_drbR9pwFm3NeY4eKOhbLbdL-oOnJa7cjahMzdlA1cWw49GTx-vXRYFC1fg-nE9R8Cf_cOIG0euT2_QYsPFWPq2MVuxNTuaRJcKXTqR1ITHVM1FUF3IA0adivsAz28IRWey7ofCr4pK4kMMaETJiX4N6nnz6JtXll7OJYDVhm9bjHzF2usIBNr5coD9M7UYDw2rcATCFu8G-Jcb9vb4npa-DB2f7m2aeDf8BRwHGPI-hKc_77ovWwz9y-Ioowd9ER4SrwwyJymf-6AmLr_dt1mjQHGAH4Y0IDmOKZjUj7wSS0NuDLjxWkNmj6CREQgAN5Xn4q7w3B12pv6VZbF1elaOhPtpJMz1166Th9jLjxTSFCv-5qvcQGM0Ssp0Qx9XwMrdMaeAx6jc9WTczGQcHLDnuiIipszub5HHReTZQNvGA1kdh06dDMGubL3haufijQXlwiBEu92zOhoL0LjBEA4HdSX5YGAwopgXkIr5IhiKQL8guwIK67pJX0ug; _cfuvid=ACLwGKA.icDmXB2Ze0v2uUSihdjfZGWscRUB433aoTo-1700832991508-0-604800000; sf_timezoneoffset=-120; __cfruid=96cf6fb7298addbd87a5376bb7602ec8a443ab43-1700832995'
        };

        const component = await ContentList({ model, requestContext, metadata });
        const { container } = render(component);

        await waitFor(() => {
            expect(container).toMatchSnapshot();
        });
    });
});

const metadata = {
    designerMetadata: {
        Name: 'SitefinityContentList',
        Caption: 'Content list',
        PropertyMetadata: [Array]
    },
    componentType: [ContentList],
    editorMetadata: { Title: 'Content list' },
    ssr: true
};
