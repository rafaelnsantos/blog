---
title: Atomic Design with React and NextJS
date: 2020-10-21T18:14:00.870Z
metaTitle: Atomic Design with React and NextJS
metaDescription: There are many ways to define a component, but we choose to use
  the atomic design in our projects to organize our code. This post talks about
  some of the benefits of using this design pattern.
metaImage: uploads/atomicdesign.png
tags:
  - atomic design
  - react
  - nextjs
  - typescript
authors:
  - rafaelnsantos
  - andrebonizi
published: false
star: true
---
## What is Atomic Design?

Atomic design consists in separating components in a hierarchy. Since a component is something hard to find a standard to its definition, because anything can be a component, organizing your components in a hierarchy can lead to better organization of the code and better understandment of how the components should be used. 

The idea is simple but very useful when creating a new software. Code and Layout design can offer go to different directions, and without a standard that suits them both it can be hard or very time consuming to maintain a project. Atomic Design helps to define a standard that works well in both cases, that is why we chose to use it.

Below there is an explanation about each level of the Atomic Design hierarchy and some tips on how to establish a proper organization using this design pattern.

## Atoms

Atoms are usually independent components, with a simple and clear function that can work in any scope. Anything that cannot, or should not, be split in two different parts can be define as a atom. An example of an Atom can be a Text or an Image element, they can be used in so many different scopes but they only need their own attribute to work, the Text only needs a string and the Image only needs an image file.



## Molecules

When there are co-dependent Atoms we can define them as a Molecule. Since each Atom has only one function, usually it won't solve many problems by itself, so we need to combine different Atoms to for a Molecule and build functions that work together to result in a combined function. A good example of a Molecule can be a Search Bar, it has two important Atoms at least, the InputText and the SubmitButton, each Atom has its own function, but to actually do a search you will need to set these two Atoms for the Molecule function to work, if you click the SubmitButton when there is no InputText nothing will happen, the same thing will happen if you fill the InputText and never click the SubmitButton.

This dependency relation can be a good standard to define when a Molecule should be created, if the Molecule is independent it should be considered as a Atom.

## Organisms

When you 

## Templates

## Pages