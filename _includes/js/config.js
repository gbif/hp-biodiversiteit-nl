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
    "publisherSearch": {},
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