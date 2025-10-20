---
layout: compose #allows to build the page from blocks that are listed in composition
title: Map viewer for occurences
description: Interactive map viewer
permalink: /mapviewer
background: assets/images/placeholders/closeup.png
height: 40vh
composition: 
  - type: heroImage
  - type: pageMarkdown # renders the markdown of that same file 
  - type: blank # empty container to inject own html scripts 
    data: mapViewer.mapViewer #can be found in mapViewer.yml 
---