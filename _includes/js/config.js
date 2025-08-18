const countryCode = "NL";
var institutionKeys = [
'257bf65d-363f-4222-b739-9c56b1afdee4',
'6cf5e0df-23ca-4a45-ba54-eb45d01c714b',
'c940cbbb-0e0f-4d77-b18f-f58c8a776a12',
'5b1de028-e9c6-46fe-a478-7ff469322072',
'3a8211fa-99f9-4eee-8c33-e0b9ace31e48',
'ea321e10-75fe-4244-82eb-4316b9e9dcec',
'a5a4d350-04e5-43fe-90ca-53cd7780234a',
'1937c1dd-d299-4e64-85eb-ec063afceb8e',
'4106345e-c079-4fd6-a3ed-e46c6ed4b7fb',
'b82f27f4-1272-4931-90b6-e1dd4b531bc7',
'3ed3bab0-81a5-49bc-bd4e-9daeb556f33c',
'd47145c0-2601-46e9-9dc5-7590055bec10',
'06a2327d-460e-4d1c-9479-3fa2c2c38dea',
'0be72b72-166c-49ef-98c7-41b37537dabe',
'4f766d88-e88b-4603-a5f3-67618973f644',
'65f55835-dead-4ef3-8e89-a484ef465991',
'756e87e0-c2b0-4ef1-ba65-159edadbc7bb',
'7bf98185-7f54-47c9-b4fc-486b060bb102',
'87054d46-2df7-41d1-90a7-02e2d8e28d6f',
'99572e5e-5c80-44e0-9a3f-5d0719ac72cd',
'cdf943cf-a276-4284-a35d-c3c91d1a29e8',
'dc62cb2c-67d7-45e5-962e-8fc1a84918a5',
'ec824597-1eac-4536-9f38-e0eeed8224ad',
'fce802f8-f05e-4cfb-b12f-5385eaa4b369',
'04f63700-d54a-4a7d-aaed-d20d5383405b',
'fe6a7da6-dadf-43f0-b000-d0b4d6b20ce2',
'72dfb6f7-319e-48d0-ac12-42f0acd96db7',
'7ecd19cc-babf-4d4a-a504-73dabbd548c6',
'f20c7d9f-4764-4cd1-b465-7eeb96adf274',
'33411d8c-c7ce-4665-bbb0-ea72d283556a',
'61dd77bc-bae0-44d3-9491-4ebb4f3afcf4',
'd0be6af0-8dd2-45e1-899d-9f1e1f09e0e0',
'29cd3771-58ff-4610-a98b-239b7159fde0',
'510d5ac8-8899-4c2c-b547-46512194f839',
'2fae3067-bf2e-4f5a-a3d7-2972cb87df50',
'5761d5e5-7ea4-4ec4-a131-a9b611836be1',
'8f4e2b98-47cb-41a4-b954-6a973d8a6c34',
'd05bb47d-ec37-4b1e-a96c-fd033c43f889',
'20a0b551-c844-40f3-8b71-23a03286f5ba',
'afddbb9e-e284-4978-a2cb-d29fa1e3aa10',
'bbbdfa49-368b-4080-bccf-8992dfa40c45',
'c2b916ad-d02c-435e-8b76-a582639a7435',
'3747a490-ce21-45d8-92ee-329562d6e15f',
'61c587b5-2f5c-4bad-8052-52fcb7d2f730',
'85f07f37-2989-46c9-bac6-2b17b535795b',
'30363f77-e749-4b17-a8d3-391848eabdb2',
'c09f5330-06a5-43ad-9abf-409f74595055',
'237976fa-44be-43c5-8986-ad1c1fc4f65f',
'0e919a55-08d3-4bd2-aec1-200858fafd92',
'490b5a6a-f62f-4fbc-83f4-432e3153f7a6',
'9ea57514-c5af-48fa-ab43-0d26d6c066e6',
'cae4120f-7da8-4c2c-b5ce-14e709097962',
'1370bc72-540f-4ff0-aefd-2358971299be'
    ];
