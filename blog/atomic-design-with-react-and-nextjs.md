---
title: Atomic Design with React and NextJS
date: 2020-10-23T17:37:51.355Z
metaTitle: Atomic Design with React and NextJS
metaDescription: There are many ways to define a component, but we choose to
  use   the atomic design in our projects to organize our code. This post talks
  about   some of the benefits of using this design pattern.
metaImage: uploads/atomicdesign.png
tags:
  - atomic design
  - react
  - nextjs
  - typescript
authors:
  - andrebonizi
  - rafaelnsantos
published: true
---

Atomic design consists in separating components in a hierarchy. Since a component is something hard to find a standard to its definition, because anything can be a component, organizing your components in a hierarchy can lead to better organization of the code and better understandment of how the components should be used. 

> Atomic design is not a linear process, but rather a mental model to help us think of our user interfaces as both a cohesive whole and a collection of parts *at the same time*.
>
> *Brad Frost*, **Atomic Design**

The idea is simple but very useful when creating a new software. Code and Layout design can offer go to different directions, and without a standard that suits them both it can be hard or very time consuming to maintain a project. Atomic Design helps to define a standard that works well in both cases, code and layout, that is why we choose to use it.

Below there is an explanation about each level of the Atomic Design hierarchy and some tips on how to establish a proper organization using this design pattern.

## Atoms

Atoms are usually independent components, with a simple and clear function that can work in any scope. Anything that cannot, or should not, be split in two different parts can be defined as a atom. An atom can have many different properties but one function only. 

`<Text size={1} color=black>{content}</Text>`



An example of an Atom can be a Text or an Image element, they can be used in so many different scopes but they only need their own attribute to work and be displayed, the Text only needs a string and the Image only needs an image file. Inside the layout the same principles are applied, a button or a text can be placed anywhere in the screen, this characteristic defines the component as an Atom.

## Molecules

When there are co-dependent Atoms we can define them as a Molecule. Since each Atom has only one function, usually it won't solve many problems by itself, so we need to combine different Atoms to build functions that work together to result in a combined function, this is what defines a Molecule. A good example of a Molecule can be a Search Bar, it has two important Atoms at least, the InputText and the SubmitButton, each Atom has its own function, but to actually do a search you will need to set these two Atoms for the Molecule function to work, if you click the SubmitButton when there is no InputText nothing will happen, the same thing will happen if you fill the InputText and never click the SubmitButton. The SearchBar needs both of the components set to work, so we define it as a Molecule. 



## Organisms

Organisms are groups of Molecules, build to organize complex functions and complete scopes. An example can be a Form, it needs many kinds of information and it can leads to many different results.  The definition of an Organism depends on the size of the project, in a smaller project a Molecule and an Organism can be the same thing frequently.



## Templates

When an Organism is being reused in several different contexts we define it as a Template. Usually a whole page can be defined with one Template, but when the project becomes larger it may need several templates rendered in only one page.



## Pages