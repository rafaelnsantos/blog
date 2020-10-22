---
title: NextJS Project Folder Structure
date: 2020-10-22T16:06:05.840Z
metaTitle: NextJS Project Folder Structure
metaDescription: NextJS Project Folder Structure
metaImage: uploads/meta.jpg
tags:
  - nextjs
  - react
  - atomic design
  - netlify cms
authors:
  - rafaelnsantos
  - andrebonizi
published: true
---
```
├── blog
├── content
├── public
|  └── uploads
└── src
   ├── components
   ├── config
   ├── hooks
   ├── pages
   ├── providers
   ├── services
   ├── theme
   └── utils
```

## **blog** 

posts created with netlify cms

## **content**

configuration files managed with netlify cms

```
├── analytics.json
├── colors.json
├── pagination.json
└── seo.json
```

## **public** 

static files

```
├── favicon.ico
├── MonxClosed.png
└── MonxOpen.png
```

### ***uploads*** 

images uploaded within netlify cms

## **src**

### components

```
├── admin
├── atoms
├── molecules
├── organisms
└── templates
```

#### admin

```
├── previews
└── widgets
```

##### previews

##### widgets

#### atoms

#### molecules

#### organisms

#### templates