var siteConfig = {
    "version": 3,
    "pages": [
        {
            "id": "occurrenceSearch"
        },
        {
            "id": "datasetSearch"
        },
        {
            "id": "datasetKey"
        },
        {
            "id": "literatureSearch"
        },
        {
            "id": "isSequencedSearch"
        },
        { "id": "collectionSearch"
        }
        
    ],
    "disableInlineTableFilterButtons": true,
    "availableCatalogues": [
        "OCCURRENCE",
        "DATASET",
        "LITERATURE"
    ],
    "dataHeader": {
        "enableApiPopup": false,
        "enableInfoPopup": false
    },
    "theme": {
        "primary": "#001972",
        "borderRadius": 3,
        "stickyOffset": "0px"
    },
    "maps": {
        "mapStyles": {
            "defaultProjection": "MERCATOR",
            "defaultMapStyle": "BRIGHT",
            "options": {
                "MERCATOR": [
                    "BRIGHT",
                    "NATURAL"
                ]
            }
        }
    },
    "languages": [
        {
            "code": "en",
            "localeCode": "en",
            "label": "English",
            "default": true,
            "textDirection": "ltr",
            "iso3LetterCode": "eng",
            "cmsLocale": "en-GB",
            "gbifOrgLocalePrefix": "",
            "mapTileLocale": "en"
        },
        {
            "code": "nl",
            "localeCode": "nl",
            "label": "Nederlands",
            "default": false,
            "textDirection": "ltr",
            "iso3LetterCode": "nld",
            "cmsLocale": "nl-NL",
            "gbifOrgLocalePrefix": "",
            "mapTileLocale": "en"
        }
    ],
    "messages": {},
    "occurrenceSearch": {
        "scope": {
            "type": "equals",
            "key": "country",
            "value": "NL"
        },
        "highlightedFilters": [
            "taxonKey",
            "verbatimScientificName",
            "institutionKey",
            "collectionKey",
            "catalogNumber",
            "recordedBy",
            "identifiedBy"
        ],
        "excludedFilters": [
            "occurrenceStatus",
            "networkKey",
            "hostingOrganizationKey",
            "protocol",
            "publishingCountry",
            "institutionCode",
            "collectionCode"
        ],
        "defaultEnabledTableColumns": [
            "features",
            "country",
            "year",
            "datasetKey",
            "stateProvince",
            "recordedBy",
            "sex"
        ],
        "tabs": [
            "table",
            "gallery",
            "map",
            "clusters",
            "dashboard",
            "download"
        ],
        "mapSettings": {
            "lat": 46,
            "lng": 11,
            "zoom": 5
        }
    },
    "datasetSearch": {
        excludedFilters: ['publishingCountry', 'networkKey', 'projectId', 'hostingOrg'],
        highlightedFilters: ['q', 'type', 'publishingOrg', 'license'],
        // defaultTableColumns: ['title', 'description', 'publisher', 'type', 'occurrenceCount', 'literatureCount'],
        scope: {
            publishingCountry: ["NL"]
        },
    },
 
"publisheSearch": {},
 "collectionSearch": {
        excludedFilters: ['country', 'active'],
           scope: {
            institutionKey: institutionKeys,
            active: true
        },
    },
    "isSequencedSearch": {
        "scope": {
            "type": "and",
            "predicates": [
                {
                    "type": "equals",
                    "key": "publishingOrg",
                    "value": "396d5f30-dea9-11db-8ab4-b8a03c50a862"
                },
                {
                    "type": "equals",
                    "key": "occurrenceStatus",
                    "value": "PRESENT"
                },
                {
                    "type": "equals",
                    "key": "isSequenced",
                    "value": "true"
                }
            ]
        }
    },
    "literatureSearch": {
        "scope": {
            "type": "or",
            "predicates": [
                {
                    "type": "in",
                    "key": "countriesOfResearcher",
                    "values": [
                        "NL"
                    ]
                },
                {
                    "type": "in",
                    "key": "countriesOfCoverage",
                    "values": [
                        "NL"
                    ]
                }
            ]
        },
    }
}
